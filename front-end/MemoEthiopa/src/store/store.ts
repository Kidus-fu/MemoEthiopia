import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from "./Userinfo"

const store = configureStore({
    reducer : {
        userinfo : userInfoReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;