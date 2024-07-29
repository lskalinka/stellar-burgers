import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types';

export const getUserOrdersThunk = createAsyncThunk(
  'userOrders/getUserOrders',
  () => getOrdersApi()
);

export const saveUserOrderThunk = createAsyncThunk(
  'userOrders/saveUserOrder',
  (data: string[]) => orderBurgerApi(data)
);

export interface OrdersState {
  isLoading: boolean;
  orderRequest: boolean;
  orderData: TOrdersData | null;
  error: boolean;
  isFirstLoading: boolean;
  lastOrder: TOrder | null;
}
const initialState: OrdersState = {
  isLoading: false,
  orderRequest: false,
  orderData: null,
  error: false,
  isFirstLoading: true,
  lastOrder: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    deleteLastOrder: (state) => {
      state.lastOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getUserOrdersThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      getUserOrdersThunk.fulfilled,
      (state, action: PayloadAction<TOrdersData>) => {
        state.isLoading = false;
        state.orderData = action.payload;
        state.error = false;
        if (state.isFirstLoading) {
          state.isFirstLoading = false;
        }
      }
    );

    builder.addCase(saveUserOrderThunk.pending, (state) => {
      state.isLoading = true;
      state.lastOrder = null;
      state.orderRequest = true;
      state.error = false;
    });
    builder.addCase(saveUserOrderThunk.rejected, (state) => {
      state.isLoading = false;
      state.lastOrder = null;
      state.orderRequest = false;
      state.error = true;
    });
    builder.addCase(
      saveUserOrderThunk.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        state.isLoading = false;
        state.orderRequest = false;
        state.lastOrder = action.payload;
        state.orderData = null;
        state.error = false;
      }
    );
  }
});

export const { deleteLastOrder } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
