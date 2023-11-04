import { Outlet } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import styles from './RootLayout.module.scss';

export default function RootLayout() {
  return (
    <main className={styles.main}>
      <Home />
      <Outlet />
    </main>
  );
}
