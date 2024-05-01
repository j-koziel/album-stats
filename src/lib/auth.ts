import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  }
})