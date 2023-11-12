import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/View/SearchBar/SearchBar';

describe('SearchBar component', () => {
  it('renders correctly', () => {
    render(<SearchBar label="Search" value="" onChange={() => {}} />);

    const inputElement = screen.getByPlaceholderText('Search');
    const labelElement = screen.getByLabelText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('handles user input correctly', () => {
    const onChangeMock = jest.fn();
    render(<SearchBar label="Search" value="" onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText('Search');

    fireEvent.change(inputElement, { target: { value: 'test input' } });

    expect(onChangeMock).toHaveBeenCalledWith('test input');
  });
});
