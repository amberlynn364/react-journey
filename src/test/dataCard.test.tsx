import { render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { PokemonCardData } from '../services/types';
import DataCard from '../components/DataCard/DataCard';

const mockData: PokemonCardData[] = [
  {
    id: '1',
    name: 'character 1',
    images: {
      large: 'img1_large.jpg',
      small: 'img1_smal.jpg',
    },
  },
  {
    id: '2',
    name: 'character 2',
    images: {
      large: 'img2_large.jpg',
      small: 'img2_smal.jpg',
    },
  },
];

test('DataCard renders the specified number of cards', () => {
  render(<DataCard data={mockData} />, { wrapper: MemoryRouterProvider });
  const cardElements = screen.queryAllByAltText(/character/);
  expect(cardElements).toHaveLength(mockData.length);
});

test('Display an appropriate message when no cards are present', () => {
  const emptyData: PokemonCardData[] | [] = [];
  render(<DataCard data={emptyData} />, { wrapper: MemoryRouterProvider });
  const noCardsMessage = screen.getByText('Character with this name was not found');
  expect(noCardsMessage).toBeInTheDocument();
});
