import { configureStore } from '@reduxjs/toolkit'
import cyberstarReducer from './cyberstar'
import payinfoReducer from './payinfo'
import baseInfo from './baseInfo'

const store = configureStore({
  reducer: {
    cyberstar: cyberstarReducer,
    payinfo: payinfoReducer,
    baseInfo: baseInfo
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch