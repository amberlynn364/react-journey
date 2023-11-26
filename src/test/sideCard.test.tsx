import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { store } from '../store/store';
import SideCardDescription from '../components/SideCardDetails/SideCardDescription/SideCardDescription';

test('renders SideCardDescription component with correct data', async () => {
  const mockData = {
    data: {
      name: 'Card Name',
      hp: '100',
      rarity: 'Common',
      types: ['Type1'],
      flavorText: 'Lorem ipsum dolor sit amet',
    },
  };

  render(
    <Provider store={store}>
      <SideCardDescription data={mockData} />
    </Provider>,
    { wrapper: MemoryRouterProvider }
  );

  expect(screen.getByText('Name:')).toHaveTextContent('Card Name');
  expect(screen.getByText('HP:')).toHaveTextContent('100');
  expect(screen.getByText('Rarity:')).toHaveTextContent('Common');
  expect(screen.getByText('Type:')).toHaveTextContent('Type1');
  expect(screen.getByText('Description:')).toHaveTextContent('Lorem ipsum dolor sit amet');
});

test('renders correctly when data is undefined', () => {
  const { container } = render(
    <Provider store={store}>
      <SideCardDescription data={undefined} />
    </Provider>,
    { wrapper: MemoryRouterProvider }
  );
  expect(container.textContent).toBe('close menu');
});
