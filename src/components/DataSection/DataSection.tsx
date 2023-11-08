import styles from './DataSection.module.scss';
import DataCard from '../DataCard/DataCard';
import { DataSectionProps } from './DataSectionTypes';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';
import Paginate from '../View/Paginate/Paginate';
import { IAppContext } from '../../MyContext/MyContextTypes';
import { useAppContext } from '../../MyContext/MyContext';

export default function DataSection({ handleUpdatePageNumber }: DataSectionProps) {
  const { data, isLoading } = useAppContext() as IAppContext;
  const isPaginateNecessary: boolean | null = data && data?.totalCount > data?.pageSize;
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
      {!isLoading && isPaginateNecessary && (
        <Paginate data={data} handleUpdatePageNumber={handleUpdatePageNumber} />
      )}
    </section>
  );
}
