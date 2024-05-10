import { createSlice } from "@reduxjs/toolkit"
import { getUserThunk } from "../thunks/get-user-thunk";
import { signOutUserThunk } from "../thunks/sign-out-user-thunk";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.isLoading = true
    }).addCase(getUserThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    }).addCase(getUserThunk.rejected, (state, action) => {
      state.isLoading = false
    }).addCase(signOutUserThunk.pending, (state, action) => {
      state.isLoading = true
    }).addCase(signOutUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = false
      state.isLoading = false
      state.user = {}
    }).addCase(signOutUserThunk.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})