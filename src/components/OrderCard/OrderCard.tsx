import React from 'react';
import { IOrderItem } from '../../types';

interface Props {
  order: IOrderItem;
}

const OrderCard: React.FC<Props> = ({order}) => {
  return (
    <div className="d-flex align-items-center justify-content-between gap-3">
      <p>{order.title}</p>
      <div className="d-flex gap-5">
        <p>x{order.amount}</p>
        <p>{order.price} KGS</p>
      </div>
    </div>
  );
};

export default OrderCard;