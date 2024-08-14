import { configureStore } from '@reduxjs/toolkit';
import {
  mockAllIngredients,
  mockBun1,
  mockBun2,
  mockMain1,
  mockMain2,
  mockSauce1,
  mockSauce2
} from '../../testData/ingredientsData';
import ingredients, {
  getIngredientsThunk,
  ingredientsSlice,
  initialState
} from './ingredientsSlice';
import * as api from '../../utils/burger-api';

describe('tests for ingredients slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('tests return the initial state', () => {
    const result = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(initialState);
  });

  it('tests for getIngredients action', async () => {
    const getIngredientsSpy = jest
      .spyOn(api, 'getIngredientsApi')
      .mockResolvedValue(mockAllIngredients);
    const store = configureStore({
      reducer: { ingredients: ingredients }
    });

    await store.dispatch(getIngredientsThunk());

    const IngredientsState = store.getState().ingredients;

    expect(IngredientsState).toEqual({
      ...initialState,
      ingredients: mockAllIngredients,
      buns: [mockBun1, mockBun2],
      mains: [mockMain1, mockMain2],
      sauces: [mockSauce1, mockSauce2],
      isExist: true
    });
    expect(getIngredientsSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for getIngredients pending state', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const result = ingredientsSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true,
      error: false,
      isExist: false
    });
  });

  it('tests for getIngredients rejected state', async () => {
    const action = { type: getIngredientsThunk.rejected.type };
    const result = ingredientsSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      error: true,
      isExist: false
    });
  });
});
