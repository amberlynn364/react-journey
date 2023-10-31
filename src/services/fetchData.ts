/* eslint-disable @typescript-eslint/no-use-before-define */
import { ApiResponse } from './types';

const API_URL = 'https://swapi.dev/api/people/';

export default async function fetchData(value: string): Promise<ApiResponse | null> {
  const apiUrl = getApiUrl(value);

  try {
    const response: ApiResponse = await fetchDataFromApi(apiUrl);
    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

function getApiUrl(value: string): string {
  return value && value !== API_URL ? `${API_URL}?search=${value}` : API_URL;
}

async function fetchDataFromApi(apiUrl: string): Promise<ApiResponse> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
