import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';

export interface IAppContext {
  id: string | undefined;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSideMenu: () => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => useContext(AppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const currentURL = useMemo(() => {
    return new URL(window.location.href);
  }, []);

  const handleCloseSideMenu = useCallback(() => {
    currentURL.pathname = '';
    window.history.pushState(null, '', currentURL.toString());
    setIsMenuOpen(false);
  }, [currentURL]);

  const contextValues = useMemo(
    () => ({
      id,
      isMenuOpen,
      setIsMenuOpen,
      handleCloseSideMenu,
    }),
    [id, isMenuOpen, setIsMenuOpen, handleCloseSideMenu]
  );

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
}
