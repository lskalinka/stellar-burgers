import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState } from '../../services/store';
import { useAppSelector } from '../../services/hook';

export const AppHeader: FC = () => {
  const userState = useAppSelector((store: RootState) => store.user);
  let userName = '';
  if (userState.user) {
    userName = userState.user.name;
  }
  return <AppHeaderUI userName={userName} />;
};
