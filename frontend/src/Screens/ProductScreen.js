
import React ,{useState,useEffect} from 'react'
import { Row , Col , Image,ListGroup,Card,Button, ListGroupItem, Form } from 'react-bootstrap'
import { Link,useNavigate,useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetails } from '../actions/prodcutScreenAction'



const ProductScreen = (props) => {

const [qty,setQty] = useState(1);


const prams =useParams()
const dispatch = useDispatch();

const productDetails= useSelector(state=> state.productDetails);
const {loading,product,error} = productDetails


useEffect(()=>{
dispatch(ProductDetails(prams.id))

},[dispatch])

const navigate=useNavigate();
const addToCartHandler = ()=> {

navigate(`/cart/${prams.id}?qty=${qty}`)

}


  return (
<>

<Link className='btn btn-light my-3' to={'/'}>Go back</Link>

<Row>
  <Col md={6}>
    <Image src={product.image} fluid></Image>
  </Col>
  <Col md={3}>
    <ListGroup variant='flush' >
      <ListGroup.Item>
        <h3>{product.name}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating 
               value={product.rating}
               text={`${product.numReviews} reviews `}
                ></Rating>
      </ListGroup.Item>
      <ListGroup.Item>
       Price : ${product.price}
      </ListGroup.Item>
      <ListGroup.Item>
       Discription : {product.description}
      </ListGroup.Item>
    </ListGroup>
  </Col>
  <Col md={3}>
    <ListGroup >
      <ListGroupItem>
        <Row>
          <Col>
            price: 
          </Col>
          <Col>{product.price}</Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row>
          <Col>
            status: 
          </Col>
          <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }</Col>
        </Row>
      </ListGroupItem>

      {product.countInStock>0 && (
      
          <ListGroupItem>
            <Row>
              <Col>Qty</Col>
              <Col>
                 <Form.Control as='select' value={qty} onChange={(e)=>
                 setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x)=>(
                    <option key={x+1} value={x+1}>
                    {x+1}
                    </option>
                 ))}
                 </Form.Control> 
              </Col>
            </Row>
          </ListGroupItem>

      )}

      <ListGroupItem>
        <Button onClick={addToCartHandler} className='w-100' type='button' disabled={product.countInStock===0}  > Add to Cart</Button>
      </ListGroupItem>
    </ListGroup>
  </Col>
</Row>


</>  )
}

export default ProductScreen