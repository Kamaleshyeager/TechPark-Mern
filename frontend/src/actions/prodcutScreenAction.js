import axios from "axios"
import { request, success, fail } from "../reducers/productScreenReducer"


export const ProductDetails = (id) => async (dispatch) => {
    try {
      dispatch(request())
      const { data } = await axios.get(`/api/products/${id}`)
      dispatch(success(data))
   
    } catch (err) {
      const error = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch(fail(error))
    }
  }