import { Component } from 'react';
import styles from './SearchDataSection.module.scss';
import SearchBar from '../View/SearchBar/SearchBar';
import Button from '../View/Button/Button';
import { SearchDataProps } from './SearchDataSectionTypes';

export default class SearchData extends Component<SearchDataProps> {
  render() {
    const { searchValue, setSearchValue, sendSearchValue, isLoading } =
      this.props;
    return (
      <section className={styles['search-section']}>
        <SearchBar
          value={searchValue}
          onChange={(newValue) => setSearchValue(newValue)}
        />
        <Button onClick={sendSearchValue} disabled={isLoading}>
          Search
        </Button>
      </section>
    );
  }
}
