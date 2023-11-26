import usePagination from '../../../hooks/usePagination/usePagination';
import calculateTotalPages from '../../../utils/calculateTotalPages';
import Button from '../Button/Button';
import styles from './Paginate.module.scss';
import PaginateProps from './PaginateTypes';

export default function Paginate({ data }: PaginateProps) {
  const { currentPage, goToPage, nextPage, prevPage } = usePagination();
  const totalPages =
    data?.totalCount && data?.pageSize
      ? calculateTotalPages(data.totalCount, data.pageSize)
      : undefined;
  return (
    <div className={styles.paginateWrapper}>
      <Button onClick={() => goToPage(1)} disabled={currentPage === 1}>
        First Page
      </Button>
      <Button onClick={() => prevPage()} disabled={currentPage === 1}>
        Prev Page
      </Button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button onClick={() => nextPage()} disabled={currentPage === totalPages}>
        Next Page
      </Button>
      <Button onClick={() => goToPage(totalPages || 0)} disabled={currentPage === totalPages}>
        Last Page
      </Button>
    </div>
  );
}
