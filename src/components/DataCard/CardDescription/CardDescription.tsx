import styles from './CardDescription.module.scss';
import { CardDescriptionProps } from './CardDescriptionTypes';

export default function CardDescription({ character }: CardDescriptionProps) {
  // The variable `eye_color`, `hair_color` does not adhere to the camelCase, PascalCase, or UPPER_CASE formats,
  // and cannot be changed as it is based on server-provided data.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, eye_color, gender, hair_color, height, mass } = character;
  return (
    <>
      <h3 className={styles.cardTitle}>{name}</h3>
      <div className={styles.cardDescription}>
        <span>Eye color: {eye_color}</span>
        <span>Gender: {gender}</span>
        <span>Hair color: {hair_color}</span>
        <span>Height: {height}</span>
        <span>Mass: {mass}</span>
      </div>
    </>
  );
}
