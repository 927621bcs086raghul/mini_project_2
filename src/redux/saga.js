
import { loginFailure,loginRequest,loginSuccess,registerFailure,registerRequest,registerSuccess } from "./utils";
import { LoginRequest,Register } from "../axios";
import { call,takeLatest,put } from "redux-saga/effects";
import { message } from "antd";
function* handleLogin(action){
  try{
    const resp=yield call(LoginRequest,action.payload);
    console.log(resp)
    if(resp?.error){
      yield put(loginFailure());
      console.log("failed");
      message.error(resp.error);
    }
    else{
    yield put(loginSuccess(resp));
    message.success("login successfully");
  }
  }
  catch{
    yield put(loginFailure())
    message.error( "failed to login")
  }
}
function* handleRegister(action){
  try{
    const resp = yield call(Register,action.payload);
    yield put(registerSuccess(resp));
    message.success("user successfully registered");
  }
  catch{
    put(registerFailure())
    message.error("failed to register");
  }
}

export default function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type,handleRegister);
}