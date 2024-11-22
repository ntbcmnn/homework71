import { IPizza } from '../../types';
import PizzaCard from '../PizzaCard/PizzaCard.tsx';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  pizzas: IPizza[];
  deletePizza?: (id: string) => void;
}

const Pizzas: React.FC<Props> = ({pizzas, deletePizza}) => {
  const {pathname} = useLocation();

  return (
    <div
      className={!pathname.startsWith('/admin')
        ? 'd-flex flex-column gap-4 flex-wrap'
        : 'd-flex gap-4 flex-wrap justify-content-center'
      }
    >
      {pizzas.map((pizza: IPizza) => (
        <PizzaCard
          key={pizza.id}
          pizza={pizza}
          onDeletePizza={deletePizza ? () => deletePizza(pizza.id) : undefined}
        />
      ))}
    </div>
  );
};

export default Pizzas;