import styles from './DataSection.module.scss';
import DataCard from '../DataCard/DataCard';
import { DataSectionProps } from './DataSectionTypes';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';

export default function DataSection({ data, isLoading }: DataSectionProps) {
  return (
    <section className={styles.dataSection}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Star Wars Characters</h1>
          <DataCard data={data} />
        </>
      )}
    </section>
  );
}
