import itemsPerPageReducer, {
  setItemsPerPage,
} from '../store/features/itemsPerPage/itemsPerPageSlice';

describe('itemsPerPage slice', () => {
  it('should handle setItemsPerPage', () => {
    const initialState = { itemsPerPage: '10' };

    const nextState = itemsPerPageReducer.reducer(initialState, setItemsPerPage('20'));
    expect(nextState).toEqual({ itemsPerPage: '20' });

    const action = setItemsPerPage('30');
    expect(itemsPerPageReducer.reducer(initialState, action)).toEqual({ itemsPerPage: '30' });
  });
});
