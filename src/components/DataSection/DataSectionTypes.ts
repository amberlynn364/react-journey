import { UpdatePageNumberTypes } from '../../hooks/usePagination/usePaginationTypes';
import { ApiResponse } from '../../services/types';

export interface DataSectionProps {
  data: ApiResponse | null;
  isLoading: boolean;
  handleUpdatePageNumber: (type: UpdatePageNumberTypes) => void | undefined;
}
