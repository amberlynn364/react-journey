import { ApiResponse } from './types';

export default class DataFetcher {
  private readonly API_URL = 'https://swapi.dev/api/people/';

  constructor(private response: ApiResponse | null = null) {}

  public async fetchData(value: string): Promise<ApiResponse | null> {
    const apiUrl = this.getApiUrl(value);

    try {
      const response: ApiResponse = await this.fetchDataFromApi(apiUrl);
      this.response = response;
    } catch (error) {
      throw new Error(`Error fetching data: ${error}`);
    }
    return this.response;
  }

  private getApiUrl(value: string): string {
    return value && value !== this.API_URL ? `${this.API_URL}?search=${value}` : this.API_URL;
  }

  private async fetchDataFromApi(apiUrl: string): Promise<ApiResponse> {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
}
