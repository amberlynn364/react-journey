import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Home from '../pages/Home/Home';
import { AppContextProvider } from '../MyContext/MyContext';
import localStorageSerive from '../utils/localStorageService';

test('handleSendSearchValue sets searchValue in localStorage', async () => {
  fetchMock.mockResponse(JSON.stringify({ data: 'mock data' }));
  render(
    <AppContextProvider>
      <Home />
    </AppContextProvider>,
    { wrapper: BrowserRouter }
  );

  fireEvent.change(screen.getByLabelText('Enter character name'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));
  localStorageSerive.set('searchValue', 'test');
  expect(localStorage.getItem('searchValue')).toBe('test');
});
