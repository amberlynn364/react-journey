import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import Home from '../pages/Home/Home';
import { AppContextProvider } from '../MyContext/MyContext';

export default function RootLayout() {
  return (
    <AppContextProvider>
      <main className={styles.main}>
        <Home />
        <Outlet />
      </main>
    </AppContextProvider>
  );
}
