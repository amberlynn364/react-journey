import Button from '../../../components/View/Button/Button';
import { setIsOpenSideMenu } from '../../../store/features/openSideMenu/openSideMenuSlice';
import { useAppDispatch } from '../../../store/hooks';
import { LoadedData } from '../SideCardDetailsTypes';
import styles from './SideCardDescription.module.scss';

export default function SideCardDescription({ data }: { data: LoadedData | undefined }) {
  const dispatch = useAppDispatch();
  const { name, hp, rarity, types: [firstType] = [], flavorText } = data?.data || {};
  const handleCloseSideMenu = () => {
    const currentURL = new URL(window.location.href);
    currentURL.pathname = '';
    window.history.pushState(null, '', currentURL.toString());
    dispatch(setIsOpenSideMenu(false));
  };
  if (!data) return <Button onClick={handleCloseSideMenu}>close menu</Button>;
  return (
    <div className={styles.stickyContainer}>
      <div className={styles.CardDescriptionWrapper}>
        <p>
          Name: <span>{name}</span>
        </p>
        <p>
          HP: <span>{hp}</span>
        </p>
        <p>
          Rarity: <span>{rarity}</span>
        </p>
        <p>
          Type: <span>{firstType}</span>
        </p>
        <p>
          Description: <span>{flavorText}</span>
        </p>
      </div>
      <Button onClick={handleCloseSideMenu}>close menu</Button>
    </div>
  );
}
