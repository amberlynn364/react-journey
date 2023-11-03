/* eslint-disable @typescript-eslint/no-use-before-define */
import { ApiResponse } from './types';

enum ApiUrls {
  DefaultUrl = 'https://api.pokemontcg.io/v2/cards/',
}

export async function fetchData(
  page?: string | null,
  pageSize?: string | null
): Promise<ApiResponse | null> {
  const queryParams = `?page=${page || '1'}&pageSize=${pageSize || '10'}&select=id,name,images`;
  const apiUrl = `${ApiUrls.DefaultUrl}${queryParams}`;

  try {
    const response: ApiResponse = await fetchDataFromApi(apiUrl);
    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export async function fetchDataWithName(
  pokemonName: string,
  page?: string | null,
  pageSize?: string | null
): Promise<ApiResponse | null> {
  const queryParams = `?q=name:${pokemonName}*&page=${page || '1'}&pageSize=${
    pageSize || '10'
  }&select=id,name,images`;
  const apiUrl = `${ApiUrls.DefaultUrl}${queryParams}`;

  try {
    const response: ApiResponse = await fetchDataFromApi(apiUrl);
    return response;
  } catch (error) {
    return Promise.reject(new Error(`Error fetching data: ${error}`));
  }
}

async function fetchDataFromApi(apiUrl: string): Promise<ApiResponse> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
