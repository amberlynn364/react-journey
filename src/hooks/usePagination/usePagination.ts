import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '../../constants/constants';

const usePagination = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);

  useEffect(() => {
    const { page } = router.query;
    setCurrentPage(Number(page) || FIRST_PAGE);
  }, [router.query, router.query.page]);

  const goToPage = (page: number) => {
    const { pageSize } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page, pageSize: pageSize || DEFAULT_PAGE_SIZE },
      },
      undefined,
      { shallow: true }
    );
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    goToPage,
    nextPage,
    prevPage,
  };
};

export default usePagination;
