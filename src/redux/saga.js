import {
  getAllUserRequest,
  loginFailure,
  loginRequest,
  loginSuccess,
  userLogoutRequest,
  userLogoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  getAllUserFailure,
  getAllUserSuccess,
  userSearchFailure,
  userSearchRequest,
  userSearchSuccess,
  getLogginedUserDetailsFail,
  getLogginedUserDetailsReq,
  getLogginedUserDetailsSuccess,
  AddUserFailure,
  AddUserRequest,
  AddUserSuccess,
  modalOperatorClose,
  getUserdataFail,
  getUserdataReq,
  getUserdataSuccess,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserRequest,
  deleteUserSuccess,
} from "./utils";
import {
  LoginRequest,
  Register,
  GetAllUser,
  GetloginedUserDetails,
  Adduser,
  GetSingleUser,
  UpdateUSer,
  DeleteUser
} from "../axios";
import { call, takeLatest, put, take } from "redux-saga/effects";
import { message } from "antd";
function* handleLogin(action) {
  try {
    const resp = yield call(LoginRequest, action.payload);

    yield put(loginSuccess(resp));
    localStorage.setItem("token", resp.data.accessToken);
    message.success("login successfully");
  } catch (error) {
    yield put(loginFailure());
    message.error("failed to login");
  }
}
function* handleRegister(action) {
  try {
    const resp = yield call(Register, action.payload);
    if (resp?.error) {
      yield put(registerFailure(resp));
      message.error(resp.error);
    } else {
      yield put(registerSuccess(resp));
      message.success("user successfully registered");
    }
  } catch (error) {
    yield put(registerFailure());
    message.error("failed to register");
  }
}
function* handleAllUser(action) {
  try {
    const resp = yield call(GetAllUser);
    const existingUsers = localStorage.getItem("users");
    if (
      !existingUsers ||
      existingUsers === "undefined" ||
      existingUsers === "null" ||
      existingUsers.length === 0
    ) {
      localStorage.setItem("users", JSON.stringify(resp.data.users));
    }
    yield put(getAllUserSuccess(resp.data));
    message.success("users detail fetched successfully");
  } catch {
    yield put(getAllUserFailure());
    message.error("failed to get all user details");
  }
}
function* handleLogout() {
  try {
    localStorage.removeItem("token");
    yield put(loginSuccess());
    message.success("logout successfully");
  } catch {}
}
function* handleUserSearch(action) {
  try {
    yield put(userSearchSuccess(action.payload));
  } catch {
    yield put(userSearchFailure());
  }
}
function* handleLoginedUserDetails() {
  try {
    console.log("hi")
    const res = yield call(GetloginedUserDetails);
    console.log(res)
    yield put(getLogginedUserDetailsSuccess(res));
  } catch {
    yield put(getLogginedUserDetailsFail());
  }
}
function* handleAddUser(action) {
  try {
    const resp = yield call(Adduser, action.payload);
    const reducerRes = yield put(AddUserSuccess(resp));
    yield put(modalOperatorClose());
    message.success("user added successfully");
  } catch (Error) {
    yield put(AddUserFailure());
    message.error("user already exist");
  }
}
function* handleGetSingleUser(action) {
  try {
    const resp = yield call(GetSingleUser, action.payload);
    yield put(getUserdataSuccess());
  } catch {}
}
function* handleUpdateUser(action){
  try{
    if(action?.payload?.id > 207 || !(typeof(action.payload?.id)=='number')){
          yield put(updateUserSuccess(action?.payload));
    yield put(modalOperatorClose());
    message.success("user Updated successfully")
    }
    else{
 const resp= yield call(UpdateUSer,action.payload.values,action.payload.id);
    yield put(updateUserSuccess(resp));
    yield put(modalOperatorClose());
    message.success("user Updated successfully")
    }
   
  }
  catch{
    yield put(updateUserFailed());
    message.error("failed to update");
  }
}
function* handleDeleteUser(action){
  try{
    if(action?.payload?.id > 207 || !(typeof(action.payload?.id)=='number')){
    yield put(deleteUserSuccess(action.payload));

    }
    else{
    const resp =yield call(DeleteUser,action.payload)

    }
    yield put(deleteUserSuccess(action.payload));
    message.success("user deleted successfuly");
  }catch{
    
  }
}
export default function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(getAllUserRequest.type, handleAllUser);
  yield takeLatest(userLogoutRequest.type, handleLogout);
  yield takeLatest(userSearchRequest.type, handleUserSearch);
  yield takeLatest(getLogginedUserDetailsReq.type, handleLoginedUserDetails);
  yield takeLatest(AddUserRequest.type, handleAddUser);
  yield takeLatest(getUserdataReq.type, handleGetSingleUser);
  yield takeLatest(updateUserRequest.type,handleUpdateUser);
  yield takeLatest(deleteUserRequest.type,handleDeleteUser)
}
