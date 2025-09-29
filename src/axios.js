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
export async function LoginRequest(action){
   return await new Promise(resolve => setTimeout(resolve, 2000))
    .then(()=>{

    const username=login.filter(prev=>
        prev.Username === action.Username);
    if(username.length>0){
       if(username[0].Password===action.Password){
        console.log(username[0]);
        return username[0];
       }
       else{
        console.log("ji")
        const reject="invalid username or password"
         return {error:reject};
       }
    }}
)
}