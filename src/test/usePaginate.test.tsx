import { NavigateFunction } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import usePagination from '../hooks/usePagination/usePaginationOLD';
import { ApiResponse } from '../services/types';
import { store } from '../store/store';

describe('usePagination hook', () => {
  it('should update query parameters when calling handleUpdatePageNumber', () => {
    const setSearchParamsMock = jest.fn();
    const locationPathName = '/example-path';
    const id = 'example-id';
    const navigate: NavigateFunction = setSearchParamsMock;
    const isMenuOpen = true;
    const data: ApiResponse = {
      count: 150,
      data: [
        {
          id: '1',
          name: 'Character Name',
          images: {
            small: 'character-image.jpg',
            large: 'character-image-large.jpg',
          },
        },
      ],
      page: 1,
      pageSize: 10,
      totalCount: 100,
    };

    const { result } = renderHook(
      () => usePagination(data, setSearchParamsMock, locationPathName, navigate, id, isMenuOpen),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.handleUpdatePageNumber('increment');

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: '2',
      pageSize: '10',
    });
  });

  it('should update query parameters when setting first page', () => {
    const setSearchParamsMock = jest.fn();
    const locationPathName = '/example-path';
    const id = 'example-id';
    const navigate: NavigateFunction = setSearchParamsMock;
    const isMenuOpen = true;

    const data: ApiResponse = {
      count: 150,
      data: [
        {
          id: '2',
          name: 'Character Name',
          images: {
            small: 'character-image.jpg',
            large: 'character-image-large.jpg',
          },
        },
      ],
      page: 2,
      pageSize: 10,
      totalCount: 100,
    };

    const { result } = renderHook(
      () => usePagination(data, setSearchParamsMock, locationPathName, navigate, id, isMenuOpen),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.handleUpdatePageNumber('first-page');

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: '1',
      pageSize: '10',
    });
  });

  it('should not call deleteIDFromUrl when isMenuOpen is false', () => {
    const setSearchParamsMock = jest.fn();
    const locationPathName = '/example-path';
    const id = 'example-id';
    const isMenuOpen = false;
    const navigate: NavigateFunction = setSearchParamsMock;
    const data: ApiResponse | null = null;

    const { result } = renderHook(
      () => usePagination(data, setSearchParamsMock, locationPathName, navigate, id, isMenuOpen),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.handleUpdatePageNumber('increment');

    expect(navigate).not.toHaveBeenCalled();
  });

  it('calls navigate with the correct parameters when isMenuOpen is false', () => {
    const mockNavigate = jest.fn();
    const mockSetSearchParams = jest.fn();

    const { result } = renderHook(
      () =>
        usePagination(
          { count: 50, page: 1, pageSize: 10, totalCount: 100, data: [] },
          mockSetSearchParams,
          '/example-path',
          mockNavigate,
          'someId',
          false
        ),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.deleteIDFromUrl();

    expect(mockNavigate).toHaveBeenCalledWith('/example-path', { replace: true });
  });

  it('calls deleteIDFromUrl and sets search params correctly for decrement', () => {
    const mockNavigate = jest.fn();
    const mockSetSearchParams = jest.fn();

    const { result } = renderHook(
      () =>
        usePagination(
          { count: 50, page: 2, pageSize: 10, totalCount: 100, data: [] },
          mockSetSearchParams,
          '/example-path',
          mockNavigate,
          'someId',
          false
        ),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.handleUpdatePageNumber('decrement');

    expect(mockNavigate).toHaveBeenCalledWith('/example-path', { replace: true });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: '1',
      pageSize: '10',
    });
  });
  it('calls deleteIDFromUrl and sets search params correctly for last-page', () => {
    const mockNavigate = jest.fn();
    const mockSetSearchParams = jest.fn();

    const { result } = renderHook(
      () =>
        usePagination(
          { count: 50, page: 2, pageSize: 10, totalCount: 100, data: [] },
          mockSetSearchParams,
          '/example-path',
          mockNavigate,
          'someId',
          false
        ),
      { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> }
    );

    result.current.handleUpdatePageNumber('last-page');
    expect(mockNavigate).toHaveBeenCalledWith('/example-path', { replace: true });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      page: String(100 / 10),
      pageSize: '10',
    });
  });
});
