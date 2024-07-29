import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('orders/getFeeds', () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  (number: number) => getOrderByNumberApi(number).then((data) => data.orders)
);

export interface OrdersState {
  isLoading: boolean;
  isOrderLoading: boolean;
  order: TOrder | null;
  orderData: TOrdersData | null;
  error: boolean;
  isFirstLoading: boolean;
}
const initialState: OrdersState = {
  isLoading: false,
  isOrderLoading: false,
  order: null,
  orderData: null,
  error: false,
  isFirstLoading: true
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getFeedsThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      getFeedsThunk.fulfilled,
      (state, action: PayloadAction<TOrdersData>) => {
        state.isLoading = false;
        state.orderData = action.payload;
        state.error = false;
        if (state.isFirstLoading) {
          state.isFirstLoading = false;
        }
      }
    );
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.isOrderLoading = true;
      state.error = false;
      state.order = null;
    });
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.isOrderLoading = false;
      state.error = true;
    });
    builder.addCase(
      getOrderByNumber.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.isOrderLoading = false;
        const order = action.payload.shift();
        if (order) state.order = order;
        state.error = false;
      }
    );
  }
});

export default ordersSlice.reducer;
