import { RootState } from '../../store';

const selectIsSideMenuOpen = (state: RootState) => state.openSideMenu.isOpen;

export default selectIsSideMenuOpen;
