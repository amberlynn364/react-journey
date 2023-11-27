import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SideCardDetails.module.scss';
import LoadingSpinner from '../../components/View/LoadingSpinner/LoadingSpinner';
import { useAppContext } from '../../MyContext/MyContext';
import SideCardDescription from './SideCardDescription/SideCardDescription';
import { fetchDataWithID } from '../../services/fetchData';
import { LoadedData } from './SideCardDetailsTypes';
import { IAppContext } from '../../MyContext/MyContextTypes';

export default function SideCardDetails() {
  const { id } = useParams();
  const currentURL = new URL(window.location.href);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoadedData | undefined>();
  const { isMenuOpen, setIsMenuOpen } = useAppContext() as IAppContext;

  useEffect(() => {
    if (id && currentURL.pathname.includes(id)) {
      setIsMenuOpen(true);
    }
  }, [id, currentURL.pathname, setIsMenuOpen]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchDataWithID(id || '');
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (!isMenuOpen) return null;
  return (
    <section className={styles.CardDetails}>
      <h2>Side Card</h2>
      {isLoading ? <LoadingSpinner /> : <SideCardDescription data={data} />}
    </section>
  );
}
