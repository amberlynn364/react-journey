import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import CardDescription from '../components/DataCard/CardDescription/CardDescription';
import { PokemonCardData } from '../services/types';

import { store } from '../store/store';
import router from '../router/router';

const mockData: PokemonCardData = {
  id: '1',
  name: 'Character Name',
  images: {
    small: 'character-image.jpg',
    large: 'character-image-large.jpg',
  },
};

describe('testing cardDescription component', () => {
  it('CardDescription render the relevant card data', () => {
    render(<CardDescription character={mockData} />, { wrapper: BrowserRouter });

    const linkElement = screen.getByRole('link');
    const imageElement = screen.getByRole('img');

    expect(linkElement).toHaveAttribute('href', `/${mockData.id}`);
    expect(imageElement).toHaveAttribute('src', mockData.images.small);
    expect(imageElement).toHaveAttribute('alt', mockData.name);
  });

  it('renders SideCardDetails loading component', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });
  });

  it('renders SideCardDetails component after click link and fetch data', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    const user = userEvent.setup();

    await waitFor(
      async () => {
        expect(screen.getAllByRole('link')[0]).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
    const fetchSpy = jest.spyOn(global, 'fetch');
    await waitFor(async () => {
      await user.click(screen.getAllByRole('link')[0]);
    });
    expect(screen.getByText('Side Card')).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalled();
  });
});
