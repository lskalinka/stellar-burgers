export const mockOrder1 = {
  _id: '111111',
  status: 'готов',
  name: 'заказ1',
  createdAt: '01.01.1000',
  updatedAt: '01.01.1000',
  number: 111,
  ingredients: ['111', '222']
};

export const mockOrder2 = {
  _id: '222222',
  status: 'Ожидает',
  name: 'заказ2',
  createdAt: '02.02.2000',
  updatedAt: '02.02.2000',
  number: 222,
  ingredients: ['333', '444']
};

export const mockOrdersData = {
  orders: [mockOrder1, mockOrder2],
  total: 2,
  totalToday: 1
};
