import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import CardDescription from '../components/DataCard/CardDescription/CardDescription';
import { PokemonCardData } from '../services/types';

const mockData: PokemonCardData = {
  id: '1',
  name: 'Character Name',
  images: {
    small: 'character-image.jpg',
    large: 'character-image-large.jpg',
  },
};

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('testing cardDescription component', () => {
  it('CardDescription render the relevant card data', () => {
    render(<CardDescription character={mockData} />, { wrapper: MemoryRouterProvider });

    const imageElement = screen.getByRole('img');

    expect(imageElement).toHaveAttribute('id', mockData.id);
    expect(imageElement).toHaveAttribute('src', mockData.images.small);
    expect(imageElement).toHaveAttribute('alt', mockData.name);
  });

  it('CardDescription pushing search params', () => {
    render(<CardDescription character={mockData} />, { wrapper: MemoryRouterProvider });

    const imageElement = screen.getByRole('img');

    expect(imageElement).toHaveAttribute('id', mockData.id);

    fireEvent.click(imageElement);

    expect(mockRouter.asPath).toBe('/?page=1&pageSize=10&details=1');
  });
});
