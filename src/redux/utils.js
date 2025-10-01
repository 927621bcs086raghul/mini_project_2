import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    user:[],
    formerror:true,
    allUserLoading:false,
    AllUser:[],
    logoutLoading:false
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user=action.payload;
      state.formerror = false;
      console.log(state.formerror);

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    registerRequest:(state,action) => {
      state.loading=true;
    },
    registerSuccess:(state,action)=>{
      state.loading = false;
      state.user=action.payload;
      state.formerror = false;
      console.log(state.formerror);

    },
    registerFailure:(state,action)=>{
      state.loading = false;
      state.formerror = true;
    },
    getAllUserRequest:(state,action)=>{
      state.allUserLoading=true;
    },
    getAllUserSuccess:(state,action)=>{
      state.allUserLoading=false;
      state.AllUser=action.payload.users;
      console.log(state.AllUser)
    },
    getAllUserFailure:(state,action)=>{
      state.allUserLoading=false;
    },
    userLogoutRequest:(state,action)=>{
state.logoutLoading=true;
    },
    userLogoutSuccess:(state,action)=>{
state.logoutLoading=false;
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure,registerFailure,userLogoutRequest,userLogoutSuccess,registerRequest,registerSuccess,getAllUserFailure,getAllUserSuccess,getAllUserRequest} = authSlice.actions;
export default authSlice.reducer;
