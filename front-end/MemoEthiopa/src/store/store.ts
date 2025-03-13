import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from "./Userinfo"
import DeveloperTestReducer from "./Developer_test"
const store = configureStore({
    reducer : {
        userinfo : userInfoReducer,
        developertest : DeveloperTestReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;