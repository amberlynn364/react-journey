import styles from './Button.module.scss';
import { ButtonProps } from './ButtonTypes';

export default function Button({ children, buttonStyle, disabled, onClick }: ButtonProps) {
  const handleButtonClick = () => {
    onClick?.();
  };

  return (
    <button
      type="submit"
      className={styles.button}
      onClick={handleButtonClick}
      style={buttonStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
