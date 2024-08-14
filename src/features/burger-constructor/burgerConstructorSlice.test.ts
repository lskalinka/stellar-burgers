import {
  burgerConstructorSlice,
  initialState,
  addIngredient,
  moveUpIngredient,
  moveDownIngredient,
  deleteBun,
  addBun,
  deleteIngredient,
  clearConstructor
} from './burgerConstructorSlice';
import {
  mockBun1,
  mockIngredients,
  mockIngredientsAfterAdd,
  mockIngredientsAfterDelete,
  mockIngredientsAfterMoveDown,
  mockIngredientsAfterMoveUp,
  mockSauce2
} from '../../testData/ingredientsData';

describe('tests for constructor slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('tests return the initial state', () => {
    const result = burgerConstructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(initialState);
  });

  it('tests for addIngredient reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: mockIngredients
      },
      addIngredient(mockSauce2)
    );
    expect(result).toEqual({
      ...initialState,
      ingredients: mockIngredientsAfterAdd
    });
  });

  it('tests for moveUpIngredient reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: mockIngredients
      },
      moveUpIngredient(1)
    );
    expect(result).toEqual({
      ...initialState,
      ingredients: mockIngredientsAfterMoveUp
    });
  });

  it('tests for moveDownIngredient reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: mockIngredients
      },
      moveDownIngredient(1)
    );
    expect(result).toEqual({
      ...initialState,
      ingredients: mockIngredientsAfterMoveDown
    });
  });

  it('tests for deleteIngredient reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: mockIngredients
      },
      deleteIngredient(1)
    );
    expect(result).toEqual({
      ...initialState,
      ingredients: mockIngredientsAfterDelete
    });
  });

  it('tests for deleteBun reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        bun: mockBun1
      },
      deleteBun()
    );
    expect(result).toEqual({ ...initialState, bun: null });
  });

  it('tests for addBun reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        bun: null
      },
      addBun(mockBun1)
    );
    expect(result).toEqual({ ...initialState, bun: mockBun1 });
  });

  it('tests for clearConstructor reducer', () => {
    const result = burgerConstructorSlice.reducer(
      {
        ...initialState,
        ingredients: mockIngredients,
        bun: mockBun1
      },
      clearConstructor()
    );
    expect(result).toEqual({ ...initialState, bun: null, ingredients: [] });
  });
});
