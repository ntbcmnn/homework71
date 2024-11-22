import { IPizza } from '../../types';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { addPizza } from '../../store/slices/cartSlice.ts';
import { useAppDispatch } from '../../app/hooks.ts';

interface Props {
  pizza: IPizza;
  onDeletePizza?: React.MouseEventHandler;
}

const PizzaCard: React.FC<Props> = ({pizza, onDeletePizza}) => {
  const {pathname} = useLocation();
  const dispatch = useAppDispatch();

  const adminActions = () => {
    if (pathname.startsWith('/admin')) {
      return <div className="d-flex gap-2 mt-3">
        <button onClick={onDeletePizza} className="btn btn-dark rounded-3 fs-5">
          <i className="bi bi-trash"></i>
        </button>
        <NavLink
          to={`/admin/${pizza.id}/edit`}
          className="btn btn-dark rounded-3 fs-5"
        >
          <i className="bi bi-pen"></i>
        </NavLink>
      </div>;
    } else return null;
  };

  const clientActions: () => void = () => {
    if (!pathname.startsWith('/admin')) {
      dispatch(addPizza(pizza));
    }
  };

  return (
    <>
      <div className="card p-3" onClick={clientActions} role={!pathname.startsWith('/admin') ? 'button' : ''}>
        <div className="text-center">
          <img src={pizza.image} alt={pizza.title} className="rounded-3 custom-img"/>
        </div>
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title fw-bold my-3">{pizza.title}</h5>
          <p className="card-text m-0 p-0">{pizza.price} KGS</p>
          <div className="d-flex justify-content-between align-items-center">
            {adminActions()}
          </div>
        </div>
      </div>
    </>
  );
};

export default PizzaCard;