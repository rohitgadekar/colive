import { configureStore } from '@reduxjs/toolkit'
import propertyReducer from './slice/propslice'
import userReducer from './slice/userslice'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit'
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducer = combineReducers({
    property: propertyReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: {
        // property: propertyReducer,
        // user:userReducer
        reducer: persistedReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


let persistor = persistStore(store)
export {  persistor }