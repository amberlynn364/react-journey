import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  useFetchDataQuery,
  useFetchDataWithIdQuery,
} from '../store/features/pokemonApi/pokemonApi';
import { store } from '../store/store';

it('should fetch data successfully', async () => {
  const { result } = renderHook(
    () => useFetchDataQuery({ searchValue: 'pikachu', currentPage: '1', currentPageSize: '10' }),
    {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    }
  );

  await waitFor(() => {
    expect(result.current.data?.data.length).toBeGreaterThan(0);
  });
});

it('should fetch data with id successfully', async () => {
  const pikachuID = 'basep-1';
  const { result } = renderHook(() => useFetchDataWithIdQuery(pikachuID), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });

  await waitFor(() => {
    expect(result.current.data?.data.name).toBe('Pikachu');
  });
});
