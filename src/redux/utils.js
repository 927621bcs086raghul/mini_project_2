import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    user:[],
    formerror:true,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user=action.payload;
      state.formerror = false;
      console.log(state.formerror);

    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    registerRequest:(state,action) => {
      state.loading=true;
    },
    registerSuccess:(state,action)=>{
      state.loading = false;
      state.user=action.payload;
      state.formerror = false;
      console.log(state.formerror);

    },
    registerFailure:(state,action)=>{
      state.loading = false;
      state.formerror = true;

    }

  },
});

export const { loginRequest, loginSuccess, loginFailure,registerFailure,registerRequest,registerSuccess } = authSlice.actions;
export default authSlice.reducer;
