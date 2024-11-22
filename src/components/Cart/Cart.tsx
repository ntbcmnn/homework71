import Modal from '../UI/Modal/Modal.tsx';
import { useState } from 'react';
import CartPizzas from '../CartPizzas/CartPizzas.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { clearCart, removePizza, selectCartPizzas } from '../../store/slices/cartSlice.ts';
import { ICartDish } from '../../types';
import { sendOrder } from '../../store/thunks/ordersThunk.ts';
import { selectSending } from '../../store/slices/ordersSlice.ts';
import { toast } from 'react-toastify';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';

const Cart = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const cartPizzas: ICartDish[] = useAppSelector(selectCartPizzas);
  const dispatch = useAppDispatch();
  const sending = useAppSelector(selectSending);

  const total: number = cartPizzas.reduce((acc: number, cartDish: ICartDish) => {
    acc = acc + cartDish.pizza.price * cartDish.amount;
    return acc;
  }, 0);

  const onOrder = async () => {
    if (cartPizzas.length > 0) {
      await dispatch(sendOrder(cartPizzas));
      setShowModal(false);
      dispatch(clearCart());
      toast.success('Your order sent successfully!');
    }
  };

  return (
    <>
      {cartPizzas.length > 0 &&
        <Modal show={showModal} defaultModalBtn closeModal={() => setShowModal(false)} title="Order">
          <div className="modal-body">
            {cartPizzas.map((pizza: ICartDish) => {
              return (
                <div key={pizza.pizza.id} className="d-flex justify-content-between align-items-center p-3">
                  <p>{pizza.pizza.title}</p>
                  <p>x{pizza.amount}</p>
                  <p>{pizza.pizza.price} KGS</p>
                  <button
                    className="btn btn-dark"
                    onClick={() => dispatch(removePizza(pizza.pizza.id))}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              );
            })}
            <hr/>
            <p className="fw-bold text-center mt-4">Total: {total} KGS</p>
          </div>
          <div className="text-center mb-3">
            <button
              disabled={sending}
              onClick={onOrder}
              type="button"
              className="btn btn-dark d-inline-flex gap-2 align-items-center"
            >
              Continue
              {sending ? <ButtonSpinner/> : null}
            </button>
          </div>
        </Modal>
      }

      <CartPizzas cart={cartPizzas}/>
      {cartPizzas.length > 0 ?
        <div className="text-center">
          <button className="btn btn-dark" onClick={() => setShowModal(true)}>Order</button>
        </div> : null
      }
    </>
  );
};

export default Cart;
