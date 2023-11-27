import { useRouter } from 'next/router';
import { CardDescriptionProps } from './CardDescriptionTypes';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '../../../constants/constants';
import styles from './CardDescription.module.scss';

export default function CardDescription({ character }: CardDescriptionProps) {
  const router = useRouter();
  const { page, pageSize } = router.query;
  const {
    id,
    name,
    images: { small },
  } = character;

  const handleClick = () => {
    router.push(
      {
        query: {
          ...router.query,
          page: page || FIRST_PAGE,
          pageSize: pageSize || DEFAULT_PAGE_SIZE,
          details: id,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
  return <img id={id} className={styles.card} src={small} alt={name} onClick={handleClick} />;
}
