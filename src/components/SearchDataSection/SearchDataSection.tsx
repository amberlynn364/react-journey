import styles from './SearchDataSection.module.scss';
import SearchBar from '../View/SearchBar/SearchBar';
import Button from '../View/Button/Button';
import { SearchDataProps } from './SearchDataSectionTypes';
import Dropdown from '../View/Dropdown/Dropdown';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import selectSearchValue from '../../store/features/searchValue/searchValueSelector';
import { setSearchValue } from '../../store/features/searchValue/searchValueSlice';
import selectMainPageLoading from '../../store/features/mainPageLoading/mainPageLoadingSelector';

export default function SearchData({
  pageSize,
  handleSendSearchValue,
  handleUpdateItemsOnPage,
}: SearchDataProps) {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);
  const isLoading = useAppSelector(selectMainPageLoading);

  const handleUpdateSearchValue = (newValue: string) => {
    dispatch(setSearchValue(newValue));
  };

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
