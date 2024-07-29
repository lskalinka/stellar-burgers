import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState } from '../../services/store';
import { getUserOrdersThunk } from '../../features/user/userOrdersSlice';
import { useAppDispatch, useAppSelector } from '../../services/hook';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((store: RootState) => store.userOrders);
  let orders: TOrder[] = [];
  if (ordersState.orderData) {
    orders = ordersState.orderData.orders;
  }

  useEffect(() => {
    if (
      (ordersState.isFirstLoading && !ordersState.isLoading) ||
      !ordersState.orderData
    ) {
      dispatch(getUserOrdersThunk());
    }
  }, [ordersState]);
  return <ProfileOrdersUI orders={orders} />;
};
