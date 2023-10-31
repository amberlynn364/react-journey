import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      Loading
      <div className={`${styles.spinnerSector} ${styles.spinnerSectorRed}`} />
      <div className={`${styles.spinnerSector} ${styles.spinnerSectorBlue}`} />
      <div className={`${styles.spinnerSector} ${styles.spinnerSectorGreen}`} />
    </div>
  );
}
