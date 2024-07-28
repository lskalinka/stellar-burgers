import { useParams } from 'react-router-dom';
import { DetailsPage } from './details';
import { OrderInfo } from '@components';

export const OrderDetailsPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  return (
    <DetailsPage title={`#${number}`}>
      <OrderInfo />
    </DetailsPage>
  );
};
