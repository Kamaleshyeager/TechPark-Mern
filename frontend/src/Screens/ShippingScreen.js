import React,{useState} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../actions/userActions'
import { saveShippingAdress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
 

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

const dispatch = useDispatch()
const navigate = useNavigate()
const submitHandler = (e) => {
e.preventDefault()
dispatch(saveShippingAdress({address,city,postalCode,country}))
navigate('/payment')
}

  return (
    <FormContainer>
    <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>
            Shipping
        </h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Address' value={address} required onChange={(e)=>{setAddress(e.target.value)}}>
                </Form.Control>
        </Form.Group>
        <Form.Group controlId='City'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='City' value={city} required onChange={(e)=>{setCity(e.target.value)}}>
                </Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control type='text' placeholder='postalCode' value={postalCode} required onChange={(e)=>{setPostalCode(e.target.value)}}>
                </Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='country' value={country} required onChange={(e)=>{setCountry(e.target.value)}}>
                </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' >Continue</Button>

        </Form>


    </FormContainer>
  )
}

export default ShippingScreen