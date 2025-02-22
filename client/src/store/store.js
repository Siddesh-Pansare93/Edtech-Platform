import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import courseReducer from "./Features/courseSlice"
import { persistStore , persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth : authReducer , 
    course : courseReducer
})


const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          },
        }),
      devTools : true ,
});

let persistor = persistStore(store)

export  {store, persistor};
