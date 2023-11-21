import { createSlice } from "@reduxjs/toolkit";
 
export const userSlice = createSlice({
  name: 'userLogin',
  initialState: {
    
  },
  reducers: {
    request: (state, action) => {
      return { loading: true, userInfo: {} }
    },
    success: (state, action) => {
      return { loading: false, userInfo: action.payload }
    },
    fail: (state, action) => {
      return { loading: false, error: action.payload ,userInfo:null}
    },
    logout: (state,action) => {

        return({})
    }
  }
})



export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    
  },
  reducers: {
    register: (state, action) => {
      return { loading: false, userInfo: action.payload }
    },
    failRegister: (state, action) => {
      return { loading: false, error: action.payload ,userInfo:null}
    }
    
  }
})


export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    user :{ }
  },
  reducers: {
    userDetail: (state, action) => {
      return { loading: false, user: action.payload }
    },
    failUserDetail: (state, action) => {
      return { loading: false, error: action.payload}
    },
    userDetailReset : (state,action) =>{
      return { user : {} }
    }
    
  }
})

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    users : []
  },
  reducers: {
    userListRequest: (state, action) => {
      return { loading: true }
    },
    userListSuccess: (state, action) => {
      return { loading: false, users: action.payload}
    },
    userListFail : (state,action) =>{
      return { loading: false, error: action.payload }
    }
    
  }
})


export const {request, success, fail,logout} = userSlice.actions
export const { failRegister,register} = userRegisterSlice.actions
export const { userDetail,failUserDetail,userDetailReset} = userDetailSlice.actions
export const { userListRequest,userListSuccess,userListFail} = userListSlice.actions


 
export default userSlice