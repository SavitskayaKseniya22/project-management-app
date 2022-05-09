import { createAsyncThunk } from '@reduxjs/toolkit';
import { signin, SigninProps } from '../../api';

type SigninThunkProps = SigninProps;

const signinThunk = createAsyncThunk('user/signin', async (props: SigninThunkProps) => {
  const response = await signin(props);
  return response;
});

export default signinThunk;
