import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Container,Form,Button,Row,Col} from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import {Login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'

const RegisterScreen = () => {

const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [message,setMessage] = useState(null)

const dispatch = useDispatch()

const userRegister = useSelector(state=>(state.userRegister))
const {loading,error,userInfo} =userRegister

const navigate = useNavigate();
const location = useLocation();

const redirect = location.search ? location.search.split('=')[1] : '/'


useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
},[userInfo])

const submitHandler = (e) => {
    e.preventDefault()

    if(password!== confirmPassword){
        setMessage('passwords do not match')
    }else{
        dispatch(Register(name,email,password))
    }


    
}


  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        {error && <Alert variant='danger'>{error}</Alert>}
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

            <Form.Group><Button className='my-3' type='submit' variant='primary' >Register</Button></Form.Group>
            
        </Form>

        <Row className='py-3'>
            <Col>
                have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen