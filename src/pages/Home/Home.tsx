import { Component } from 'react';
import './Home.module.scss';
import SearchData from '../../components/SearchData/SearchData';
import DataCard from '../../components/DataCard/DataCard';
import { HomeStates } from './HomeTypes';

class Home extends Component {
  state: HomeStates = {
    data: null,
    searchValue: '',
    isLoading: false,
  };

  async componentDidMount() {
    const apiUrl = 'https://swapi.dev/api/people/';
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

  setSearchValue = (newValue: string) => {
    this.setState({ searchValue: newValue });
  };

  sendSearchValue = async () => {
    const { searchValue } = this.state;
    const searchName = searchValue;
    const apiUrl = `https://swapi.dev/api/people/?search=${searchName}`;
    this.setState({ isLoading: true });
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.setState({ isLoading: false });
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data });
      });
  };

  render() {
    const { data, searchValue, isLoading } = this.state;
    return (
      <div>
        <SearchData
          searchValue={searchValue}
          setSearchValue={this.setSearchValue}
          sendSearchValue={this.sendSearchValue}
        />
        <h1>Star Wars Characters</h1>
        <DataCard data={data} isLoading={isLoading} />
      </div>
    );
  }
}

export default Home;
