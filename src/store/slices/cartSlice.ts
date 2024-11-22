import { ICartDish, IPizza } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface CartState {
  cartPizzas: ICartDish[];
}

const initialState: CartState = {
  cartPizzas: [],
};

export const selectCartPizzas = (state: RootState) => state.cart.cartPizzas;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, {payload: pizza}: PayloadAction<IPizza>) => {
      const existingPizza = state.cartPizzas.find(cartPizza => cartPizza.pizza.id === pizza.id);
      if (existingPizza) {
        existingPizza.amount += 1;
      } else {
        state.cartPizzas.push({pizza, amount: 1});
      }
    },
    removePizza: (state, {payload: pizzaId}: PayloadAction<string>) => {
      const existingPizza = state.cartPizzas.find(cartPizza => cartPizza.pizza.id === pizzaId);
      if (existingPizza) {
        if (existingPizza.amount > 1) {
          existingPizza.amount -= 1;
        } else {
          state.cartPizzas = state.cartPizzas.filter(cartPizza => cartPizza.pizza.id !== pizzaId);
        }
      }
    },
    clearCart: (state) => {
      state.cartPizzas = [];
    },
  }
});

export const cartReducer = cartSlice.reducer;
export const {addPizza, clearCart, removePizza} = cartSlice.actions;