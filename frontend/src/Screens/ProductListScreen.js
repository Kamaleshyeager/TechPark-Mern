import React,{useState,useEffect} from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col} from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import {listProducts} from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createProdcut } from '../actions/productActions'
import {productCreateReset} from '../reducers/productScreenReducer'
import axios from 'axios'
import Paginate from '../components/paginate'



const ProductListScreen = () => {

  const params = useParams()
  const pageNumber = params.pageNumber || 1
  console.log(pageNumber)
    const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products , pages , page} = productList

  const productCreate = useSelector((state) => state.productCreate)
  const { loading:loadingCreate,
          error:errorCreate, 
          product:createdProduct,
          success:successCreate } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(productCreateReset())
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    } 
    
    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('',pageNumber))
    }



  }, [dispatch,userInfo,navigate,successCreate,createdProduct,pageNumber])


  const deleteHandler = async (id) => {
     if (window.confirm('Are you sure')) {
       //DELETE PRODUCTS
       const config ={
             headers:{
                     Authorization : `Bearer ${userInfo.token}`
             }
        }
        const {data} = await axios.delete(`/api/products/${id}`,config)
       dispatch(listProducts('',pageNumber))
     }
  }

  const createProductHandler = () => {
    dispatch(createProdcut())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
                  }

export default ProductListScreen