import { ApiResponse } from '../services/types';

export type HandleUpdateSearchValueType = (newValue: string) => void;
export interface IAppContext {
  data: ApiResponse | null;
  setData: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  id: string | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  handleUpdateSearchValue: HandleUpdateSearchValueType;
  handleCloseSideMenu: () => void;
}
