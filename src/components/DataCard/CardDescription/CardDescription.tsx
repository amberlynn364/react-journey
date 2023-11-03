import { CardDescriptionProps } from './CardDescriptionTypes';

export default function CardDescription({ character }: CardDescriptionProps) {
  const {
    id,
    name,
    images: { small },
  } = character;
  return <img id={id} src={small} alt={name} />;
}
