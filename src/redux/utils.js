import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    user: [],
    formerror: true,
    allUserLoading: false,
    AllUser: [],
    refAllUser: [],
    logoutLoading: false,
    total: 0,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.formerror = false;
      console.log(state.formerror);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    registerRequest: (state, action) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.formerror = false;
      console.log(state.formerror);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.formerror = true;
    },
    getAllUserRequest: (state, action) => {
      state.allUserLoading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.allUserLoading = false;
      state.AllUser = action.payload.users;
      state.refAllUser = action.payload.users;
      state.total = action.payload.total;
      console.log(state.total);
      console.log(state.AllUser);
      console.log(state.refAllUser);
    },
    getAllUserFailure: (state, action) => {
      state.allUserLoading = false;
    },
    userLogoutRequest: (state, action) => {
      state.logoutLoading = true;
    },
    userLogoutSuccess: (state, action) => {
      state.logoutLoading = false;
    },
    userSearchRequest: (state, action) => {
      state.allUserLoading = true;
    },
    userSearchSuccess: (state, action) => {
      state.allUserLoading = false;
      const searcheduser = state.refAllUser;
      if (action.payload.search == "") {
        state.AllUser = state.refAllUser;
      } else {
        state.AllUser = searcheduser.filter((user) =>
          user.username
            .toLowerCase()
            .includes(action.payload.search.toLowerCase())
        );
      }
    },
    userSearchFailure: (state, action) => {
      state.allUserLoading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  userLogoutRequest,
  userLogoutSuccess,
  registerRequest,
  registerSuccess,
  getAllUserFailure,
  getAllUserSuccess,
  getAllUserRequest,
  userSearchFailure,
  userSearchRequest,
  userSearchSuccess,
} = authSlice.actions;
export default authSlice.reducer;
