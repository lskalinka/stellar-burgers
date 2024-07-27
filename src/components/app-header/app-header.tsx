import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from '../../features/user/userSlice';

export const AppHeader: FC = () => {
  const userState = useSelector((store: RootState) => store.user);
  let userName = '';
  if (userState.user) {
    userName = userState.user.name;
  }
  return <AppHeaderUI userName={userName} />;
};
