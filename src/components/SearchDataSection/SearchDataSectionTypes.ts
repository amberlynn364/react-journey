export interface SearchDataProps {
  searchValue: string;
  isLoading: boolean;
  handleUpdateSearchValue: (value: string) => void;
  handleSendSearchValue: () => void;
}
