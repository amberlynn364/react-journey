import { render, screen } from '@testing-library/react';
import Sum from './sum';

it('renders Hello World', () => {
  render(<Sum />);
  const myElement = screen.getByText('Hello World');
  expect(myElement).toBeInTheDocument();
});
