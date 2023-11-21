import axios from "axios"
import { Add,Remove ,saveAddress,CartSavePaymentMethod} from "../reducers/CartReducers"



export const addToCart = (id,qty) => async (dispatch,getState) => {
    
    try {
        const { data } = await axios.get(`/api/products/${id}`)
        const Data = {
          product: data._id,
          name:data.name,
          image:data.image,
          price:data.price,
          countInStock: data.countInStcok,
          Qty :qty
        }
        dispatch(Add(Data))
      
     localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
      
    } catch (error) {
        
    }

  }

  export const removeFromCart=(id) => (dispatch,getState) =>{
    dispatch(Remove(id))

localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

  }


  export const saveShippingAdress = (data) => (dispatch) =>{
    dispatch(saveAddress(data))

localStorage.setItem('shippingAddress',JSON.stringify(data))

  }


  export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch(CartSavePaymentMethod(data))
    localStorage.setItem('paymentMethod',JSON.stringify(data))

  }







