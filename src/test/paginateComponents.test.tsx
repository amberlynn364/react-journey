import { fireEvent, render, screen } from '@testing-library/react';
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

    render(<Paginate data={mockData} handleUpdatePageNumber={() => {}} />);

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

    const handleUpdatePageNumberMock = jest.fn();

    render(<Paginate data={mockData} handleUpdatePageNumber={handleUpdatePageNumberMock} />);

    fireEvent.click(screen.getByText('Next Page'));
    expect(handleUpdatePageNumberMock).toHaveBeenCalledWith('increment');

    fireEvent.click(screen.getByText('Prev Page'));
    expect(handleUpdatePageNumberMock).toHaveBeenCalledWith('decrement');

    fireEvent.click(screen.getByText('First Page'));
    expect(handleUpdatePageNumberMock).toHaveBeenCalledWith('first-page');

    fireEvent.click(screen.getByText('Last Page'));
    expect(handleUpdatePageNumberMock).toHaveBeenCalledWith('last-page');
  });
});
