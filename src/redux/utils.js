import js from "@eslint/js";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { act } from "react";
import { v4 as uuid } from "uuid";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    userLoading: false,
    error: "",
    user: [],
    viewUserData:[],
    formerror: true,
    allUserLoading: false,
    AllUser: [],
    refAllUser: [],
    modalValue: [],
    EditUserData: [],
    logoutLoading: false,
    modal: false,
    drawer:false,
    drawerViewUSer:false,
    total: 0,
    userUpdateId:null,
    loadingId:null,
    AllPostLoading:false,
    AllPostData:[],
    postTotal:0,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.formerror = false;
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
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    getLogginedUserDetailsReq: (state, action) => {},
    getLogginedUserDetailsSuccess: (state, action) => {
      state.user = action.payload;
    },
    getLogginedUserDetailsFail: (state, action) => {},

    getAllUserRequest: (state, action) => {
      state.allUserLoading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.allUserLoading = false;
      state.AllUser = JSON.parse(localStorage.getItem("users"));
      state.refAllUser = state.AllUser;
      state.total = state.AllUser.length;
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
      state.AllUser = JSON.parse(localStorage.getItem("users"));
      state.refAllUser =state.AllUser
      const searcheduser = state.refAllUser;
      if (action.payload.search == "") {
        state.AllUser = state.refAllUser;
      } else {
state.AllUser = searcheduser?.filter((user) =>
  (user?.username || "")
    .toLowerCase()
    .includes((action.payload?.search || "").toLowerCase())
);

      }
    },
    userSearchFailure: (state, action) => {
      state.allUserLoading = false;
    },
    AddUserRequest: (state, action) => {
      state.userLoading = true;
      state.formerror = true;
    },
    AddUserSuccess: (state, action) => {
      state.userLoading = false;
      state.formerror = false;
      const users = JSON.parse(localStorage.getItem("users"));
      const newUser = action.payload.data;
          const unique_id = uuid();
          const small_id = unique_id.slice(0, 4);
      const idcangedForNewUSer = { ...newUser, id: small_id };
      const userExists = users.some((user) => user.email === newUser.email);
      if (userExists) {
        state.error = "user already exist";
        return { error: state.error };
      } else {
        users.push(idcangedForNewUSer);
        localStorage.setItem("users", JSON.stringify(users));
        state.AllUser=users
      }
    },
    AddUserFailure: (state, action) => {
      state.userLoading = false;
    },
    modalOperatorOpen: (state, action) => {
    
      state.modal = true;
      state.modalValue = action?.payload?.option;
      state.userUpdateId=action?.payload?.id;
      const users = JSON.parse(localStorage.getItem("users"));
      const ref=users.filter((user=>user?.id==action?.payload?.id));
  
      if(!(state.modalValue==undefined)){
      state.EditUserData=ref[0];
 
      }
      else{
        state.modalValue='add'
        state.EditUserData=[];
      }

    },
    modalOperatorClose: (state, action) => {
      state.modal = false;
    },
    drawerOperatorOpen:(state,action)=>{
      state.drawer=true;
    },
    drawerOperatorClose:(state,action)=>{
      state.drawer=false;
    },drawerOperatorViewOpen:(state,action)=>{
      state.drawerViewUSer=true;
            const users = JSON.parse(localStorage.getItem("users"));
      state.viewUserData = users.find((user) => user.id == action.payload);
    },
    drawerOperatorViewClose:(state,action)=>{
      state.drawerViewUSer=false;
    },
    getUserdataReq: (state, action) => {

    },
    getUserdataSuccess: (state, action) => {
      const users = JSON.parse(localStorage.getItem("users"));
      state.viewUserData = users.find((user) => user.id == action.payload);
    },
    getUserdataFail: (state, action) => {

    },
    updateUserRequest: (state, action) => {
      state.userLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.userLoading = false;
      const users = JSON.parse(localStorage.getItem("users"));
   
      const newUser = action.payload.data || {id:action?.payload.id,email:action?.payload.values.email,firstName:action?.payload.values.firstName,lastName:action?.payload.values.lastName,username:action?.payload.values.username};
   
      const index = users.findIndex((user) => user.id == newUser.id);
      if (index !== -1) {
        users[index] = { ...users[index], ...newUser };
        localStorage.setItem("users", JSON.stringify(users));
      }
      state.AllUser=users
    },
    
    updateUserFailed:(state,action)=>{
      state.userLoading=false;
    },
    deleteUserRequest:(state,action)=>{
      state.loading=true;
      state.loadingId=action.payload;
    },
    deleteUserSuccess:(state,action)=>{
      state.loading=false;
      state.loadingId=null;
      const users = JSON.parse(localStorage.getItem("users"));
      state.AllUser=users.filter(user=>user.id != action.payload);
      localStorage.setItem("users", JSON.stringify(state.AllUser));
    },
    deleteUserFailed:(state,action)=>{
      state.loading=false;
    },
    getAllPostRequest:(state,action)=>{
      state.AllPostLoading=true;
    },
    getAllPostSuccess:(state,action)=>{
      state.AllPostLoading=false,
      state.AllPostData=action?.payload?.data?.posts;
      state.postTotal=action?.payload?.data?.total
    },
    getAllPostFailure:(state,action)=>{
      state.AllPostLoading=false
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
  drawerOperatorClose,
  drawerOperatorOpen,
  drawerOperatorViewClose,
  drawerOperatorViewOpen,
  getUserdataFail,
  getUserdataReq,
  getUserdataSuccess,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserSuccess,
  deleteUserRequest,
  getAllPostFailure,
  getAllPostRequest,
  getAllPostSuccess,
} = authSlice.actions;
export default authSlice.reducer;
