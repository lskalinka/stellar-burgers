import { FC, memo } from 'react';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC<TOrdersData> = memo(
  ({ orders, total, totalToday }) => {
    const feed = { total, totalToday };

    const readyOrders = getOrders(orders, 'done');

    const pendingOrders = getOrders(orders, 'pending');

    return (
      <FeedInfoUI
        readyOrders={readyOrders}
        pendingOrders={pendingOrders}
        feed={feed}
      />
    );
  }
);
