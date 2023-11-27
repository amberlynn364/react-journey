import { LoadedData } from '../SideCardDetailsTypes';
import styles from './SideCardDescription.module.scss';
import handleCloseSideMenu from '../../../utils/closeSideMenu';
import Button from '../../View/Button/Button';

export default function SideCardDescription({ data }: { data: LoadedData | undefined }) {
  const { name, hp, rarity, types: [firstType] = [], flavorText } = data?.data || {};

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
