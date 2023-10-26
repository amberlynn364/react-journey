import { Component } from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from './ButtonTypes';

export default class Button extends Component<ButtonProps> {
  render() {
    const { children } = this.props;
    return (
      <button type="submit" className={styles.button}>
        {children}
      </button>
    );
  }
}
