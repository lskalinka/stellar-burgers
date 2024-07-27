import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredientById } from '../../features/ingredients/ingredientsSlice';

type IngredientID = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<IngredientID>();
  const ingredientData = useSelector(getIngredientById(id || '0'));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
