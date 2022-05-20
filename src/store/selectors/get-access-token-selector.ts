import { RootState } from '../store';

const getAccessToken = (state: RootState) => state.auth.accessToken;

export default getAccessToken;
