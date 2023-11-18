import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrls } from '../../../services/fetchData';
import { ApiResponse } from '../../../services/types';
import { LoadedData } from '../../../pages/SideCardDetails/SideCardDetailsTypes';

interface FetchDataOptions {
  searchValue: string;
  currentPage: string | null;
  currentPageSize: string;
}

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: ApiUrls.DefaultUrl }),
  endpoints: (builder) => ({
    fetchData: builder.query<ApiResponse, FetchDataOptions>({
      query: (options) => {
        const { searchValue, currentPage, currentPageSize } = options;
        const url = !searchValue
          ? `?page=${currentPage || '1'}&pageSize=${currentPageSize || '10'}&select=id,name,images`
          : `?q=name:${searchValue}*&page=${currentPage || '1'}&pageSize=${
              currentPageSize || '10'
            }&select=id,name,images`;

        return { url };
      },
    }),
    fetchDataWithId: builder.query<LoadedData, string>({
      query: (id) => ({
        url: `${ApiUrls.DefaultUrl}/${id}`,
      }),
    }),
  }),
});

export const { useFetchDataQuery, useFetchDataWithIdQuery } = pokemonApi;

export default pokemonApi;
