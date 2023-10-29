import { Component } from 'react';
import SearchDataSection from '../../components/SearchDataSection/SearchDataSection';
import { HomeStates } from './HomeTypes';
import Button from '../../components/View/Button/Button';
import DataSection from '../../components/DataSection/DataSection';
import DataFetcher from '../../services/DataFetcher';

const dataFetcher = new DataFetcher();

export default class Home extends Component {
  state: HomeStates = {
    data: null,
    searchValue: localStorage.getItem('searchValue') || '',
    isLoading: false,
    hasError: false,
  };

  componentDidMount(): void {
    this.handleDataFetch();
  }

  setSearchValue = (newValue: string): void => {
    this.setState({ searchValue: newValue });
  };

  handleDataFetch = async () => {
    const { searchValue } = this.state;
    this.setState({ isLoading: true });
    try {
      const data = await dataFetcher.fetchData(searchValue);
      this.setState({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  sendSearchValue = async (): Promise<void> => {
    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);
    this.handleDataFetch();
  };

  throwError = (): void => {
    this.setState({ hasError: true });
  };

  render() {
    const { data, searchValue, isLoading, hasError } = this.state;
    if (hasError) throw new Error('Thrown error');
    return (
      <>
        <SearchDataSection
          searchValue={searchValue}
          setSearchValue={this.setSearchValue}
          sendSearchValue={this.sendSearchValue}
          isLoading={isLoading}
        />
        <DataSection data={data} isLoading={isLoading} />
        <Button
          onClick={this.throwError}
          buttonStyle={{
            marginBottom: '20px',
          }}
        >
          Throw error!
        </Button>
      </>
    );
  }
}
