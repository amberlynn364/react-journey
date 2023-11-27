import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from '../router/router';
import { store } from '../store/store';

test('landing on a bad page', async () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
  expect(screen.queryByText(/Whoops/i)).toBeNull();
  act(() => {
    router.navigate('/some/bad/route');
  });
  await waitFor(() => {
    expect(screen.getByText(/Whoops/i)).toBeInTheDocument();
  });
});
