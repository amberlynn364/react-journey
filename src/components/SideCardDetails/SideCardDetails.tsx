import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SideCardDetails.module.scss';
import SideCardDescription from './SideCardDescription/SideCardDescription';
import { LoadedData } from './SideCardDetailsTypes';
import { useFetchDataWithIdQuery } from '../../store/features/pokemonApi/pokemonApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import selectSidePageLoading from '../../store/features/sidePageLoading/sidePageLoadingSelector';
import { setSidePageLoadingSelector } from '../../store/features/sidePageLoading/sidePageLoadingSlice';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';

export default function SideCardDetails() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectSidePageLoading);
  const router = useRouter();
  const { details } = router.query;
  const { data: loadedData, isFetching } = useFetchDataWithIdQuery((details as string) || '');
  const [data, setData] = useState<LoadedData | undefined>();

  useEffect(() => {
    setData(loadedData);
  }, [loadedData]);

  useEffect(() => {
    dispatch(setSidePageLoadingSelector(isFetching));
  }, [isFetching, dispatch]);

  return (
    <section className={styles.CardDetails}>
      <h2>Side Card</h2>
      {isLoading ? <LoadingSpinner /> : <SideCardDescription data={data} />}
    </section>
  );
}
