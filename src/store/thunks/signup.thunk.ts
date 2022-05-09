import { createAsyncThunk } from '@reduxjs/toolkit';
import { signup, SignupProps } from '../../api';

type SignupThunkProps = SignupProps;

const signinThunk = createAsyncThunk('user/signin', async (props: SignupThunkProps) => {
  const response = await signup(props);
  return response;
});

export default signinThunk;
