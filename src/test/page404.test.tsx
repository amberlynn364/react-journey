import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import App from '../App';
import router from '../router/router';

test('landing on a bad page', async () => {
  fetchMock.mockResponse(JSON.stringify({ data: 'mock data' }));
  render(<App />);
  expect(screen.queryByText(/Whoops/i)).toBeNull();
  act(() => {
    router.navigate('/some/bad/route');
  });
  await waitFor(() => {
    expect(screen.getByText(/Whoops/i)).toBeInTheDocument();
  });
});
