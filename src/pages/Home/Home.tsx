import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import DataSection from '../../components/DataSection/DataSection';
import localStorageSerive from '../../utils/localStorageService';
import { fetchData, fetchDataWithName } from '../../services/fetchData';
import usePagination from '../../hooks/usePagination/usePagination';
import { useAppContext } from '../../MyContext/MyContext';
import { IAppContext } from '../../MyContext/MyContextTypes';
import { useAppSelector } from '../../store/hooks';
import selectSearchValue from '../../store/features/searchValue/searchValueSelector';

export default function Home() {
  const searchValue = useAppSelector(selectSearchValue);
  const { data, setData, setIsLoading, handleCloseSideMenu, isMenuOpen } =
    useAppContext() as IAppContext;
  const [searchParams, setSeacrhParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const currentPageSize = searchParams.get('pageSize');
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleUpdateItemsOnPage, handleUpdatePageNumber } = usePagination(
    data,
    setSeacrhParams,
    location.pathname,
    navigate,
    id,
    isMenuOpen
  );

  const updateQueryParams = useCallback(
    (page: string, pageSize: string) => {
      if (!currentPage && !currentPageSize) {
        if (data && data.page && data.pageSize) {
          setSeacrhParams({
            page,
            pageSize,
          });
        }
      }
    },
    [currentPage, currentPageSize, data, setSeacrhParams]
  );

  const hanldeFetchDataAndSetData = async (): Promise<void> => {
    try {
      const fetchedData = searchValue
        ? await fetchDataWithName(searchValue, currentPage, currentPageSize)
        : await fetchData(currentPage, currentPageSize);

      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSendSearchValue = async (): Promise<void> => {
    setIsLoading(true);
    localStorageSerive.set('searchValue', searchValue);
    await hanldeFetchDataAndSetData();
    if (data) {
      setSeacrhParams({
        page: '1',
        pageSize: data.pageSize.toString(),
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await hanldeFetchDataAndSetData();
      updateQueryParams(data?.page.toString() || '', data?.pageSize.toString() || '');
      setIsLoading(false);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentPageSize]);
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
