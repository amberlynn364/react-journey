import styles from './SearchDataSection.module.scss';
import SearchBar from '../View/SearchBar/SearchBar';
import Button from '../View/Button/Button';
import { SearchDataProps } from './SearchDataSectionTypes';
import Dropdown from '../View/Dropdown/Dropdown';

export default function SearchData({
  searchValue,
  isLoading,
  pageSize,
  handleUpdateSearchValue,
  handleSendSearchValue,
  handleUpdateItemsOnPage,
}: SearchDataProps) {
  return (
    <section className={styles['search-section']}>
      <SearchBar
        value={searchValue}
        label="Enter character name"
        onChange={(newValue) => handleUpdateSearchValue(newValue)}
      />
      <Button onClick={handleSendSearchValue} disabled={isLoading}>
        Search
      </Button>
      <Dropdown handleUpdateItemsOnPage={handleUpdateItemsOnPage} pageSize={pageSize} />
    </section>
  );
}
