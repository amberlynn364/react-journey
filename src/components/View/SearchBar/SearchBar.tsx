import { ChangeEvent, Component } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBarTypes';

export default class SearchBar extends Component<SearchBarProps> {
  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const { onChange } = this.props;
    onChange(newValue);
  };

  render() {
    const { value } = this.props;
    return (
      <div className={`${styles.form}`}>
        <input
          type="input"
          className={styles.form__field}
          placeholder="Enter character name"
          name="search-bar"
          id="search-bar"
          value={value}
          onChange={this.handleInputChange}
        />
        <label htmlFor="search-bar" className={styles.form__label}>
          Enter character name
        </label>
      </div>
    );
  }
}
