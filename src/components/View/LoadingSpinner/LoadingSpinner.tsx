import { Component } from 'react';
import './LoadingSpinner.css';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spinner">
        Loading
        <div className="spinner-sector spinner-sector-red" />
        <div className="spinner-sector spinner-sector-blue" />
        <div className="spinner-sector spinner-sector-green" />
      </div>
    );
  }
}
