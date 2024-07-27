import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient, TUser } from '@utils-types';
import { RootState } from 'src/services/store';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  () => getIngredientsApi()
);

export const getIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((ingredient) => ingredient._id === id);

export interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  isExist: boolean;
  error: boolean;
}
const initialState: IngredientsState = {
  isLoading: false,
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  isExist: false,
  error: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
      state.isExist = false;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
      state.isExist = false;
    });
    builder.addCase(
      getIngredientsThunk.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.buns = [];
        state.mains = [];
        state.sauces = [];
        state.isExist = true; // Меняем значение isExist
        state.ingredients = action.payload;
        action.payload.forEach((ingredient: TIngredient) => {
          switch (ingredient.type) {
            case 'bun':
              state.buns.push(ingredient);
              break;
            case 'sauce':
              state.sauces.push(ingredient);
              break;
            case 'main':
              state.mains.push(ingredient);
              break;
          }
        });
      }
    );
  }
});

export default ingredientsSlice.reducer;
