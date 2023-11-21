import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'order',
    initialState: { },
    reducers: {
      request: (state, action) => {
        return { loading: true }
      },
      success: (state, action) => {
        return { loading: false, success:true , order:action.payload }
      },
      fail: (state, action) => {
        return { loading: false, error: action.payload }
      }
    }
  })
  
  
  export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: { loading: true ,orderItems:[],shippingAddress:{} },
    reducers: {
      requestDetails: (state, action) => {
        return { ...state,loading: true }
      },
      successDetails: (state, action) => {
        return { loading: false, order:action.payload }
      },
      failDetails: (state, action) => {
        return { loading: false, error: action.payload }
      }
    }
  })
  
  
  
  
  export const {request, success, fail} = orderSlice.actions
  export const {requestDetails, successDetails, failDetails} = orderDetailsSlice.actions
   
  export default orderSlice