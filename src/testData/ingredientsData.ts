export const mockBun1 = {
  _id: '444444',
  name: 'Булка',
  type: 'bun',
  proteins: 50,
  fat: 50,
  carbohydrates: 50,
  calories: 50,
  price: 50,
  image: 'imageBun1',
  image_mobile: 'imageMobileBun1',
  image_large: 'imageLargeBun1'
};

export const mockBun2 = {
  _id: '666666',
  name: 'Булка',
  type: 'bun',
  proteins: 70,
  fat: 70,
  carbohydrates: 70,
  calories: 70,
  price: 70,
  image: 'imageBun2',
  image_mobile: 'imageMobileBun2',
  image_large: 'imageLargeBun2'
};

export const mockMain1 = {
  _id: '111111',
  name: 'Котлета 1',
  type: 'main',
  proteins: 100,
  fat: 100,
  carbohydrates: 100,
  calories: 100,
  price: 100,
  image: 'image1',
  image_mobile: 'imageMobile1',
  image_large: 'imageLarge1'
};

export const mockMain2 = {
  _id: '333333',
  name: 'Котлета 2',
  type: 'main',
  proteins: 300,
  fat: 300,
  carbohydrates: 300,
  calories: 300,
  price: 300,
  image: 'image3',
  image_mobile: 'imageMobile3',
  image_large: 'imageLarge3'
};

export const mockSauce1 = {
  _id: '222222',
  name: 'Соус',
  type: 'sauce',
  proteins: 200,
  fat: 200,
  carbohydrates: 200,
  calories: 200,
  price: 200,
  image: 'image2',
  image_mobile: 'imageMobile2',
  image_large: 'imageLarge2'
};

export const mockSauce2 = {
  _id: '555555',
  name: 'Соус',
  type: 'sauce',
  proteins: 60,
  fat: 60,
  carbohydrates: 60,
  calories: 60,
  price: 60,
  image: 'image4',
  image_mobile: 'imageMobile4',
  image_large: 'imageLarge4'
};

export const mockAllIngredients = [
  mockMain1,
  mockSauce1,
  mockSauce2,
  mockMain2,
  mockBun1,
  mockBun2
];

export const mockIngredients = [mockMain1, mockSauce1, mockMain2];

export const mockIngredientsAfterAdd = [
  mockMain1,
  mockSauce1,
  mockMain2,
  mockSauce2
];

export const mockIngredientsAfterMoveUp = [mockSauce1, mockMain1, mockMain2];

export const mockIngredientsAfterMoveDown = [mockMain1, mockMain2, mockSauce1];

export const mockIngredientsAfterDelete = [mockMain1, mockMain2];
