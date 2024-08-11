import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hook';
import { RootState } from '../../services/store';

type IngredientID = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<IngredientID>();
  const getIngredientById = (id: string) => (state: RootState) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id);
  const ingredientData = useAppSelector(getIngredientById(id || '0'));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
