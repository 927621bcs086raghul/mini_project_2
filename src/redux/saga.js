
import { getAllUserRequest, loginFailure,loginRequest,loginSuccess,userLogoutRequest,userLogoutSuccess,registerFailure,registerRequest,registerSuccess,getAllUserFailure,getAllUserSuccess, } from "./utils";
import { LoginRequest,Register,GetAllUser } from "../axios";
import { call,takeLatest,put } from "redux-saga/effects";
import { message } from "antd";
function* handleLogin(action){
  
  try{
    console.log(action.payload);
    const resp=yield call(LoginRequest,action.payload);

    yield put(loginSuccess(resp));
    console.log(resp)
    localStorage.setItem("token",resp.data.accessToken)
    message.success("login successfully");
  }
  catch(error){
    yield put(loginFailure())
    message.error( "failed to login")
  }
}
function* handleRegister(action){
  try{
    console.log("hi")
    const resp = yield call(Register,action.payload);
    if(resp?.error){
      console.log("hi")
    yield put(registerFailure(resp))
    message.error(resp.error);
    }else{
    yield put(registerSuccess(resp));
    message.success("user successfully registered");}
  }
  catch(error){
    console.log("ji")
    yield put(registerFailure())
    message.error("failed to register");
  }
}
function* handleAllUser(action){
  try{
   const resp= yield call(GetAllUser)
   console.log(resp)
   yield put(getAllUserSuccess(resp.data));
   message.success("users detail fetched successfully")
  }
  catch{
    yield put(getAllUserFailure());
    message.error("failed to get all user details")
  }
}
function* handleLogout(){
  try{
    localStorage.removeItem("token");
    yield put(loginSuccess());
    message.success("logout successfully")
  }catch{

  }
}

export default function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type,handleRegister);
  yield takeLatest(getAllUserRequest.type,handleAllUser);
  yield takeLatest(userLogoutRequest.type,handleLogout);
}