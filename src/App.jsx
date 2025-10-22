import React from "react";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Auth/Dashboard";
import UsersView from "./Auth/UsersView";
import PostsView from "./Auth/PostsView";
import { Provider } from "react-redux";
import store from "./redux/middleware";
import '@ant-design/v5-patch-for-react-19';
import Profile from "./Auth/User_CRUD_Operation/profile/Profile";
import ViewPost from "./Auth/dashboard/Posts/ViewPost";
import NotFound from "./NotFound";
import ServerError from "./ServerError";
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
  <Route path="/serverError" element={<ServerError/>} />
        <Route path="/NotFound" element={<NotFound/>}/>
        
        <Route path="/resetPassword" element={<ForgotPassword/>}/>
        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard/>}/> }>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<ProtectedRoute component={<UsersView/>}/>} />
          <Route path="posts" element={<ProtectedRoute component={<PostsView/>}/>} />
          <Route path="post/:id" element={<ProtectedRoute component={<ViewPost/>}/>} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute component={<Profile/>}/>}/>
        <Route path="/" element={<Navigate to="/login"/>} />

        <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
      </Provider>
    </>
  )
}

export default App
