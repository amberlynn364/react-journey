import { Component } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBarTypes';

export default class SearchBar extends Component<SearchBarProps> {
  render() {
    const { defaultValue } = this.props;
    return (
      <div className={`${styles.form}`}>
        <input
          type="input"
          className={styles.form__field}
          placeholder="Enter your request"
          name="search-bar"
          id="search-bar"
          defaultValue={defaultValue}
        />
        <label htmlFor="search-bar" className={styles.form__label}>
          Enter your request
        </label>
      </div>
    );
  }
}
