import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import localStorageSerive from '../utils/localStorageService';
import { IAppContext } from './MyContextTypes';
import { ApiResponse } from '../services/types';
import createHandleUpdateSearchValue from './MyContextUtils';

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchValue, setSearchValue] = useState<string>(
    localStorageSerive.get('searchValue') || ''
  );
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateSearchValue = useMemo(() => createHandleUpdateSearchValue(setSearchValue), []);

  const handleCloseSideMenu = useCallback(() => {
    const currentURL = new URL(window.location.href);
    currentURL.pathname = '';
    window.history.pushState(null, '', currentURL.toString());
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  const contextValues = useMemo(
    () => ({
      data,
      setData,
      id,
      isLoading,
      setIsLoading,
      isMenuOpen,
      setIsMenuOpen,
      searchValue,
      handleUpdateSearchValue,
      handleCloseSideMenu,
    }),
    [
      data,
      setData,
      handleCloseSideMenu,
      handleUpdateSearchValue,
      id,
      isLoading,
      isMenuOpen,
      searchValue,
    ]
  );

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}
