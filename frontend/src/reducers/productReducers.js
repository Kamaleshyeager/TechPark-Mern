import { createSlice } from "@reduxjs/toolkit";
 
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    request: (state, action) => {
      return { loading: true, products: [] }
    },
    success: (state, action) => {
      return { loading: false, products: action.payload.products , pages : action.payload.pages , page : action.payload.page }
    },
    fail: (state, action) => {
      return { loading: false, error: action.payload }
    }
  }
})





export const {request, success, fail} = productsSlice.actions
 
export default productsSlice