import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormattedOrder } from '../../types';
import { completeOrder, fetchOrders, sendOrder } from '../thunks/ordersThunk.ts';
import { RootState } from '../../app/store.ts';

interface OrdersState {
  orders: IFormattedOrder[];
  sending: boolean;
  fetching: boolean;
  error: boolean;
}

const initialState: OrdersState = {
  orders: [],
  sending: false,
  fetching: false,
  error: false,
};

export const selectFormattedOrders = (state: RootState) => state.orders.orders;
export const selectSending = (state: RootState) => state.orders.sending;
export const selectFetching = (state: RootState) => state.orders.fetching;

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<IFormattedOrder[]>) => {
        state.fetching = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.fetching = false;
        state.error = true;
      })
      .addCase(sendOrder.pending, (state) => {
        state.sending = true;
        state.error = false;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.sending = false;
        state.error = true;
      })
      .addCase(completeOrder.pending, (state) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(completeOrder.fulfilled, (state) => {
        state.fetching = false;
        state.error = false;
      })
      .addCase(completeOrder.rejected, (state) => {
        state.fetching = false;
        state.error = true;
      });
  }
});

export default ordersSlice.reducer;