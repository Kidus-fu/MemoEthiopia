import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from "./features/users/Userinfo"
import userReducer from "./features/users/User"
import DeveloperTestReducer from "./features/Developer_test"
import { usersgetAPI } from '../services/usersget';
import { notesgetAPI } from '../services/Notes/notesget';
import theamReducer from "./features/Theam/theam"
import { loginAPI } from '../services/auth/login';
import { signupAPI } from '../services/auth/singup';
import { userProfileAPI } from '../services/userprofile';
import { blogApi } from '../services/Blog/blogposts';
import { createNoteApi } from '../services/Notes/createNoteApi';


const store = configureStore({
    reducer: {
        userinfo: userInfoReducer,
        user: userReducer,
        theam: theamReducer,
        developertest: DeveloperTestReducer,
        [usersgetAPI.reducerPath]: usersgetAPI.reducer,
        [userProfileAPI.reducerPath]: userProfileAPI.reducer,
        [notesgetAPI.reducerPath]: notesgetAPI.reducer,
        [loginAPI.reducerPath]: loginAPI.reducer,
        [signupAPI.reducerPath]: signupAPI.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [createNoteApi.reducerPath]: createNoteApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            usersgetAPI.middleware,
            signupAPI.middleware,
            notesgetAPI.middleware,
            loginAPI.middleware,
            userProfileAPI.middleware,
            blogApi.middleware,
            createNoteApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;