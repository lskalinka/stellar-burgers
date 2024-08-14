import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  (data: TRegisterData) => registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  (data: TLoginData) => loginUserApi(data)
);

export const logoutPasswordThunk = createAsyncThunk('users/logoutUser', () =>
  logoutApi()
);

export const getUserThunk = createAsyncThunk('users/getUser', () =>
  getUserApi().then((data) => data.user)
);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  (data: Partial<TRegisterData>) =>
    updateUserApi(data).then((data) => data.user)
);

export interface UserState {
  isLoading: boolean;
  user: TUser | null;
  error: boolean;
}
export const initialState: UserState = {
  isLoading: false,
  user: null,
  error: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      registerUserThunk.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
        }
        state.error = false;
      }
    );

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      loginUserThunk.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
        }
        state.error = false;
      }
    );

    builder.addCase(logoutPasswordThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(logoutPasswordThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(logoutPasswordThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
      state.user = null;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      getUserThunk.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
        }
        state.error = false;
      }
    );

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(
      updateUserThunk.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
        }
        state.error = false;
      }
    );
  }
});

export default userSlice.reducer;
