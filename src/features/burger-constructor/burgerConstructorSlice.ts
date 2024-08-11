import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { getIngredientsThunk } from '../ingredients/ingredientsSlice';

export interface burgerConstructorState {
  isLoading: boolean;
  bun: TIngredient | null;
  ingredients: TIngredient[];
  isEmpty: boolean;
}
export const initialState: burgerConstructorState = {
  isLoading: false,
  ingredients: [],
  bun: null,
  isEmpty: false
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      // Проверить, что элемент найден и не является первым
      if (index > 0) {
        // Удалить элемент из текущей позиции
        const [element] = state.ingredients.splice(index, 1);

        // Вставить элемент на одну позицию выше
        state.ingredients.splice(index - 1, 0, element);
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      // Проверить, что элемент найден и не является последним
      if (index !== -1 && index < state.ingredients.length - 1) {
        // Удалить элемент из текущей позиции
        const [element] = state.ingredients.splice(index, 1);

        // Вставить элемент на одну позицию ниже
        state.ingredients.splice(index + 1, 0, element);
      }
    },
    deleteBun: (state) => {
      state.bun = null;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },

  extraReducers: (builder) => {}
});
export const {
  addIngredient,
  moveUpIngredient,
  moveDownIngredient,
  deleteBun,
  addBun,
  deleteIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
