import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectPizzas } from '../../store/slices/pizzasSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchPizzas } from '../../store/thunks/pizzasThunk.ts';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Pizzas from '../../components/Pizzas/Pizzas.tsx';
import Cart from '../../components/Cart/Cart.tsx';
import { IPizza } from '../../types';

const Client = () => {
  const isFetching: boolean = useAppSelector(selectFetchLoading);
  const pizzas: IPizza[] = useAppSelector(selectPizzas);
  const dispatch = useAppDispatch();

  const fetchDishes: () => Promise<void> = useCallback(async () => {
    await dispatch(fetchPizzas());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/') {
      void fetchDishes();
    }
  }, [fetchDishes]);

  return (
    <>
      {isFetching ? <Loader/> :
        <div className="d-flex justify-content-between align-items-start mb-5">
          <div className="mb-2">
            {pizzas.length > 0 ?
              <Pizzas pizzas={pizzas}/>
              : <h5 className="my-5 text-center">No dishes found</h5>
            }
          </div>
          <div>
            <Cart/>
          </div>
        </div>
      }
    </>
  );
};

export default Client;