export interface IPizzaForm {
  title: string;
  price: number;
  image: string;
}

export interface IPizza extends IPizzaForm {
  id: string;
}

export interface IPizzaAPI {
  [key: string]: IPizza;
}

export interface ICartDish {
  pizza: IPizza;
  amount: number;
}

export interface IOrder {
  [id: string]: number;
}

export interface IOrderAPI {
  [key: string]: IOrder;
}

export interface IOrderItem {
  title: string;
  price: number;
  amount: number;
  totalPrice: number;
}

export interface IFormattedOrder {
  id: string;
  orders: IOrderItem[];
  delivery: number;
  total: number;
}