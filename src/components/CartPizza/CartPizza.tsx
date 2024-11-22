import { ICartDish } from '../../types';
import React from 'react';

interface Props {
  pizza: ICartDish;
}

const CartPizza: React.FC<Props> = ({pizza}) => {
  return (
    <div className="card mb-3 p-3">
      <div className="card-body row align-items-center justify-content-between">
        <h4 className="card-title mb-3">{pizza.pizza.title}</h4>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="card-text">x{pizza.amount}</p>
        </div>
        <p className="card-text fw-bold">{pizza.pizza.price} KGS</p>
      </div>
    </div>
  );
};

export default CartPizza;