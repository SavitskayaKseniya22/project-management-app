import { RootState, ProfileState } from '../.';

const getProfileSelector = (state: RootState): ProfileState => state.profile;

export default getProfileSelector;
