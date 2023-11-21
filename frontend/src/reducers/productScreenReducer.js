import { createSlice } from "@reduxjs/toolkit";


export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
      product: { reviews :[] }
    },
    reducers: {
      request: (state, action) => {
        return { loading: true, ...state }
      },
      success: (state, action) => {
        return { loading: false, product: action.payload }
      },
      fail: (state, action) => {
        return { loading: false, error: action.payload }
      }
    }
  })


  export const productCreateSlice = createSlice({
    name: 'productCreate',
    initialState: {
    },
    reducers: {
      productCreateRequest: (state, action) => {
        return { loading: true }
      },
      productCreateSuccess: (state, action) => {
        return { loading: false, success:true, product: action.payload }
      },
      productCreateFail: (state, action) => {
        return { loading: false, error: action.payload }
      },
      productCreateReset: (state, action) => {
        return {  }
      }
    }
  })


  export const productUpdateSlice = createSlice({
    name: 'productUpdate',
    initialState: {
    },
    reducers: {
      productUpdateRequest: (state, action) => {
        return { loading: true }
      },
      productUpdateSuccess: (state, action) => {
        return { loading: false, success:true, product: action.payload }
      },
      productUpdateFail: (state, action) => {
        return { loading: false, error: action.payload }
      },
      productUpdateReset: (state, action) => {
        return { product: {} }
      }
    }
  })

  export const {productUpdateRequest,productUpdateSuccess,productUpdateFail,productUpdateReset} = productUpdateSlice.actions
  export const {productCreateRequest, productCreateSuccess, productCreateFail,productCreateReset} = productCreateSlice.actions


export const {request, success, fail} = productDetailSlice.actions
