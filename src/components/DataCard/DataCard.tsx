import CardDescription from './CardDescription/CardDescription';
import styles from './DataCard.module.scss';
import { DataCardProps } from './DataCardTypes';

export default function DataCard({ data }: DataCardProps) {
  if (!data || data.length === 0) {
    return <p>Character with this name was not found</p>;
  }
  return (
    data && (
      <ul className={styles.cardList}>
        {data.map((character) => (
          <li key={character.id} className={styles.card}>
            <CardDescription character={character} />
          </li>
        ))}
      </ul>
    )
  );
}
