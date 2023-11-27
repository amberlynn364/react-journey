export interface SearchDataProps {
  searchValue: string;
  isLoading: boolean;
  setSearchValue: (value: string) => void;
  sendSearchValue: () => void;
}
