import axios from "axios";

const API = axios.create({
  baseURL:"https://dummyjson.com/",
  timeout: 3000,
});
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
    }
    return config;
  },
  (error) => Promise.reject(error)
);
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};

    if (status === 401 && window.location.pathname !== "/signin") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 404) {
      setTimeout(() => window.history.back(), 1000);
    }

    return Promise.reject(error);
  }
);
export  function LoginRequest(action) {
      return API.post("auth/login",
        action,
      )
  // return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
  
  //   const users=JSON.parse(localStorage.getItem("users"));

  //   const username = users.filter((prev) => prev.userId === action.userId);


  //   if (username.length > 0) {
  //     if (username[0].Password === action.Password) {
  
  //       return username[0];
  //     } else {
  //       const reject = "invalid username or password";
  //       return { error: reject };
  //     }
  //   }
  // });
}
export  function Register(action) {
  return API.post("/register",
        action
      )
  // return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
  //   const users=JSON.parse(localStorage.getItem("users"));
   
  //   if(users == null){
  //       localStorage.setItem("users",JSON.stringify([action]));
  //       return action;
  //   }
  //   console.log(action.userId)
  //   const exists = users?.some(user => user.userId === action.userId);
  //  console.log(exists);
  //   if(!exists){
  //       users.unshift(action)
  //       localStorage.setItem("users",JSON.stringify(users));
  //       return action;
  //   }
  //   else{
  //       return {error:"userId already exist"};
  //   }
  // });
}
export function GetAllUser(){
  return API.get("/users?limit=0")
}

export function GetloginedUserDetails(){
  const token=localStorage.getItem("token")
  return API.get("auth/me",{
      headers: {
      Authorization: `Bearer ${token}`,
      },
    
  }
  )
}
export function Adduser(action){
  return API.post("users/add",action)
}
export function GetSingleUser(action){
  return API.get(`users/${action}`)
}
export function UpdateUSer(action,id){
  return API.put(`users/${id}`,action)
}
export function DeleteUser(id){
  return API.delete(`users/${id}`)
}