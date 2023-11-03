import styles from './DataSection.module.scss';
import DataCard from '../DataCard/DataCard';
import { DataSectionProps } from './DataSectionTypes';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';
import Paginate from '../View/Paginate/Paginate';

export default function DataSection({ data, isLoading, handleUpdatePageNumber }: DataSectionProps) {
  console.log(data);
  return (
    <section className={styles.dataSection}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Pokemons Characters</h1>
          <DataCard data={data?.data || []} />
        </>
      )}
      {!isLoading && <Paginate data={data} handleUpdatePageNumber={handleUpdatePageNumber} />}
    </section>
  );
}
