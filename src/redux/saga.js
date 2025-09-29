
import { loginFailure,loginRequest,loginSuccess } from "./utils";
import { LoginRequest } from "../axios";
import { call,takeLatest,put } from "redux-saga/effects";
import { message } from "antd";
function* handleLogin(action){
  try{
    const resp=yield call(LoginRequest,action.payload);
    console.log(resp)
    yield put(loginSuccess(resp));
  }
  catch(Error){
    console.log(Error)
    const errormsg=Error;
    yield put(loginFailure())

    message.error(errormsg|| "failed to login")
  }
}

export default function* rootSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}