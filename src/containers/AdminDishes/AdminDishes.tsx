import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectPizzas } from '../../store/slices/pizzasSlice.ts';
import { useCallback, useEffect } from 'react';
import { deletePizza, fetchPizzas } from '../../store/thunks/pizzasThunk.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Pizzas from '../../components/Pizzas/Pizzas.tsx';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDishes = () => {
  const isFetching = useAppSelector(selectFetchLoading);
  const pizzas = useAppSelector(selectPizzas);
  const dispatch = useAppDispatch();

  const fetchDishes = useCallback(async () => {
    await dispatch(fetchPizzas());
  }, [dispatch]);

  useEffect(() => {
    void fetchDishes();
  }, [fetchDishes]);

  const removePizza = useCallback(async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await dispatch(deletePizza(id));
      await fetchDishes();
      toast.success('Pizza deleted successfully');
    }
  }, [dispatch, fetchDishes]);

  return (
    <>
      {isFetching ? <Loader/> :
        <>
          <div className="mb-2">
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2>Dishes</h2>
              <NavLink to="/admin/add"
                       className="btn btn-dark text-decoration-none text-white rounded-3 d-inline-flex gap-2 align-items-center">
                Add pizza
                <i className="bi bi-plus-lg"></i>
              </NavLink>
            </div>
            {pizzas.length > 0 ?
              <Pizzas pizzas={pizzas} deletePizza={removePizza}/>
              : <h5 className="my-5 text-center">No dishes found</h5>
            }
          </div>
        </>
      }
    </>
  );
};

export default AdminDishes;