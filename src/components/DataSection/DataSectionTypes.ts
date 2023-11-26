import { UpdatePageNumberTypes } from '../../hooks/usePagination/usePaginationTypes';

export interface DataSectionProps {
  handleUpdatePageNumber: (type: UpdatePageNumberTypes) => void | undefined;
}
