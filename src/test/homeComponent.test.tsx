import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { Provider } from 'react-redux';
import localStorageSerive from '../utils/localStorageService';
import Home from '../components/Home/Home';
import { ApiResponse } from '../services/types';
import { store } from '../store/store';

const mockData: ApiResponse = {
  count: 1000,
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
  totalCount: 100,
  pageSize: 10,
  page: 1,
};

test('handleSendSearchValue sets searchValue in localStorage', async () => {
  render(
    <Provider store={store}>
      <Home data={mockData} />
    </Provider>,
    { wrapper: MemoryRouterProvider }
  );

  fireEvent.change(screen.getByLabelText('Enter character name'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));
  localStorageSerive.set('searchValue', 'test');
  expect(localStorage.getItem('searchValue')).toBe('test');
});
