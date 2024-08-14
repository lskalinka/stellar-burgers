import { configureStore } from '@reduxjs/toolkit';
import { mockOrder1, mockOrdersData } from '../../testData/ordersData';
import userOrders, {
  deleteLastOrder,
  getUserOrdersThunk,
  initialState,
  saveUserOrderThunk,
  userOrdersSlice
} from './userOrdersSlice';
import * as api from '../../utils/burger-api';

describe('tests for user orders slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('tests return the initial state', () => {
    const result = userOrdersSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(initialState);
  });

  it('tests for getUserOrders action', async () => {
    const getOrdersSpy = jest
      .spyOn(api, 'getOrdersApi')
      .mockResolvedValue(mockOrdersData);
    const store = configureStore({
      reducer: { userOrders: userOrders }
    });

    await store.dispatch(getUserOrdersThunk());

    const result = store.getState().userOrders;

    expect(result).toEqual({
      ...initialState,
      orderData: mockOrdersData,
      isFirstLoading: false
    });
    expect(getOrdersSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for getFeeds pending state', () => {
    const action = { type: getUserOrdersThunk.pending.type };
    const result = userOrdersSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('tests for getFeeds rejected state', async () => {
    const action = { type: getUserOrdersThunk.rejected.type };
    const result = userOrdersSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for saveUserOrder action', async () => {
    const saveUserOrderThunkSpy = jest
      .spyOn(api, 'orderBurgerApi')
      .mockResolvedValue(mockOrder1);
    userOrdersSlice.reducer(
      {
        ...initialState,
        orderData: mockOrdersData
      },
      { type: 'UNKNOWN_ACTION' }
    );
    const store = configureStore({
      reducer: { userOrders: userOrders }
    });

    await store.dispatch(saveUserOrderThunk([]));

    const result = store.getState().userOrders;

    expect(result).toEqual({
      ...initialState,
      lastOrder: mockOrder1,
      orderData: null
    });
    expect(saveUserOrderThunkSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for saveUserOrder pending state', () => {
    const action = { type: saveUserOrderThunk.pending.type };
    const result = userOrdersSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: true
    });
  });

  it('tests for saveUserOrder rejected state', async () => {
    const action = { type: saveUserOrderThunk.rejected.type };
    const result = userOrdersSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for clearConstructor reducer', () => {
    const result = userOrdersSlice.reducer(
      {
        ...initialState,
        lastOrder: mockOrder1
      },
      deleteLastOrder()
    );
    expect(result).toEqual({ ...initialState, lastOrder: null });
  });
});
