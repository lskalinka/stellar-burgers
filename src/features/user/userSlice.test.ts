import user, {
  getUserThunk,
  initialState,
  loginUserThunk,
  logoutPasswordThunk,
  registerUserThunk,
  updateUserThunk,
  userSlice
} from './userSlice';
import { mockUser1, mockUser2 } from '../../testData/userData';
import { configureStore } from '@reduxjs/toolkit';
import * as api from '../../utils/burger-api';

describe('tests for orders slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('tests return the initial state', () => {
    const result = userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });

  it('tests for registerUser action', async () => {
    const registerUserSpy = jest
      .spyOn(api, 'registerUserApi')
      .mockResolvedValue(mockUser1);
    const store = configureStore({
      reducer: { user: user }
    });

    await store.dispatch(
      registerUserThunk({
        email: 'email',
        password: 'password',
        name: 'name'
      })
    );

    const result = store.getState().user;

    expect(result).toEqual({
      ...initialState,
      user: mockUser1
    });
    expect(registerUserSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for registerUser pending state', () => {
    const action = { type: registerUserThunk.pending.type };
    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('tests for registerUser rejected state', async () => {
    const action = { type: registerUserThunk.rejected.type };
    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for loginUser action', async () => {
    const loginUserSpy = jest
      .spyOn(api, 'loginUserApi')
      .mockResolvedValue(mockUser1);
    const store = configureStore({
      reducer: { user: user }
    });

    await store.dispatch(
      loginUserThunk({
        email: 'email',
        password: 'password'
      })
    );

    const result = store.getState().user;

    expect(result).toEqual({
      ...initialState,
      user: mockUser1
    });
    expect(loginUserSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for loginUser pending state', () => {
    const action = { type: loginUserThunk.pending.type };
    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('tests for loginUser rejected state', async () => {
    const action = { type: loginUserThunk.rejected.type };
    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for logoutPassword action', async () => {
    const logoutSpy = jest
      .spyOn(api, 'logoutApi')
      .mockResolvedValue({ success: true });
    userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      { type: 'UNKNOWN_ACTION' }
    );
    const store = configureStore({
      reducer: { user: user }
    });

    await store.dispatch(logoutPasswordThunk());

    const result = store.getState().user;

    expect(result).toEqual(initialState);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for logoutPassword pending state', () => {
    const action = { type: logoutPasswordThunk.pending.type };
    const result = userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      action
    );
    expect(result).toEqual({
      ...initialState,
      user: mockUser1,
      isLoading: true
    });
  });

  it('tests for logoutPassword rejected state', async () => {
    const action = { type: logoutPasswordThunk.rejected.type };
    const result = userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      user: mockUser1,
      error: true
    });
  });

  it('tests for getUser action', async () => {
    const getUserSpy = jest.spyOn(api, 'getUserApi').mockResolvedValue({
      success: true,
      user: mockUser1
    });
    const store = configureStore({
      reducer: { user: user }
    });

    await store.dispatch(getUserThunk());

    const result = store.getState().user;

    expect(result).toEqual({
      ...initialState,
      user: mockUser1
    });
    expect(getUserSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for getUser pending state', () => {
    const action = { type: getUserThunk.pending.type };
    const result = userSlice.reducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('tests for getUser rejected state', async () => {
    const action = { type: getUserThunk.rejected.type };
    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: true
    });
  });

  it('tests for updateUser action', async () => {
    const updateUserSpy = jest.spyOn(api, 'updateUserApi').mockResolvedValue({
      success: true,
      user: mockUser2
    });
    userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      { type: 'UNKNOWN_ACTION' }
    );
    const store = configureStore({
      reducer: { user: user }
    });

    await store.dispatch(
      updateUserThunk({
        email: 'email',
        password: 'password',
        name: 'name'
      })
    );

    const result = store.getState().user;

    expect(result).toEqual({
      ...initialState,
      user: mockUser2
    });
    expect(updateUserSpy).toHaveBeenCalledTimes(1);
  });

  it('tests for updateUser pending state', () => {
    const action = { type: updateUserThunk.pending.type };
    const result = userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      action
    );
    expect(result).toEqual({
      ...initialState,
      user: mockUser1,
      isLoading: true
    });
  });

  it('tests for updateUser rejected state', async () => {
    const action = { type: updateUserThunk.rejected.type };
    const result = userSlice.reducer(
      {
        ...initialState,
        user: mockUser1
      },
      action
    );

    expect(result).toEqual({
      ...initialState,
      user: mockUser1,
      error: true
    });
  });
});
