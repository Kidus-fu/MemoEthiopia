import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../config";

interface UserInfoState {
  loggedIn: boolean;
  token: string | null;
  otp_ready:boolean;
}

// Check if user is logged in based on token existence
const storedToken = localStorage.getItem(ACCESS_TOKEN);

const initialState: UserInfoState = {
  loggedIn: storedToken !== null,
  token: storedToken,
  otp_ready:false,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.loggedIn = true;
      state.token = action.payload;
      localStorage.setItem(ACCESS_TOKEN, action.payload); // Save token
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      localStorage.removeItem(ACCESS_TOKEN); // Remove token
      localStorage.removeItem(REFRESH_TOKEN); // Remove token
    },
    now_otp_ready(state) {
        state.otp_ready = true
    },
    otp_not_ready(state) {
        state.otp_ready = false
    }
  },
});

export const { login, logout , now_otp_ready, otp_not_ready } = userInfoSlice.actions;
export default userInfoSlice.reducer;
