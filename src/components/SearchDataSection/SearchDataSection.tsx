import styles from './SearchDataSection.module.scss';
import SearchBar from '../View/SearchBar/SearchBar';
import Button from '../View/Button/Button';
import { SearchDataProps } from './SearchDataSectionTypes';
import Dropdown from '../View/Dropdown/Dropdown';
import { useAppContext } from '../../MyContext/MyContext';
import { IAppContext } from '../../MyContext/MyContextTypes';

export default function SearchData({
  pageSize,
  handleSendSearchValue,
  handleUpdateItemsOnPage,
}: SearchDataProps) {
  const { searchValue, handleUpdateSearchValue, isLoading } = useAppContext() as IAppContext;
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
