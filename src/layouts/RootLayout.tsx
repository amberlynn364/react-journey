import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import Home from '../pages/Home/Home';

export default function RootLayout() {
  return (
    <main className={styles.main}>
      <Home />
      <Outlet />
    </main>
  );
}
