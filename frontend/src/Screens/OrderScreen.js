import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Alert, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {useNavigate} from 'react-router-dom'
import { getOrderDetails } from '../actions/orderActions'
import axios from 'axios'



const OrderScreen = () => {
  const dispatch = useDispatch()
  const prams=useParams()
  const orderId = prams.id
 
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  let itemsPrice
  if(!loading){ 
         itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.Qty, 0)
      )
  }


  useEffect(() => {
    if(!order || order._id !== orderId) {
        dispatch(getOrderDetails(orderId))
    }
}, [order, orderId]) 

const deliverHandler = async () => {

 const config = {
    headers : {
      Authorization : `Bearer ${userInfo.token}`
    },
  }
  const {data} = await axios.put(`/api/orders/${orderId}/delivered`,{},config)
  dispatch(getOrderDetails(orderId))

}

if(!order){
    return null
}

  return (
    <>
    <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Alert variant='success'>
                  Delivered on {order.deliveredAt}
                </Alert>
              ) : (
                <Alert variant='danger'>Not Delivered</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
            <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Alert variant='success'>Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant='danger'>Not Paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.Qty} x ${item.price} = ${item.Qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo.isAdmin &&  !order.isDelivered && (
                <ListGroupItem>
                  <Button type='button' className='btn btn-block w-100' onClick={deliverHandler}>
                  Mark As Delivered
                  </Button>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen