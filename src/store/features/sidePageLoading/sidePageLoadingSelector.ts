import { RootState } from '../../store';

const selectSidePageLoading = (state: RootState) => state.sidePageLoading.isLoading;

export default selectSidePageLoading;
