import { fireEvent, render, screen } from '@testing-library/react';
import SearchData from '../components/SearchDataSection/SearchDataSection';

jest.mock('../MyContext/MyContext', () => ({
  useAppContext: jest.fn(() => ({
    searchValue: 'initialValue',
    handleUpdateSearchValue: jest.fn(),
    isLoading: false,
  })),
}));

describe('SearchData component', () => {
  it('renders correctly', () => {
    render(
      <SearchData
        pageSize="10"
        handleSendSearchValue={() => {}}
        handleUpdateItemsOnPage={() => {}}
      />
    );

    const searchBarLabel = screen.getByLabelText('Enter character name');
    expect(searchBarLabel).toBeInTheDocument();

    const searchButton = screen.getByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  it('handles user interactions correctly', () => {
    const handleSendSearchValueMock = jest.fn();
    const handleUpdateItemsOnPageMock = jest.fn();

    render(
      <SearchData
        pageSize="10"
        handleSendSearchValue={handleSendSearchValueMock}
        handleUpdateItemsOnPage={handleUpdateItemsOnPageMock}
      />
    );

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    expect(handleSendSearchValueMock).toHaveBeenCalled();
  });
});
