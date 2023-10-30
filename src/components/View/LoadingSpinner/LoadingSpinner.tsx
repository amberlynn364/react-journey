import { Component } from 'react';
import styles from './LoadingSpinner.module.scss';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className={styles.spinner}>
        Loading
        <div className={`${styles.spinnerSector} ${styles.spinnerSectorRed}`} />
        <div className={`${styles.spinnerSector} ${styles.spinnerSectorBlue}`} />
        <div className={`${styles.spinnerSector} ${styles.spinnerSectorGreen}`} />
      </div>
    );
  }
}
