import React,{useState} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAdress,savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
 

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const navigate = useNavigate()

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod,setPaymentMethod] = useState('Cash on Delivery')
   

const dispatch = useDispatch()
const submitHandler = (e) => {
e.preventDefault()
dispatch(savePaymentMethod(paymentMethod))
navigate('/placeorder')
}

  return (
    <FormContainer>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <h1>
          Payment Method
        </h1>
        <Form onSubmit={submitHandler}>
        
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check type='radio' label='Cash on Delivery' id='Cash on delivery' name='paymentMethod' value={'Cash on Delivery'} checked onChange={(e)=>{setPaymentMethod(e.target.value)}} >

                </Form.Check>

            </Col>

        </Form.Group>

        

        <Button type='submit' variant='primary' className='my-3'>Continue</Button>

        </Form>


    </FormContainer>
  )
}

export default PaymentScreen