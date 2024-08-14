import orders, {
  ordersSlice,
  initialState,
  getFeedsThunk,
  getOrderByNumber
} from './ordersSlice';
import { mockOrder1, mockOrdersData } from '../../testData/ordersData';
import { configureStore } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';

describe('tests for orders slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('tests return the initial state', () => {
    const result = ordersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('tests for getFeeds action', async () => {
    const getFeedsSpy = jest
      .spyOn(api, 'getFeedsApi')
      .mockResolvedValue(mockOrdersData);
    const store = configureStore({
      reducer: { orders: orders }
    });

    await store.dispatch(getFeedsThunk());

    const result = store.getState().orders;

    expect(result).toEqual({
      ...initialState,
      orderData: mockOrdersData,
      isFirstLoading: false
    });
    expect(getFeedsSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for getFeeds pending state', () => {
    const action = { type: getFeedsThunk.pending.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('tests for getFeeds rejected state', async () => {
    const action = { type: getFeedsThunk.rejected.type };
    const result = ordersSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for getOrderByNumber action', async () => {
    const getOrderByNumberSpy = jest
      .spyOn(api, 'getOrderByNumberApi')
      .mockResolvedValue({
        success: true,
        orders: [mockOrder1]
      });
    const store = configureStore({
      reducer: { orders: orders }
    });

    await store.dispatch(getOrderByNumber(1));
    const result = store.getState().orders;

    expect(result).toEqual({
      ...initialState,
      order: mockOrder1
    });
    expect(getOrderByNumberSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for getOrderByNumber pending state', () => {
    const action = { type: getOrderByNumber.pending.type };
    const result = ordersSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isOrderLoading: true
    });
  });

  it('tests for getOrderByNumber rejected state', async () => {
    const action = { type: getOrderByNumber.rejected.type };
    const result = ordersSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });
});
