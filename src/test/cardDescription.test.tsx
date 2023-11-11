import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CardDescription from '../components/DataCard/CardDescription/CardDescription';
import { PokemonCardData } from '../services/types';
import { AppContextProvider } from '../MyContext/MyContext';
import Home from '../pages/Home/Home';
import SideCardDetails from '../pages/SideCardDetails/SideCardDetails';

const mockData: PokemonCardData = {
  id: '1',
  name: 'Character Name',
  images: {
    small: 'character-image.jpg',
    large: 'character-image-large.jpg',
  },
};

test('CardDescription render the relevant card data', () => {
  render(
    <MemoryRouter>
      <CardDescription character={mockData} />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole('link');
  const imageElement = screen.getByRole('img');

  expect(linkElement).toHaveAttribute('href', `/${mockData.id}`);
  expect(imageElement).toHaveAttribute('src', mockData.images.small);
  expect(imageElement).toHaveAttribute('alt', mockData.name);
});

fetchMock.mockResponse(JSON.stringify({ data: 'mock data' }));

test('renders SideCardDetails component after click link', async () => {
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

  await waitFor(async () => {
    await user.click(screen.getAllByRole('link')[0]);
  });
  expect(screen.getByText('Side Card')).toBeInTheDocument();
});
