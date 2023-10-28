import { Component } from 'react';
import styles from './ErrorBoundary.module.scss';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundaryTypes';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className={styles['error-wrapper']}>
          <img
            src="error-img.svg"
            className={styles['error-img']}
            alt="error-img"
          />
          <h2>Whoops, Something went wrong</h2>
          <p>Please either refresh the page</p>
        </div>
      );
    }
    return children;
  }
}
