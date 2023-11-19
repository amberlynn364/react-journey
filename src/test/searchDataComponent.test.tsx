import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from '../store/store';
import router from '../router/router';

describe('SearchData component', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    const searchBarLabel = screen.getByLabelText('Enter character name');
    expect(searchBarLabel).toBeInTheDocument();

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });
});
