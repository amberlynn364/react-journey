import { Component } from 'react';
import styles from './DataCard.module.scss';
import { DataCardProps } from './DataCardTypes';
import CardDescription from './CardDescription/CardDescription';

export default class DataCard extends Component<DataCardProps> {
  render() {
    const { data, isLoading } = this.props;
    if (!data) return null;
    if (isLoading) return <p>Loading data...</p>;
    if (data.results.length === 0) {
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
}
