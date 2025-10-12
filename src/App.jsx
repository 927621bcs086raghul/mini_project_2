import React from "react";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Auth/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/middleware";
import '@ant-design/v5-patch-for-react-19';
import Profile from "./Auth/User_CRUD_Operation/profile/Profile";
const PublicRoute = ({ component }) => {
  const token = localStorage.getItem("token");
  return !token ? component : <Navigate to="/dashboard" />;
};

const ProtectedRoute = ({ component }) => {
  const token = localStorage.getItem("token");  
  return token ? component : <Navigate to="/login" />;
};

function App() {

  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/login" element={<PublicRoute component={<Login/>}/>}/>
        <Route path="*" element={<Navigate to="/login"/>} />
        <Route path="/resetPassword" element={<ForgotPassword/>}/>

        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard/>}/>}/>
        <Route path="/profile" element={<ProtectedRoute component={<Profile/>}/>}/>
        </Routes>
      </Router>
      </Provider>
    </>
  )
}

export default App
