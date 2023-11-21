import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk' // I still add this for my reference so I know thunk middleware is added
import {productDetailSlice} from './reducers/productScreenReducer'
import   productsSlice   from './reducers/productReducers'
import cartSlice from './reducers/CartReducers'
import  userSlice, {userRegisterSlice,userDetailSlice } from './reducers/userReducer'
import orderSlice, {orderDetailsSlice} from './reducers/OrderReducers'
import { userListSlice } from './reducers/userReducer'
import { productCreateSlice,productUpdateSlice } from './reducers/productScreenReducer'
 

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []
const shippingAdressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const paymentMethod= localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')): null



const store = configureStore({
    reducer: {

        productList: productsSlice.reducer,
        productDetails: productDetailSlice.reducer,
        cart:cartSlice.reducer,
        userLogin:userSlice.reducer,
        userRegister:userRegisterSlice.reducer,
        userDetail : userDetailSlice.reducer,
        userList : userListSlice.reducer,
        orderCreate:orderSlice.reducer,
        orderDetails:orderDetailsSlice.reducer,
        productCreate:productCreateSlice.reducer,
        productUpdate:productUpdateSlice.reducer
         
    },
    preloadedState: {
        cart:{
            cartItems:cartItemsFromStorage,
            shippingAddress:shippingAdressFromStorage,
            paymentMethod:paymentMethod
        },
        userLogin:{userInfo:userInfoFromStorage}
    },
    middleware: [thunk],
})
 
export default store