import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import localStorageSerive from '../utils/localStorageService';
import { store } from '../store/store';
import router from '../router/router';

test('handleSendSearchValue sets searchValue in localStorage', async () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText('Enter character name'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));
  localStorageSerive.set('searchValue', 'test');
  expect(localStorage.getItem('searchValue')).toBe('test');
});
