import { Navigate, useLocation, RouteProps } from 'react-router-dom';
import { RootState } from '../../services/store';
import { Preloader } from '@ui';
import { useAppSelector } from '../../services/hook';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
} & RouteProps;

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
  ...routeProps
}: ProtectedRouteProps) => {
  const userState = useAppSelector((store: RootState) => store.user);
  const location = useLocation();
  if (userState.isLoading) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !userState.user) {
    // если пользователь не на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && userState.user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to='/' />;
  }
  return children;
};
