import { useLoaderData, useNavigation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SideCardDetails.module.scss';
import Button from '../../components/View/Button/Button';
import LoadingSpinner from '../../components/View/LoadingSpinner/LoadingSpinner';
import { LoadedData } from './SideCardDetailsTypes';

export default function SideCardDetails() {
  const { id } = useParams();
  const navigation = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const currentURL = new URL(window.location.href);
  const data = useLoaderData() as LoadedData;
  console.log(4444, data);

  const handleCloseSideMenu = () => {
    currentURL.pathname = '';
    window.history.pushState(null, '', currentURL.toString());
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (id && currentURL.pathname.includes(id)) {
      setIsMenuOpen(true);
    }
  }, [id, currentURL.pathname]);
  if (!isMenuOpen) return null;
  return (
    <section className={styles.CardDetails}>
      {navigation.state === 'loading' ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.CardDescriptionWrapper}>
            <p>
              Name: <span>{data.data.name}</span>
            </p>
            <p>
              HP: <span>{data.data.hp}</span>
            </p>
            <p>
              Rarity: <span>{data.data.rarity}</span>
            </p>
            <p>
              Type: <span>{data.data.types[0]}</span>
            </p>
            <p>
              Name: <span>{data.data.flavorText}</span>
            </p>
          </div>
          <Button onClick={handleCloseSideMenu}>close menu</Button>
        </>
      )}
    </section>
  );
}
