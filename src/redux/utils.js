import js from "@eslint/js";
import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    userLoading:false,
    error: null,
    user: [],
    formerror: true,
    allUserLoading: false,
    AllUser:[],
    refAllUser: [],
    logoutLoading: false,
    modal:false,
    total: 0,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.formerror = false;
      console.log(state.formerror);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    registerRequest: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.formerror = false;
      console.log(state.formerror);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    getLogginedUserDetailsReq:(state,action)=>{
      
    },
        getLogginedUserDetailsSuccess:(state,action)=>{
      state.user=action.payload;
    },
        getLogginedUserDetailsFail:(state,action)=>{
      
    },

    getAllUserRequest: (state, action) => {
      state.allUserLoading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.allUserLoading = false;
      state.AllUser=JSON.parse(localStorage.getItem("users"))
      state.refAllUser = state.AllUser;
      state.total = state.AllUser.length;
      console.log(state.total);
      console.log(state.AllUser);
      console.log(state.refAllUser);
    },
    getAllUserFailure: (state, action) => {
      state.allUserLoading = false;
    },
    userLogoutRequest: (state, action) => {
      state.logoutLoading = true;
    },
    userLogoutSuccess: (state, action) => {
      state.logoutLoading = false;
    },
    userSearchRequest: (state, action) => {
      state.allUserLoading = true;
    },
    userSearchSuccess: (state, action) => {
      state.allUserLoading = false;
      const searcheduser = state.refAllUser;
      if (action.payload.search == "") {
        state.AllUser = state.refAllUser;
      } else {
        console.log(state.AllUser)
        state.AllUser = searcheduser.filter((user) =>
          user.username
            .toLowerCase()
            .includes(action.payload.search.toLowerCase())
        );
      }
    },
    userSearchFailure: (state, action) => {
      state.allUserLoading = false;
    },
    AddUserRequest:(state,action)=>{
      state.userLoading=true;
    },
    AddUserSuccess:(state,action)=>{
      state.userLoading=false;
    const users=JSON.parse(localStorage.getItem("users"));
    users.push(action.payload.data);
    localStorage.setItem("users",JSON.stringify(users));
    state.AllUser=users
    
    },
    AddUserFailure:(state,action)=>{
      state.userLoading=false;
    },
    modalOperatorOpen:(state,action)=>{
      state.modal=true;
    },
    modalOperatorClose:(state,action)=>{
      state.modal=false;
    }
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  userLogoutRequest,
  userLogoutSuccess,
  registerRequest,
  registerSuccess,
  getAllUserFailure,
  getAllUserSuccess,
  getAllUserRequest,
  userSearchFailure,
  getLogginedUserDetailsFail,
  getLogginedUserDetailsReq,
  getLogginedUserDetailsSuccess,
  userSearchRequest,
  userSearchSuccess,
  AddUserFailure,
  AddUserRequest,
  AddUserSuccess,
  modalOperatorClose,
  modalOperatorOpen,
} = authSlice.actions;
export default authSlice.reducer;
