import js from "@eslint/js";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { act } from "react";
import NewUser from "../Auth/User_CRUD_Operation/NewUser";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    userLoading: false,
    error: "",
    user: [],
    formerror: true,
    allUserLoading: false,
    AllUser: [],
    refAllUser: [],
    modalValue: [],
    EditUserData: [],
    logoutLoading: false,
    modal: false,
    total: 0,
    userUpdateId:null
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
      state.AllUser = JSON.parse(localStorage.getItem("users"));
      console.log(state.AllUser)
      console.log(action)
      state.refAllUser =state.AllUser
      const searcheduser = state.refAllUser;
      console.log(searcheduser)
      if (action.payload.search == "") {
        state.AllUser = state.refAllUser;
      } else {
        console.log(action.payload.search)
        console.log(state.AllUser);
state.AllUser = searcheduser?.filter((user) =>
  (user?.username || "")
    .toLowerCase()
    .includes((action.payload?.search || "").toLowerCase())
);

        console.log(state.AllUser)
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
      debugger;
      state.userLoading = false;
      state.formerror = false;
      const users = JSON.parse(localStorage.getItem("users"));
      const newUser = action.payload.data;
      const idcangedForNewUSer = { ...newUser, id: users.length + 1 };
      const userExists = users.some((user) => user.email === newUser.email);
      console.log(userExists);
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
      console.log(action.payload)
      state.modal = true;
      state.modalValue = action?.payload?.option;
      state.userUpdateId=action?.payload?.id;
      const users = JSON.parse(localStorage.getItem("users"));
      const ref=users.filter((user=>user?.id==action?.payload?.id));
      state.EditUserData=ref[0];
    },
    modalOperatorClose: (state, action) => {
      state.modal = false;
    },
    getUserdataReq: (state, action) => {},
    getUserdataSuccess: (state, action) => {
    },
    getUserdataFail: (state, action) => {},
    updateUserRequest: (state, action) => {
      state.userLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.userLoading = false;
      const users = JSON.parse(localStorage.getItem("users"));
      const newUser = action.payload.data;
      const index = users.findIndex((user) => user.id === newUser.id);
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
    },
    deleteUserSuccess:(state,action)=>{
      debugger
      state.loading=false;
      const users = JSON.parse(localStorage.getItem("users"));
      state.AllUser=users.filter(user=>user.id != action.payload);
      localStorage.setItem("users", JSON.stringify(state.AllUser));
      console.log(state.AllUser)
    },
    deleteUserFailed:(state,action)=>{
      state.loading=false;
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
  getUserdataFail,
  getUserdataReq,
  getUserdataSuccess,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserSuccess,
  deleteUserRequest,
} = authSlice.actions;
export default authSlice.reducer;
