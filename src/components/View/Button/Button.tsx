import { Component } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './ButtonTypes';

export default class Button extends Component<ButtonProps> {
  handleButtonClick = () => {
    const { onClick } = this.props;
    if (onClick) onClick();
  };

  render() {
    const { children, buttonStyle, disabled } = this.props;
    return (
      <button
        type="submit"
        className={styles.button}
        onClick={this.handleButtonClick}
        style={buttonStyle}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}
