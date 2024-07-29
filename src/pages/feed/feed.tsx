import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TOrdersData } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { RootState } from '../../services/store';
import { getFeedsThunk } from '../../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../services/hook';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((store: RootState) => store.orders);
  let ordersData: TOrdersData = {
    orders: [],
    total: 0,
    totalToday: 0
  };
  if (ordersState.orderData) {
    ordersData = ordersState.orderData;
  }

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  const ordersLoad = useCallback(() => {
    if (ordersState.isFirstLoading && !ordersState.isLoading) {
      handleGetFeeds();
    }
  }, [dispatch]);

  useEffect(() => {
    ordersLoad();
  }, [ordersLoad]);

  if (!ordersData.orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={ordersData.orders}
      handleGetFeeds={handleGetFeeds}
      total={ordersData.total}
      totalToday={ordersData.totalToday}
    />
  );
};
