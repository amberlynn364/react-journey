import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SideCardDetails.module.scss';
import LoadingSpinner from '../../components/View/LoadingSpinner/LoadingSpinner';
import { useAppContext } from '../../MyContext/MyContext';
import SideCardDescription from './SideCardDescription/SideCardDescription';
import { LoadedData } from './SideCardDetailsTypes';
import { IAppContext } from '../../MyContext/MyContextTypes';
import { useFetchDataWithIdQuery } from '../../store/features/pokemonApi/pokemonApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import selectSidePageLoading from '../../store/features/sidePageLoading/sidePageLoadingSelector';
import { setSidePageLoadingSelector } from '../../store/features/sidePageLoading/sidePageLoadingSlice';

export default function SideCardDetails() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectSidePageLoading);
  const { id } = useParams();
  const { data: loadedData, isFetching } = useFetchDataWithIdQuery(id || '');

  const currentURL = new URL(window.location.href);
  const [data, setData] = useState<LoadedData | undefined>();
  const { isMenuOpen, setIsMenuOpen } = useAppContext() as IAppContext;

  useEffect(() => {
    if (id && currentURL.pathname.includes(id)) {
      setIsMenuOpen(true);
    }
  }, [id, currentURL.pathname, setIsMenuOpen]);

  useEffect(() => {
    setData(loadedData);
  }, [loadedData]);

  useEffect(() => {
    dispatch(setSidePageLoadingSelector(isFetching));
  }, [isFetching, dispatch]);

  if (!isMenuOpen) return null;
  return (
    <section className={styles.CardDetails}>
      <h2>Side Card</h2>
      {isLoading ? <LoadingSpinner /> : <SideCardDescription data={data} />}
    </section>
  );
}
