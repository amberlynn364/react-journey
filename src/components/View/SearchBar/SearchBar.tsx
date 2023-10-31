import { ChangeEvent } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBarTypes';
import debounce from '../../../utils/debounce';

export default function SeacrhBar({ value, defaultValue, label, onChange }: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const debouncedOnChange = debounce<string>((inputValue) => onChange(inputValue), 0);
    debouncedOnChange(newValue);
  };
  return (
    <div className={`${styles.form}`}>
      <input
        type="input"
        className={styles.formField}
        placeholder={label}
        name="search-bar"
        id="search-bar"
        defaultValue={defaultValue}
        value={value}
        onChange={handleInputChange}
      />
      <label htmlFor="search-bar" className={styles.formLabel}>
        {label}
      </label>
    </div>
  );
}
