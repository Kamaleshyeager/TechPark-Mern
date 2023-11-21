import React,{useEffect} from 'react'
import {link, useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {Row ,Col ,ListGroup ,Image ,Form ,Button, Card, ListGroupItem} from 'react-bootstrap'
import { addToCart,removeFromCart } from '../actions/cartActions'
import { useParams, useLocation } from 'react-router-dom';
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import {Alert} from 'react-bootstrap'

export default function CartScreen() {
    const prams =useParams()
    const location = useLocation();
const productID = prams.id

const qty = new URLSearchParams(location.search).get('qty');

const dispatch=useDispatch()
const cart = useSelector(state => state.cart);
const {cartItems} = cart


useEffect(()=>{

    if(productID){
        dispatch(addToCart(productID,Number(qty)))
     }else{

     }


},[dispatch,productID,qty])


const removeFromCartHandler= (id) => {
    dispatch(removeFromCart(id))
}
const navigate=useNavigate();
const checkOutHandler =() =>{
    navigate('/login?redirect=shipping')
}

  return (
    <Row>

        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length=== 0 ? <Alert variant='info'>Your cart is empty</Alert>
            :(
  
               <ListGroup variant='flush'>
                {cartItems.map(item=>(
                    <ListGroupItem key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}><Form.Control as='select' value={item.Qty} onChange={(e)=>
                             dispatch(addToCart(item.product,Number(e.target.value)))}>
                             {[...Array(item.countInStock).keys()].map((x)=>(
                            <option key={x+1} value={x+1}>
                    {x+1}
                    </option>
                 ))}
                 </Form.Control> </Col>
                 <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>{
                        removeFromCartHandler(item.product)
                    }}   ><i className='fas fa-trash'></i></Button>
                 </Col>
                        </Row>
                    </ListGroupItem>
                ))}
               </ListGroup> 

            )}
        </Col>
        <Col md={4}>
           <Card>
             <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>
                        Subtotal ({cartItems.reduce((acc,item)=> acc + item.Qty,0)}) items
                    </h2>
                    ${cartItems.reduce((acc,item)=>acc+ item.Qty*item.price,0).toFixed(2)}
                </ListGroupItem>
                <ListGroupItem>
                    <Button className='w-100' disabled={cartItems.length===0} onClick={checkOutHandler} >Proceed to Checkout</Button>
                </ListGroupItem>
             </ListGroup>
           </Card>
        </Col>
        

    </Row>
  )
}
