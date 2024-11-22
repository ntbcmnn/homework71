import { useAppSelector } from '../../app/hooks.ts';
import { selectFormattedOrders } from '../../store/slices/ordersSlice.ts';
import { IFormattedOrder } from '../../types';
import Orders from '../../components/Orders/Orders.tsx';

const AdminOrders = () => {
  const orders: IFormattedOrder[] = useAppSelector(selectFormattedOrders);

  return (
    <>
      <h2 className="mb-5">Orders</h2>
      <Orders orders={orders}/>
    </>
  );
};

export default AdminOrders;