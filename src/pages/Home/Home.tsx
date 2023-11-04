import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import DataSection from '../../components/DataSection/DataSection';
import localStorageSerive from '../../utils/localStorageService';
import { fetchData, fetchDataWithName } from '../../services/fetchData';
import { ApiResponse } from '../../services/types';
import usePagination from '../../hooks/usePagination/usePagination';

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [searchValue, setSearchValue] = useState<string>(
    localStorageSerive.get('searchValue') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSeacrhParams] = useSearchParams();
  const { handleUpdateItemsOnPage, handleUpdatePageNumber } = usePagination(data, setSeacrhParams);
  const pageSize = searchParams.get('pageSize') || '';
  const currentPage = searchParams.get('page');
  const currentPageSize = searchParams.get('pageSize');

  const handleUpdateSearchValue = (newValue: string): void => {
    setSearchValue(newValue);
  };
  const hanldeFetchDataAndSetData = async (): Promise<void> => {
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
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  return (
    <div>
      <SearchDataSection
        searchValue={searchValue}
        isLoading={isLoading}
        pageSize={pageSize}
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
