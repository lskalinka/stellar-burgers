import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrdersThunk } from '../../features/user/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const ordersState = useSelector((store: RootState) => store.userOrders);
  let orders: TOrder[] = [];
  if (ordersState.orderData) {
    orders = ordersState.orderData.orders;
  }

  useEffect(() => {
    if (ordersState.isFirstLoading && !ordersState.isLoading) {
      dispatch(getUserOrdersThunk());
    }
  }, [ordersState]);
  return <ProfileOrdersUI orders={orders} />;
};
