import { ChangeEvent } from 'react';
import styles from './SearchBar.module.scss';
import { SearchBarProps } from './SearchBarTypes';

export default function SeacrhBar({ value, defaultValue, label, onChange }: SearchBarProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
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
