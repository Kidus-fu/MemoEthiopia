// src/store/slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../api";

interface UserMore {
    email: string;
    first_name: string;
    last_name: string;
    username: string;
}

interface UserState {
  bio?: string | null;
  id?: number | null;
  is_verified?: boolean | null;
  joined_at?: string | null;
  paln?: string | null;
  profile_picture?: string | null;
  user?: number | null;
  usermore?: UserMore | null;
  uuid?: string | null;
  phone_number?: string | null;
  location?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  social_links?: object | null;
  preferred_language?: string | null;
  loading: boolean;
  error: string | null;
  is_superuser: boolean | null;
}

// Initial state
const initialState: UserState = {
  bio: null,
  id: null,
  is_verified: null,
  joined_at: null,
  paln: null,
  profile_picture: null,
  user: null,
  usermore: null,
  uuid: null,
  phone_number: null,
  location: null,
  date_of_birth: null,
  gender: null,
  social_links: null,
  preferred_language: null,
  loading: false,
  error: null,
  is_superuser: null,
};

// ✅ Async thunk to fetch user info
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("api-v1/userget/");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || "Failed to fetch user data");
    }
  }
);

// ✅ Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserState>) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
