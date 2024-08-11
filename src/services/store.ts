import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userSlice from '../features/user/userSlice';
import { loadState, saveState } from '../utils/local-storage';
import ingredientsSlice from '../features/ingredients/ingredientsSlice';
import burgerConstructorSlice from '../features/burger-constructor/burgerConstructorSlice';
import userOrdersSlice from '../features/user/userOrdersSlice';
import ordersSlice from '../features/orders/ordersSlice';

const rootReducer = combineReducers({
  user: userSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  userOrders: userOrdersSlice,
  orders: ordersSlice
});

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production'
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
