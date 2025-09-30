import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    user:[]
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user=action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
    },
    registerRequest:(state,action) => {
      state.loading=true;
    },
    registerSuccess:(state,action)=>{
      state.loading = false;
      state.user=action.payload;
    },
    registerFailure:(state,action)=>{
      state.loading = false;
    
    }

  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
