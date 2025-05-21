import { createSlice } from "@reduxjs/toolkit";

export const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";


const savedTheme = localStorage.getItem("is_dark");
const initialState = {
  theme: savedTheme ? (savedTheme === "true" ? "dark" : "light") : getSystemTheme(),
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload; // must be "light" or "dark"
      localStorage.setItem("is_dark", String(action.payload === "dark"));
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
