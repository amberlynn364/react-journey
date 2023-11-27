import { SetURLSearchParams } from 'react-router-dom';
import { ApiResponse } from '../../services/types';
import { UpdatePageNumberTypes } from './usePaginationTypes';
import calculateTotalPages from '../../utils/calculateTotalPages';

export default function usePagination(
  data: ApiResponse | null,
  setSeacrhParams: SetURLSearchParams
) {
  const handleUpdatePageNumber = (type: UpdatePageNumberTypes): void => {
    if (!data) return;

    const currentPage = Number(data.page);
    const currentPageSize = data.pageSize.toString();
    const firstPage = '1';
    const lastPage = String(calculateTotalPages(data.totalCount, data.pageSize));

    switch (type) {
      case 'increment':
        setSeacrhParams({
          page: (currentPage + 1).toString(),
          pageSize: currentPageSize,
        });
        break;
      case 'decrement':
        setSeacrhParams({
          page: (currentPage - 1).toString(),
          pageSize: currentPageSize,
        });
        break;
      case 'first-page':
        setSeacrhParams({
          page: firstPage,
          pageSize: currentPageSize,
        });
        break;
      case 'last-page':
        setSeacrhParams({
          page: lastPage,
          pageSize: currentPageSize,
        });
        break;
      default:
        break;
    }
  };

  const handleUpdateItemsOnPage = (value: string) => {
    const firstPage = '1';
    if (data) {
      setSeacrhParams({
        page: firstPage,
        pageSize: value,
      });
    }
  };

  return {
    handleUpdatePageNumber,
    handleUpdateItemsOnPage,
  };
}
