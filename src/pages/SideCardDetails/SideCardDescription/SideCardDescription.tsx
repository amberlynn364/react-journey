import { IAppContext, useAppContext } from '../../../MyContext';
import Button from '../../../components/View/Button/Button';
import { LoadedData } from '../SideCardDetailsTypes';
import styles from './SideCardDescription.module.scss';

export default function SideCardDescription({ data }: { data: LoadedData | undefined }) {
  const { name, hp, rarity, types: [firstType] = [], flavorText } = data?.data || {};
  const { handleCloseSideMenu } = useAppContext() as IAppContext;
  return (
    <>
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
    </>
  );
}
