import { ChangeEvent, Component } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBarTypes';
import debounce from '../../../utils/debounce';

export default class SearchBar extends Component<SearchBarProps> {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const { onChange } = this.props;
    const debouncedOnChange = debounce<string>((value) => onChange(value), 100);
    debouncedOnChange(newValue);
  };

  render() {
    const { value } = this.props;
    return (
      <div className={`${styles.form}`}>
        <input
          type="input"
          className={styles.formField}
          placeholder="Enter character name"
          name="search-bar"
          id="search-bar"
          value={value}
          onChange={this.handleInputChange}
        />
        <label htmlFor="search-bar" className={styles.formLabel}>
          Enter character name
        </label>
      </div>
    );
  }
}
