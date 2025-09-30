import axios from "axios";

const axiosInstance = axios.create({
  timeout: 3000,
});
export async function LoginRequest(action) {
  return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
    console.log("hi")
    debugger
    console.log(localStorage.getItem("users"))
    const users=JSON.parse(localStorage.getItem("users"));
    console.log(users);
    const username = users.filter((prev) => prev.UserId === action.UserId);
    console.log(username)
    if (username.length > 0) {
      if (username[0].Password === action.Password) {
        console.log(username[0]);
        return username[0];
      } else {
        console.log("ji");
        const reject = "invalid username or password";
        return { error: reject };
      }
    }
  });
}
export async function Register(action) {
  return await new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
    const users=JSON.parse(localStorage.getItem("users"));
    console.log(users)
    if(users == null){
        localStorage.setItem("users",JSON.stringify([action]));
        return action;
    }
    const exists = users?.some(user => user.UserId === action.userId);
    
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
