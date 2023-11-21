import axios from "axios"
import { success,request,fail,logout,register,failRegister,failUserDetail,userDetail, userListFail, userListRequest, userListSuccess } from "../reducers/userReducer"
import {userDetailReset} from '../reducers/userReducer'



export const Login = (email,password) => async (dispatch) => {
    
    try {

        dispatch(request())
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/users/login',{email,password},config)
        
        dispatch(success(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
      
     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }

  }

  export const Logout = () => async (dispatch) => {
    
    localStorage.removeItem('userInfo')
    dispatch(logout());
    dispatch(userDetailReset())
  }



  export const Register = (name,email,password) => async (dispatch) => {
    
    try {

        
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/users',{name,email,password},config)
        
        dispatch(register(data))
        dispatch(success(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
      
     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failRegister(error))
    }

  }



  export const getUserDetails = (id) => async (dispatch,getState) => {
    
    try {

      const { userLogin: { userInfo } } = getState()  

        const config ={
             headers:{
                'Content-Type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
             }
        }
        const { data } = await axios.get(`/api/users/${id}`,config)
        
        dispatch(userDetail(data))
              
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failUserDetail(error))
    }

  }


  export const listUsers = () => async (dispatch,getState) => {
    
    try {
      dispatch(userListRequest())
      const { userLogin: { userInfo } } = getState()  

        const config ={
             headers:{
                 Authorization : `Bearer ${userInfo.token}`
             }
        }
        const { data } = await axios.get(`/api/users`,config)
        
        dispatch(userListSuccess(data))
              
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(userListFail(error))
    }

  }