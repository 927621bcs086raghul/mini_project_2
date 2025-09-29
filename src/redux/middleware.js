import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./utils";   
import rootSaga from "./saga";         

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer:{
  auth: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
