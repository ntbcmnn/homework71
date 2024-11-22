import { IPizza } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { addPizza, deletePizza, editPizza, fetchPizzas, getPizzaById } from '../thunks/pizzasThunk.ts';

interface PizzaState {
  pizzas: IPizza[];
  onePizza: IPizza | null;
  isFetching: boolean;
  isDeleting: boolean | string;
  isCreating: boolean;
  isEditing: boolean;
  error: boolean;
}

const initialState: PizzaState = {
  pizzas: [],
  onePizza: null,
  isFetching: false,
  isDeleting: false,
  isCreating: false,
  isEditing: false,
  error: false,
};

export const selectPizzas = (state: RootState) => state.pizzas.pizzas;
export const selectOnePizza = (state: RootState) => state.pizzas.onePizza;

export const selectFetchLoading = (state: RootState) => state.pizzas.isFetching;
export const selectCreateLoading = (state: RootState) => state.pizzas.isCreating;
export const selectEditLoading = (state: RootState) => state.pizzas.isEditing;

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
        state.isFetching = false;
        state.pizzas = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(addPizza.pending, (state) => {
        state.isCreating = true;
        state.error = false;
      })
      .addCase(addPizza.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addPizza.rejected, (state) => {
        state.isCreating = false;
        state.error = true;
      })
      .addCase(deletePizza.pending, (state, {meta}) => {
        state.isDeleting = meta.arg;
        state.error = false;
      })
      .addCase(deletePizza.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deletePizza.rejected, state => {
        state.isDeleting = false;
        state.error = true;
      })
      .addCase(getPizzaById.pending, state => {
        state.isFetching = true;
        state.onePizza = null;
        state.error = false;
      })
      .addCase(getPizzaById.fulfilled, (state, action: PayloadAction<IPizza | null>) => {
        state.isFetching = false;
        state.onePizza = action.payload;
      })
      .addCase(getPizzaById.rejected, state => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(editPizza.pending, state => {
        state.isEditing = true;
        state.error = false;
      })
      .addCase(editPizza.fulfilled, (state) => {
        state.isEditing = false;
        state.onePizza = null;
      })
      .addCase(editPizza.rejected, state => {
        state.isEditing = false;
        state.error = true;
      });
  }
});

export default pizzasSlice.reducer;