import styles from './DataCard.module.scss';
import { DataCardProps } from './DataCardTypes';
import CardDescription from './CardDescription/CardDescription';

export default function DataCard({ data }: DataCardProps) {
  if (!data || data.results.length === 0) {
    return <p>Character with this name was not found</p>;
  }
  return (
    data && (
      <ul className={styles.cardList}>
        {data.results.map((character) => (
          <li key={character.name} className={styles.card}>
            <CardDescription character={character} />
          </li>
        ))}
      </ul>
    )
  );
}
