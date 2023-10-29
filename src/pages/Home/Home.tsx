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

  async componentDidMount(): Promise<void> {
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
  }

  setSearchValue = (newValue: string): void => {
    this.setState({ searchValue: newValue });
  };

  sendSearchValue = async (): Promise<void> => {
    const { searchValue } = this.state;
    localStorage.setItem('searchValue', searchValue);
    this.fetchData(searchValue);
  };

  throwError = (): void => {
    this.setState({ hasError: true });
  };

  async fetchData(value?: string) {
    const { searchValue } = this.state;
    let apiUrl = localStorage.getItem('searchValue')
      ? `https://swapi.dev/api/people/?search=${searchValue}`
      : 'https://swapi.dev/api/people/';

    if (value) apiUrl = `https://swapi.dev/api/people/?search=${value}`;
    this.setState({ isLoading: true });

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

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
