import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiUrls } from './fetchData';

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: ApiUrls.DefaultUrl }),
  endpoints: (builder) => ({
    fetchData: builder.query({
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
  }),
});

export const { useFetchDataQuery } = pokemonApi;

export default pokemonApi;
