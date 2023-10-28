import { Component } from 'react';
import styles from './DataCard.module.scss';
import { DataCardProps } from './DataCardTypes';

export default class DataCard extends Component<DataCardProps> {
  render() {
    const { data, isLoading } = this.props;
    if (isLoading) return <p>Loading data...</p>;
    if (data && data.results.length < 1) {
      return <p>Character with this name was not found</p>;
    }
    return (
      data && (
        <ul className={styles['card-list']}>
          {data.results.map((character) => (
            <li key={character.name} className={styles.card}>
              <h3 className={styles['card-title']}>{character.name}</h3>
              <div className={styles['card-description']}>
                <span>Eye color: {character.eye_color}</span>
                <span>Gender: {character.gender}</span>
                <span>Hair color: {character.hair_color}</span>
                <span>Height: {character.height}</span>
                <span>Mass: {character.mass}</span>
              </div>
            </li>
          ))}
        </ul>
      )
    );
  }
}
