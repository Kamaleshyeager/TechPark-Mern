import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {Table,Form,Button,Row,Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import { success } from '../reducers/userReducer'
import axios from 'axios'

const ProfileScreen = () => {

const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [message,setMessage] = useState(null)
const [success2,setSuccess2] = useState(false)
const [orders,setOrders] = useState(false)


const dispatch = useDispatch()

const userDetail = useSelector(state=>(state.userDetail))
const {error,user} =userDetail

const userLogin = useSelector(state=>(state.userLogin))
const {userInfo} = userLogin


const navigate = useNavigate();


  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  }

  const getMyOrder = async () => {

      const { data } = await axios.get(`/api/orders/myorders`, config)
       setOrders(data)
  }
  useEffect(()=>{
      console.log("user")
      if(!userInfo){
          navigate('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
                getMyOrder()
            }
    }

},[userInfo,dispatch,user])

const submitHandler = async (e) => {
    e.preventDefault()

    if(password!== confirmPassword){
        setMessage('passwords do not match')
    }else{

        const config ={
           headers:{
              'Content-Type':'application/json',
               Authorization : `Bearer ${userInfo.token}`
           }
        }
   const { data } = await axios.put(`/api/users/profile`,{id:user._id,name,email,password},config)
   dispatch(getUserDetails('profile'))
   dispatch(success(data))
   localStorage.setItem('userInfo',JSON.stringify(data))
   setSuccess2(true);

    }


    
}


if(!orders)
return null


  return (<Row>
    <Col md={3}>
    <h2>User Profile</h2>
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
        {success2 && <Alert variant='success'>User Updated</Alert>}
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>{setName(e.target.value)}}>

                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}>
                    
                </Form.Control>

            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}>
                    
                </Form.Control>

            </Form.Group>

            <Form.Group><Button className='my-3' type='submit' variant='primary' >Update</Button></Form.Group>
            
        </Form>
    </Col>
    <Col md={9}>
        <h2>My Orders</h2>   
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Col>
  </Row>
  )
}

export default ProfileScreen