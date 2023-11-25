import Link from 'next/link';
import styles from '../ui/404.module.scss';
import Button from '../components/View/Button/Button';

export default function Page404() {
  return (
    <div className={styles.errorWrapper}>
      <img src="error-img.svg" className={styles.errorImg} alt="error-img" />
      <h2>Whoops, this page doesn&apos;t exist</h2>
      <Link href="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
