import { RootState } from '../../store';

const selectItemsPerPage = (state: RootState) => state.itemsPerPage.itemsPerPage;

export default selectItemsPerPage;
