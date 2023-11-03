import calculateTotalPages from '../../../utils/calculateTotalPages';
import Button from '../Button/Button';
import styles from './Paginate.module.scss';
import PaginateProps from './PaginateTypes';

export default function Paginate({ data, handleUpdatePageNumber }: PaginateProps) {
  const totalPages =
    data?.totalCount && data?.pageSize
      ? calculateTotalPages(data.totalCount, data.pageSize)
      : undefined;
  return (
    <div className={styles.paginateWrapper}>
      <Button onClick={() => handleUpdatePageNumber('first-page')} disabled={data?.page === 1}>
        First Page
      </Button>
      <Button onClick={() => handleUpdatePageNumber('decrement')} disabled={data?.page === 1}>
        Prev Page
      </Button>
      <span>
        {data?.page} / {totalPages}
      </span>
      <Button
        onClick={() => handleUpdatePageNumber('increment')}
        disabled={data?.page === totalPages}
      >
        Next Page
      </Button>
      <Button
        onClick={() => handleUpdatePageNumber('last-page')}
        disabled={data?.page === totalPages}
      >
        Last Page
      </Button>
    </div>
  );
}
