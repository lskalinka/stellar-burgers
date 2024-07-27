import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  deleteLastOrder,
  saveUserOrderThunk
} from '../../features/user/userOrdersSlice';
import { clearConstructor } from '../../features/burger-constructor/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const burgerConstructorState = useSelector(
    (store: RootState) => store.burgerConstructor
  );
  const ordersState = useSelector((store: RootState) => store.userOrders);
  const userState = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  let bun = null;
  if (burgerConstructorState.bun) {
    bun = burgerConstructorState.bun;
  }

  const ingredients: TConstructorIngredient[] =
    burgerConstructorState.ingredients.map((ingredient, index) => ({
      ...ingredient,
      id: index.toString()
    }));

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = ordersState.orderRequest;

  const orderModalData = ordersState.lastOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest || userState.isLoading) return;
    if (!userState.user)
      navigate('/login', {
        replace: true
      });
    const ingredientsIds = [
      constructorItems.bun,
      ...constructorItems.ingredients
    ].map((ingredient) => ingredient._id);
    dispatch(saveUserOrderThunk(ingredientsIds));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    dispatch(deleteLastOrder());
    navigate('/', {
      replace: true
    });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
