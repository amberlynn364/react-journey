import { Component } from 'react';
import styles from './CardDescription.module.scss';
import { CardDescriptionProps } from './CardDescriptionTypes';

export default class CardDescription extends Component<CardDescriptionProps> {
  render() {
    const { character } = this.props;
    console.log(this.props);
    return (
      <>
        <h3 className={styles.cardTitle}>{character.name}</h3>
        <div className={styles.cardDescription}>
          <span>Eye color: {character.eye_color}</span>
          <span>Gender: {character.gender}</span>
          <span>Hair color: {character.hair_color}</span>
          <span>Height: {character.height}</span>
          <span>Mass: {character.mass}</span>
        </div>
      </>
    );
  }
}
