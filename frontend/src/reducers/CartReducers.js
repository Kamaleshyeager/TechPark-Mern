import { createSlice } from "@reduxjs/toolkit";
 
export const cartSlice = createSlice({
  name: 'cartItems',
  initialState: {
    cartItems: [],
    shippingAddress:{}
  },
  reducers: {
    Add: (state, action) => {
      
        const item = action.payload

        const existItem = state.cartItems.find(x => x.product === item.product)

     if(existItem){
           
             return{

               ...state,
               cartItems: state.cartItems.map(x=> x.product === existItem.product ? item : x)

             }
     }else{
        return{
            ...state,
            cartItems:[...state.cartItems,item]
        }
     }

      
    },
    Remove:(state,action) => {

return{
    ...state,
    cartItems:state.cartItems.filter((x)=>x.product!== action.payload)
}


    },
    saveAddress:(state,action) => {

      return{
        ...state,
          shippingAddress:action.payload
      }
          },
          
          CartSavePaymentMethod:(state,action) => {

            return{
              ...state,
                paymentMethod:action.payload
            }
                }     
  }
})





export const {Add,Remove,saveAddress,CartSavePaymentMethod} = cartSlice.actions
 
export default cartSlice