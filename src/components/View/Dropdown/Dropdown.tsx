import { DropDownProps } from './DropDownTypes';
import styles from './Dropdown.module.scss';

export default function Dropdown({ pageSize, handleUpdateItemsOnPage }: DropDownProps) {
  const selectOptions = [5, 10, 15, 20];
  return (
    <div className={styles.selectWrapper}>
      <h4>Set the number of card on the page</h4>
      <select
        defaultValue={pageSize || ''}
        onChange={(e) => handleUpdateItemsOnPage(e.target.value)}
      >
        {selectOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
