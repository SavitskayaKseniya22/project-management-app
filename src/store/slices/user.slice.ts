import { createSlice } from '@reduxjs/toolkit';
import { signinThunk, signupThunk } from '../thunks';

interface UserState {
  id?: string | null;
  name?: string | null;
  token?: string | null;
  error?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  isLoading: false,
  isAuthenticated: false,
};

const jobSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signinThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signinThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signinThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signupThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default jobSlice.reducer;
