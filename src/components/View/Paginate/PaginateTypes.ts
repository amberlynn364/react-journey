// import { UpdatePageNumberTypes } from '../../../hooks/usePagination/usePaginationTypes';
import { ApiResponse } from '../../../services/types';

export default interface PaginateProps {
  data: ApiResponse | null;
  // handleUpdatePageNumber: (type: UpdatePageNumberTypes) => void;
}
