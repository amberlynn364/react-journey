import styles from './DataSection.module.scss';
import DataCard from '../DataCard/DataCard';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';
import Paginate from '../View/Paginate/Paginate';
import { useAppSelector } from '../../store/hooks';
import selectMainPageLoading from '../../store/features/mainPageLoading/mainPageLoadingSelector';
import selectData from '../../store/features/data/dataSelector';

export default function DataSection() {
  const data = useAppSelector(selectData);
  const isLoading = useAppSelector(selectMainPageLoading);
  const isPaginateNecessary: boolean | null = data && data?.totalCount > data?.pageSize;
  return (
    <section className={styles.dataSection}>
      <h1>Pokemons Characters</h1>
      {isLoading ? <LoadingSpinner /> : <DataCard data={data?.data || []} />}
      {!isLoading && isPaginateNecessary && <Paginate data={data} />}
    </section>
  );
}
