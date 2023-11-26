import { renderHook } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import usePagination from '../hooks/usePagination/usePagination';

describe('usePagination hook', () => {
  it('should update query parameters when calling nextPage', () => {
    const { result } = renderHook(() => usePagination(), {
      wrapper: MemoryRouterProvider,
    });

    result.current.nextPage();

    expect(mockRouter.asPath).toBe('/?page=2&pageSize=10');
  });

  it('should update query parameters when calling prevPage', () => {
    const { result } = renderHook(() => usePagination(), {
      wrapper: MemoryRouterProvider,
    });

    result.current.prevPage();

    expect(mockRouter.asPath).toBe('/?page=1&pageSize=10');
  });
});
