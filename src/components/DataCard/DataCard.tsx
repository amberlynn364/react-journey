import { Component } from 'react';
import './DataCard.module.scss';
import { DataCardProps } from './DataCardTypes';

export default class DataCard extends Component<DataCardProps> {
  render() {
    const { data, isLoading } = this.props;
    console.log(isLoading);
    if (isLoading) return <p>Loading data...</p>;
    return (
      data && (
        <ul>
          {data.results.map((character) => (
            <li key={character.name}>{character.name}</li>
          ))}
        </ul>
      )
    );
  }
}
