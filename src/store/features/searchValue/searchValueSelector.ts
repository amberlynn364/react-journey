import { RootState } from '../../store';

const selectSearchValue = (state: RootState) => state.searchValue.searchValue;

export default selectSearchValue;
