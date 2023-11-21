import { request, success, fail } from "../reducers/productReducers"
import {productCreateRequest,productCreateSuccess,productCreateFail,productUpdateFail,productUpdateRequest,productUpdateSuccess} from '../reducers/productScreenReducer'
import axios from "axios"
 
export const listProducts = (keyword = '' , pageNumber = '') => async (dispatch) => {
  try {
    dispatch(request())
    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    dispatch(success(data))
 
  } catch (err) {
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch(fail(error))
  }
}



export const createProdcut = () => async (dispatch,getState) => {
  try {
    dispatch(productCreateRequest())

    const {
      userLogin:{userInfo},
    } = getState()
    const config = {
      headers : {
        Authorization : `Bearer ${userInfo.token}`
      }
    }


    const { data } = await axios.post('/api/products',{},config)
    dispatch(productCreateSuccess(data))
 
  } catch (err) {
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch(productCreateFail(error))
  }
}

export const UpdateProdcut = (product) => async (dispatch,getState) => {
  try {
    dispatch(productUpdateRequest())

    const {
      userLogin:{userInfo},
    } = getState()
    const config = {
      headers : {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${userInfo.token}`
      }
    }


    const { data } = await axios.put(`/api/products/${product._id}`,product,config)
    dispatch(productUpdateSuccess(data))
 
  } catch (err) {
    const error = err.response && err.response.data.message ? err.response.data.message : err.message
    dispatch(productUpdateFail(error))
  }
}