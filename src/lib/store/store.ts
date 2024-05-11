import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']