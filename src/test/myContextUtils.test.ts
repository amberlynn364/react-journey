import { act } from 'react-dom/test-utils';
import createHandleUpdateSearchValue from '../MyContext/MyContextUtils';

describe('createHandleUpdateSearchValue', () => {
  it('should update the search value', () => {
    const setSearchValue = jest.fn();
    const handleUpdateSearchValue = createHandleUpdateSearchValue(setSearchValue);

    act(() => {
      handleUpdateSearchValue('new search value');
    });

    expect(setSearchValue).toHaveBeenCalledWith('new search value');
  });
});
