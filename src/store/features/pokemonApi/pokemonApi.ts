import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ApiUrls } from '../../../services/types';
import { LoadedData } from '../../../components/SideCardDetails/SideCardDetailsTypes';

interface FetchDataOptions {
  searchValue: string;
  page: string;
  pageSize: string;
}

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: ApiUrls.DefaultUrl }),
  endpoints: (builder) => ({
    fetchData: builder.query<ApiResponse, FetchDataOptions>({
      query: (options) => {
        const { searchValue, page, pageSize } = options;
        const url = !searchValue
          ? `?page=${page || '1'}&pageSize=${pageSize || '10'}&select=id,name,images`
          : `?q=name:${searchValue}*&page=${page || '1'}&pageSize=${
              pageSize || '10'
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

export const {
  useFetchDataQuery,
  useFetchDataWithIdQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export default pokemonApi;
