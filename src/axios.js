import axios from "axios"

const login =[{
    id:1,
    Username:"raghul1310@gmail.com",
    Password:"raghul@1310"
},
{
    id:2,
Username:"raghul@10.com",
    Password:"raghul@1310"
},
{
    id:3,
Username:"raghul@10.com",
    Password:"raghul@1310"
}
]
const register=[];
const axiosInstance = axios.create({
    timeout: 3000,
});
export function LoginRequest(action){
    return new promise
    console.log(action)
    setTimeout(()=>{
         const username=login.filter(login=>login.Username===action.Username);
    if(username.length>0){
       if(username.Password===action.Password){
        return username;
       }
       else{
        console.log("ji")
        const reject="invalid username or password"
         return  reject;
       }
    }
    },2000)
   

}