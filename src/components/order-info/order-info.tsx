import { FC, useCallback, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumber } from '../../features/orders/ordersSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';

type OrderNumber = {
  number: string;
};

export const OrderInfo: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { number } = useParams<OrderNumber>();
  const ingredientsState = useSelector((store: RootState) => store.ingredients);
  const ordersState = useSelector((store: RootState) => store.orders);
  let orderData: TOrder | null = null;
  if (ordersState.order && ordersState.order.number === Number(number)) {
    orderData = ordersState.order;
  }

  const ordersLoad = useCallback(() => {
    if (
      (!ordersState.order || ordersState.order.number !== Number(number)) &&
      !ordersState.isOrderLoading
    ) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch]);

  useEffect(() => {
    ordersLoad();
  }, [ordersLoad]);

  const ingredients: TIngredient[] = ingredientsState.ingredients;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || ordersState.isOrderLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
