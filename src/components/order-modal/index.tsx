import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

interface OrderModalProps {
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ onClose }) => {
  const { number } = useParams<{ number: string }>();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};
