import React from 'react';
import CartPizza from '../CartPizza/CartPizza.tsx';
import { ICartDish } from '../../types';

interface Props {
  cart: ICartDish[];
}

const CartPizzas: React.FC<Props> = ({cart}) => {
  const total: number = cart.reduce((acc: number, cartDish: ICartDish) => {
    acc = acc + cartDish.pizza.price * cartDish.amount;
    return acc;
  }, 0);

  let cartList = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">The cart is empty. Add something...</h6>
    </div>
  );

  if (cart.length > 0) {
    cartList = (
      <div>
        {cart.map((cartPizza: ICartDish) => (
          <CartPizza key={cartPizza.pizza.id} pizza={cartPizza}/>
        ))}
        <hr/>
        <div className="row row-cols-2 align-items-center justify-content-between px-3">
          <div className="text-start p-0"><p><strong>Total: </strong></p></div>
          <div className="text-end p-0"><p>{total} KGS</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="row mt-2">
      {cartList}
    </div>
  );
};

export default CartPizzas;