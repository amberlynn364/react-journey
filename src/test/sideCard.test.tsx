import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SideCardDescription from '../pages/SideCardDetails/SideCardDescription/SideCardDescription';
import { AppContextProvider, useAppContext } from '../MyContext/MyContext';
import { IAppContext } from '../MyContext/MyContextTypes';

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
    <AppContextProvider>
      <MemoryRouter>
        <SideCardDescription data={mockData} />
      </MemoryRouter>
    </AppContextProvider>
  );

  expect(screen.getByText('Name:')).toHaveTextContent('Card Name');
  expect(screen.getByText('HP:')).toHaveTextContent('100');
  expect(screen.getByText('Rarity:')).toHaveTextContent('Common');
  expect(screen.getByText('Type:')).toHaveTextContent('Type1');
  expect(screen.getByText('Description:')).toHaveTextContent('Lorem ipsum dolor sit amet');
});

function ComponentForTestingHideComponentButton() {
  const { isMenuOpen, handleCloseSideMenu } = useAppContext() as IAppContext;

  return (
    <div>
      <p>{isMenuOpen ? 'Menu is open' : 'Menu is closed'}</p>
      <button type="submit" onClick={handleCloseSideMenu}>
        Close Menu
      </button>
    </div>
  );
}

test('SideCardDescription closes the menu', async () => {
  render(
    <AppContextProvider>
      <MemoryRouter>
        <ComponentForTestingHideComponentButton />
      </MemoryRouter>
    </AppContextProvider>
  );

  const closeButton = screen.getByText('Close Menu');
  expect(closeButton).toBeInTheDocument();

  await userEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.getByText('Menu is closed')).toBeInTheDocument();
  });
});
