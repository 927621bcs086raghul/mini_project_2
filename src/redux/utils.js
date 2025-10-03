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
    logoutLoading:false,
    total:0,
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
      state.total=action.payload.total;
      console.log(state.total)
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
    },
    userSearchRequest:(state,action)=>{
      state.allUserLoading=true;
    },
    userSearchSuccess:(state,action)=>{
      state.allUserLoading=false;
      console.log(action.payload)
      const searcheduser=action.payload.users;
      console.log(action.payload.search)
      console.log(searcheduser);
      state.AllUser = searcheduser.filter(user => user.username.includes(action.payload.search));

    },
    userSearchFailure:(state,action)=>{
      state.allUserLoading=false;
    }
  },
});

export const { loginRequest, loginSuccess, loginFailure,registerFailure,userLogoutRequest,userLogoutSuccess,registerRequest,registerSuccess,getAllUserFailure,getAllUserSuccess,getAllUserRequest,userSearchFailure,userSearchRequest,userSearchSuccess} = authSlice.actions;
export default authSlice.reducer;
