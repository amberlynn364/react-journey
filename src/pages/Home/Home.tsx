import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import DataSection from '../../components/DataSection/DataSection';
import localStorageSerive from '../../utils/localStorageService';
import { fetchData, fetchDataWithName } from '../../services/fetchData';
import { ApiResponse } from '../../services/types';
import usePagination from '../../hooks/usePagination/usePagination';
import { IAppContext, useAppContext } from '../../MyContext';

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchValue, setSearchValue] = useState<string>(
    localStorageSerive.get('searchValue') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSeacrhParams] = useSearchParams();
  const { handleUpdateItemsOnPage, handleUpdatePageNumber } = usePagination(data, setSeacrhParams);
  const currentPage = searchParams.get('page');
  const currentPageSize = searchParams.get('pageSize');
  const { handleCloseSideMenu } = useAppContext() as IAppContext;

  const handleUpdateSearchValue = (newValue: string): void => {
    setSearchValue(newValue);
  };
  const hanldeFetchDataAndSetData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const fetchedData = searchValue
        ? await fetchDataWithName(searchValue, currentPage, currentPageSize)
        : await fetchData(currentPage, currentPageSize);

      setData(fetchedData);
      if (!currentPage && !currentPageSize) {
        if (fetchedData && fetchedData.page && fetchedData.pageSize) {
          setSeacrhParams({
            page: fetchedData.page.toString(),
            pageSize: fetchedData.pageSize.toString(),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, currentPageSize, searchValue, setSeacrhParams]);

  const handleSendSearchValue = async (): Promise<void> => {
    localStorageSerive.set('searchValue', searchValue);
    hanldeFetchDataAndSetData();
    if (data) {
      setSeacrhParams({
        page: '1',
        pageSize: data.pageSize.toString(),
      });
    }
  };

  useEffect(() => {
    hanldeFetchDataAndSetData();
  }, [currentPage, currentPageSize, hanldeFetchDataAndSetData]);

  return (
    <div
      role="button"
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.tagName === 'IMG' || target.tagName === 'BUTTON') return;
        handleCloseSideMenu();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          handleCloseSideMenu();
        }
      }}
      tabIndex={0}
    >
      <SearchDataSection
        searchValue={searchValue}
        isLoading={isLoading}
        pageSize={currentPageSize}
        handleUpdateSearchValue={handleUpdateSearchValue}
        handleSendSearchValue={handleSendSearchValue}
        handleUpdateItemsOnPage={handleUpdateItemsOnPage}
      />
      <DataSection
        data={data}
        isLoading={isLoading}
        handleUpdatePageNumber={handleUpdatePageNumber}
      />
    </div>
  );
}
