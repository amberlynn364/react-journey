import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { AppContextProvider } from '../MyContext/MyContext';
import Home from '../pages/Home/Home';
import SideCardDetails from '../pages/SideCardDetails/SideCardDetails';

test('makes API call after link click', async () => {
  fetchMock.mockResponse(JSON.stringify({ data: 'mock data' }));
  render(
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<SideCardDetails />} />
      </Routes>
    </AppContextProvider>,
    { wrapper: BrowserRouter }
  );

  const user = userEvent.setup();

  const fetchSpy = jest.spyOn(global, 'fetch');
  await waitFor(async () => {
    expect(screen.getAllByRole('link')[0]).toBeInTheDocument();
  });
  await waitFor(async () => {
    await user.click(screen.getAllByRole('link')[0]);
  });

  expect(fetchSpy).toHaveBeenCalled();
});
