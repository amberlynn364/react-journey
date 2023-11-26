import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import Paginate from '../components/View/Paginate/Paginate';
import { ApiResponse } from '../services/types';

describe('Paginate component', () => {
  it('renders without crashing', () => {
    const mockData: ApiResponse = {
      count: 1000,
      data: [
        {
          id: '1',
          name: 'Character Name',
          images: {
            small: 'character-image.jpg',
            large: 'character-image-large.jpg',
          },
        },
      ],
      totalCount: 100,
      pageSize: 10,
      page: 1,
    };

    render(<Paginate data={mockData} />, { wrapper: MemoryRouterProvider });

    expect(screen.getByText('First Page')).toBeInTheDocument();
    expect(screen.getByText('Prev Page')).toBeInTheDocument();
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
    expect(screen.getByText('Next Page')).toBeInTheDocument();
    expect(screen.getByText('Last Page')).toBeInTheDocument();
  });

  it('calls handleUpdatePageNumber correctly on button clicks', () => {
    const mockData = {
      count: 1000,
      data: [
        {
          id: '1',
          name: 'Character Name',
          images: {
            small: 'character-image.jpg',
            large: 'character-image-large.jpg',
          },
        },
      ],
      totalCount: 100,
      pageSize: 10,
      page: 3,
    };

    render(<Paginate data={mockData} />, { wrapper: MemoryRouterProvider });

    fireEvent.click(screen.getByText('Next Page'));
    expect(mockRouter.asPath).toBe('/?page=2&pageSize=10');

    fireEvent.click(screen.getByText('Prev Page'));
    expect(mockRouter.asPath).toBe('/?page=1&pageSize=10');

    fireEvent.click(screen.getByText('First Page'));
    expect(mockRouter.asPath).toBe('/?page=1&pageSize=10');

    const totalPages = Math.ceil(mockData.totalCount / mockData.pageSize);

    fireEvent.click(screen.getByText('Last Page'));
    expect(mockRouter.asPath).toBe(`/?page=${totalPages}&pageSize=10`);
  });
});
