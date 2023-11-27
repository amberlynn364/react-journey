import { RootState } from '../../store';

const selectMainPageLoading = (state: RootState) => state.mainPageLoading.isLoading;

export default selectMainPageLoading;
