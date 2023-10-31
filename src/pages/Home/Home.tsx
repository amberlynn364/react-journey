import { useEffect, useState } from 'react';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import { DataState } from './HomeTypes';
import DataSection from '../../components/DataSection/DataSection';
import localStorageSerive from '../../utils/localStorageService';
import fetchData from '../../services/fetchData';

export default function Home() {
  const [data, setData] = useState<DataState | null>(null);
  const [searchValue, setSearchValue] = useState<string>(
    localStorageSerive.get('searchValue') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDataFetch = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await fetchData(searchValue);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSearchValue = (newValue: string): void => {
    setSearchValue(newValue);
  };

  const handleSendSearchValue = (): void => {
    localStorageSerive.set('searchValue', searchValue);
    handleDataFetch();
  };
  useEffect(() => {
    handleDataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SearchDataSection
        searchValue={searchValue}
        handleUpdateSearchValue={handleUpdateSearchValue}
        handleSendSearchValue={handleSendSearchValue}
        isLoading={isLoading}
      />
      <DataSection data={data} isLoading={isLoading} />
    </>
  );
}
