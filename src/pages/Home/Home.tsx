import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import DataSection from '../../components/DataSection/DataSection';
import localStorageSerive from '../../utils/localStorageService';
import usePagination from '../../hooks/usePagination/usePagination';
import { useAppContext } from '../../MyContext/MyContext';
import { IAppContext } from '../../MyContext/MyContextTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import selectSearchValue from '../../store/features/searchValue/searchValueSelector';
import selectItemsPerPage from '../../store/features/itemsPerPage/itemsPerPageSelector';
import { useFetchDataQuery } from '../../store/features/pokemonApi/pokemonApi';
import { setIsMainPageLoading } from '../../store/features/mainPageLoading/mainPageLoadingSlice';
import { setData } from '../../store/features/data/dataSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const [searchParams, setSeacrhParams] = useSearchParams();
  const searchValue = useAppSelector(selectSearchValue);
  const itemsPerPage = useAppSelector(selectItemsPerPage);
  const currentPage = searchParams.get('page');
  const currentPageSize = searchParams.get('pageSize') || itemsPerPage;
  const [queryParams, setQueryParams] = useState({
    searchValue,
    currentPage,
    currentPageSize,
  });
  const { data: fetchedData, isFetching, refetch } = useFetchDataQuery(queryParams);
  const { handleCloseSideMenu, isMenuOpen } = useAppContext() as IAppContext;
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleUpdateItemsOnPage, handleUpdatePageNumber } = usePagination(
    fetchedData,
    setSeacrhParams,
    location.pathname,
    navigate,
    id,
    isMenuOpen
  );

  const updateQueryParams = useCallback(
    (page: string, pageSize: string) => {
      if (!currentPage && !currentPageSize) {
        if (fetchedData && fetchedData.page && fetchedData.pageSize) {
          setSeacrhParams({
            page,
            pageSize,
          });
        }
      }
    },
    [currentPage, currentPageSize, fetchedData, setSeacrhParams]
  );

  const handleRefreshData = () => {
    setQueryParams({
      searchValue,
      currentPage,
      currentPageSize,
    });

    refetch();
  };

  const handleSendSearchValue = async (): Promise<void> => {
    localStorageSerive.set('searchValue', searchValue);
    handleRefreshData();
    updateQueryParams(currentPage || '', currentPageSize);
  };

  useEffect(() => {
    if (fetchedData) dispatch(setData(fetchedData));
  }, [fetchedData, dispatch]);

  useEffect(() => {
    handleRefreshData();
    updateQueryParams(currentPage || '', currentPageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentPageSize]);

  useEffect(() => {
    dispatch(setIsMainPageLoading(isFetching));
  }, [isFetching, dispatch]);
  return (
    <div
      role="button"
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.tagName === 'IMG' || target.tagName === 'BUTTON' || target.tagName === 'SELECT')
          return;
        if (isMenuOpen) handleCloseSideMenu();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          if (isMenuOpen) handleCloseSideMenu();
        }
      }}
      tabIndex={0}
    >
      <SearchDataSection
        pageSize={currentPageSize}
        handleSendSearchValue={handleSendSearchValue}
        handleUpdateItemsOnPage={handleUpdateItemsOnPage}
      />
      <DataSection handleUpdatePageNumber={handleUpdatePageNumber} />
    </div>
  );
}
