import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userslice'

export const userstore = configureStore({
    reducer: {
        user: userReducer
    }
})