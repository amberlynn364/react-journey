import { Component } from 'react';
import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
  }
}
