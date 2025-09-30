
import { loginFailure,loginRequest,loginSuccess } from "./utils";
import { LoginRequest } from "../axios";
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
    console.log("hi");
    message.success("login successfully");
  }
  }
  catch(Error){
    yield put(loginFailure())
    message.error( "failed to login")
  }
}

export default function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}