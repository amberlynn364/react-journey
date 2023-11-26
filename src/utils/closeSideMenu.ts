import router from 'next/router';
import { DEFAULT_PAGE_SIZE, FIRST_PAGE } from '../constants/constants';

const handleCloseSideMenu = () => {
  const { details, ...restQuery } = router.query;
  if (details) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...restQuery,
          page: router.query.page || FIRST_PAGE,
          pageSize: router.query.pageSize || DEFAULT_PAGE_SIZE,
        },
      },
      undefined,
      { shallow: true }
    );
  }
};

export default handleCloseSideMenu;
