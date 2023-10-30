import { Component } from 'react';
import styles from './DataSection.module.scss';
import DataCard from '../DataCard/DataCard';
import { DataSectionProps } from './DataSectionTypes';
import LoadingSpinner from '../View/LoadingSpinner/LoadingSpinner';

export default class DataSection extends Component<DataSectionProps> {
  render() {
    const { data, isLoading } = this.props;
    if (isLoading) {
      return (
        <section className={styles.dataSection}>
          <LoadingSpinner />
        </section>
      );
    }
    return (
      <section className={styles.dataSection}>
        <h1>Star Wars Characters</h1>
        <DataCard data={data} isLoading={isLoading} />
      </section>
    );
  }
}
