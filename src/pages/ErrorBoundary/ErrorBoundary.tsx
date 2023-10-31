import { Link, useRouteError } from 'react-router-dom';
import styles from './ErrorBoundary.module.scss';
import RouterPath from '../../router/routerTypes';
import Button from '../../components/View/Button/Button';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className={styles.errorWrapper}>
      <img src="error-img.svg" className={styles.errorImg} alt="error-img" />
      <h2>Whoops, Something went wrong</h2>
      <Link to={RouterPath.Home}>
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
