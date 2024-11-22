import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../store/slices/pizzasSlice.ts';
import { cartReducer } from '../store/slices/cartSlice.ts';
import ordersReducer from '../store/slices/ordersSlice.ts';

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;