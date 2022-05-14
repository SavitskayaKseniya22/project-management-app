import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  userName: string;
}

const initialState: ProfileState = { userName: '' };

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateUserName(state: ProfileState, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

const { updateUserName: updateUserNameActionCreator } = profileSlice.actions;

const profileReducer = profileSlice.reducer;

export { profileSlice, updateUserNameActionCreator, profileReducer, type ProfileState };
