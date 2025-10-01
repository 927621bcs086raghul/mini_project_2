import axios from "axios";

const axiosInstance = axios.create({
  timeout: 3000,
});
export async function LoginRequest(action) {
  return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
  
    const users=JSON.parse(localStorage.getItem("users"));

    const username = users.filter((prev) => prev.userId === action.userId);
    

    if (username.length > 0) {
      if (username[0].Password === action.Password) {
  
        return username[0];
      } else {
        const reject = "invalid username or password";
        return { error: reject };
      }
    }
  });
}
export async function Register(action) {
  return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
    const users=JSON.parse(localStorage.getItem("users"));
   
    if(users == null){
        localStorage.setItem("users",JSON.stringify([action]));
        return action;
    }
    console.log(action.userId)
    const exists = users?.some(user => user.userId === action.userId);
   console.log(exists);
    if(!exists){
        users.unshift(action)
        localStorage.setItem("users",JSON.stringify(users));
        return action;
    }
    else{
        return {error:"userId already exist"};
    }
  });
}
