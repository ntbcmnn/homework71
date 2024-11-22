import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICartDish, IFormattedOrder, IOrder, IOrderAPI, IOrderItem, IPizza, IPizzaAPI } from '../../types';
import axiosAPI from '../../api/axiosAPI';
import { AxiosResponse } from 'axios';

export const sendOrder = createAsyncThunk<void, ICartDish[]>(
  'orders/sendOrder',
  async (cartPizzas: ICartDish[]) => {
    const order: IOrder = {};

    cartPizzas.forEach((pizza: ICartDish) => {
      order[pizza.pizza.id] = pizza.amount;
    });

    await axiosAPI.post('orders.json', order);
  }
);

export const fetchOrders = createAsyncThunk<IFormattedOrder[], void>(
  'orders/fetchOrders',
  async () => {
    const ordersResponse: AxiosResponse<IOrderAPI> = await axiosAPI.get<IOrderAPI>('orders.json');
    const pizzasResponse: AxiosResponse<IPizzaAPI> = await axiosAPI.get<IPizzaAPI>('pizzas.json');
    const deliveryPrice: number = 150;

    if (ordersResponse.data && pizzasResponse.data) {
      return Object.entries(ordersResponse.data).map(([orderId, orderItems]) => {
        const orders: IOrderItem[] = Object.entries(orderItems).map(([dishId, amount]) => {

          const dish: IPizza = pizzasResponse.data[dishId];
          const {title, price} = dish;

          return {
            title,
            amount,
            price,
            totalPrice: price * amount,
          };
        });

        const total: number = orders.reduce((sum: number, order: IOrderItem) => sum + order.totalPrice, 0);

        return {
          id: orderId,
          orders,
          delivery: deliveryPrice,
          total: total + deliveryPrice,
        };
      });
    }
    return [];
  }
);

export const completeOrder = createAsyncThunk('orders/completeOrder',
  async (orderId: string) => {
    await axiosAPI.delete(`orders/${orderId}.json`);
  });