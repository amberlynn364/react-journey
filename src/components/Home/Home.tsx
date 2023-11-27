import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HomeProps } from './HomeTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import selectSearchValue from '../../store/features/searchValue/searchValueSelector';
import { useFetchDataQuery } from '../../store/features/pokemonApi/pokemonApi';
import { setItemsPerPage } from '../../store/features/itemsPerPage/itemsPerPageSlice';
import { FIRST_PAGE } from '../../constants/constants';
import localStorageSerive from '../../utils/localStorageService';
import { setData } from '../../store/features/data/dataSlice';
import { setIsMainPageLoading } from '../../store/features/mainPageLoading/mainPageLoadingSlice';
import handleCloseSideMenu from '../../utils/closeSideMenu';
import SearchDataSection from '../SearchDataSection/SearchDataSection';
import DataSection from '../DataSection/DataSection';

export default function Home({ data }: HomeProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { page, pageSize, details } = router.query;
  const currentPage = typeof page === 'string' ? page : '';
  const currentPageSize = typeof pageSize === 'string' ? pageSize : '';
  const searchValue = useAppSelector(selectSearchValue);
  const [queryParams, setQueryParams] = useState({
    searchValue,
    page: currentPage,
    pageSize: currentPageSize,
  });
  const { data: fetchedData, isFetching, refetch } = useFetchDataQuery(queryParams);

  const handleUpdateItemsOnPage = (value: string) => {
    dispatch(setItemsPerPage(value));
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page: FIRST_PAGE, pageSize: value },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleRefreshData = () => {
    setQueryParams({
      searchValue,
      page: typeof page === 'string' ? page : '',
      pageSize: typeof pageSize === 'string' ? pageSize : '',
    });

    refetch();
  };

  const handleSendSearchValue = async (): Promise<void> => {
    localStorageSerive.set('searchValue', searchValue);
    handleRefreshData();
  };

  useEffect(() => {
    dispatch(setData(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (fetchedData) dispatch(setData(fetchedData));
  }, [fetchedData, dispatch]);

  useEffect(() => {
    handleRefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  useEffect(() => {
    dispatch(setIsMainPageLoading(isFetching));
  }, [isFetching, dispatch]);
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/aria-role, jsx-a11y/interactive-supports-focus
    <div
      role="button"
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.tagName === 'IMG' || target.tagName === 'BUTTON' || target.tagName === 'SELECT')
          return;
        if (details) handleCloseSideMenu();
      }}
    >
      <SearchDataSection
        pageSize={currentPageSize}
        handleSendSearchValue={handleSendSearchValue}
        handleUpdateItemsOnPage={handleUpdateItemsOnPage}
      />
      <DataSection />
    </div>
  );
}
