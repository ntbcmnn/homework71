import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPizza, IPizzaAPI, IPizzaForm } from '../../types';
import axiosAPI from '../../api/axiosAPI.ts';
import { AxiosResponse } from 'axios';

export const fetchPizzas = createAsyncThunk<IPizza[], void>(
  'pizzas/fetchPizzas',
  async () => {
    const response: AxiosResponse<IPizzaAPI> = await axiosAPI.get<IPizzaAPI>('pizzas.json');

    if (response.data) {
      const pizzasApi: IPizza[] = Object.keys(response.data).map((pizzaKey: string) => {
        return {
          ...response.data[pizzaKey],
          id: pizzaKey
        };
      });
      return pizzasApi.reverse();
    }
    return [];
  });


export const addPizza = createAsyncThunk<void, IPizzaForm>(
  'pizzas/addPizza',
  async (pizza) => {
    await axiosAPI.post('pizzas.json', {...pizza});
  }
);

export const deletePizza = createAsyncThunk<void, string>(
  'pizzas/deletePizza',
  async (pizzaId: string) => {
    await axiosAPI.delete(`pizzas/${pizzaId}.json`);

  }
);

export const getPizzaById = createAsyncThunk<IPizza | null, string>(
  'pizzas/getPizzaById',
  async (pizzaId: string) => {
    const response = await axiosAPI.get<IPizza | null>(`pizzas/${pizzaId}.json`);
    if (!response.data) return null;
    return response.data || null;
  }
);

export const editPizza = createAsyncThunk<void, { id: string, pizza: IPizza }>(
  'pizzas/editPizza',
  async ({id, pizza}) => {
    await axiosAPI.put(`pizzas/${id}.json`, {...pizza});
  }
);