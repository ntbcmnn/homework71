import React, { useCallback, useEffect } from 'react';
import { IFormattedOrder, IOrderItem } from '../../types';
import Loader from '../UI/Loader/Loader.tsx';
import OrderCard from '../OrderCard/OrderCard.tsx';
import { completeOrder, fetchOrders } from '../../store/thunks/ordersThunk.ts';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetching } from '../../store/slices/ordersSlice.ts';

interface Props {
  orders: IFormattedOrder[];
}

const Orders: React.FC<Props> = ({orders}) => {
  const dispatch = useAppDispatch();
  const fetching: boolean = useAppSelector(selectFetching);

  const fetchAllOrders: () => Promise<void> = useCallback(async () => {
    await dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    void fetchAllOrders();
  }, [fetchAllOrders]);

  const deleteOrder: (orderId: string) => Promise<void> = async (orderId: string) => {
    if (confirm('Complete this order?')) {
      await dispatch(completeOrder(orderId));
      await fetchAllOrders();
      toast.success('Order completed!');
    } else toast.info('You rejected order deleting.');
  };

  return (
    <>
      {
        fetching ? <Loader/> : (
          orders.map((order: IFormattedOrder) => {
            return (
              <div className="card p-4 mb-4" key={order.id}>
                {order.orders.map((o: IOrderItem, index: number) => (
                  <OrderCard key={index} order={o}/>
                ))}
                <hr/>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <p className="fw-bold">Delivery: {order.delivery}</p>
                  <p className="fw-bold">Total order price: {order.total}</p>
                  <button
                    disabled={fetching}
                    onClick={() => deleteOrder(order.id)}
                    type="button"
                    className="btn btn-dark d-inline-flex gap-2 align-items-center"
                  >
                    Complete order
                  </button>
                </div>
              </div>
            );
          })
        )
      }
    </>
  );
};

export default Orders;