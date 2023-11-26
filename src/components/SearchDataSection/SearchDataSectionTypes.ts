export interface SearchDataProps {
  pageSize: string | null;
  handleSendSearchValue: () => void;
  handleUpdateItemsOnPage: (value: string) => void;
}
