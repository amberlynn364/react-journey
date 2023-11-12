import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';
import RouterPath from '../../router/routerTypes';
import Button from '../../components/View/Button/Button';

export default function Page404() {
  return (
    <div className={styles.errorWrapper}>
      <img src="error-img.svg" className={styles.errorImg} alt="error-img" />
      <h2>Whoops, this page doesn&apos;t exist</h2>
      <Link to={RouterPath.RootLayout}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
