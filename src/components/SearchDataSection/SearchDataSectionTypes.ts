export interface SearchDataProps {
  searchValue: string;
  isLoading: boolean;
  pageSize: string | null;
  handleUpdateSearchValue: (value: string) => void;
  handleSendSearchValue: () => void;
  handleUpdateItemsOnPage: (value: string) => void;
}
