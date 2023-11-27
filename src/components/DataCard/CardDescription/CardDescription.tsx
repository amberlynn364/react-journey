import { Link, useLocation } from 'react-router-dom';
import { CardDescriptionProps } from './CardDescriptionTypes';

export default function CardDescription({ character }: CardDescriptionProps) {
  const location = useLocation();
  const {
    id,
    name,
    images: { small },
  } = character;
  return (
    <Link to={`${id}${location.search}`}>
      <img id={id} src={small} alt={name} />
    </Link>
  );
}
