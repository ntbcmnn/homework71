import { IPizza } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectEditLoading, selectFetchLoading, selectOnePizza } from '../../store/slices/pizzasSlice.ts';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { editPizza, fetchPizzas, getPizzaById } from '../../store/thunks/pizzasThunk.ts';
import { toast } from 'react-toastify';
import Loader from '../../components/UI/Loader/Loader.tsx';
import Form from '../../components/Form/Form.tsx';

const Edit = () => {
  const pizza: IPizza | null = useAppSelector(selectOnePizza);
  const fetchLoading: boolean = useAppSelector(selectFetchLoading);
  const editLoading: boolean = useAppSelector(selectEditLoading);
  const navigate: NavigateFunction = useNavigate();
  const params = useParams<{ pizzaId: string }>();
  const dispatch = useAppDispatch();

  const getContact: () => Promise<void> = useCallback(async () => {
    if (params.pizzaId) dispatch(getPizzaById(params.pizzaId));
  }, [dispatch, params.pizzaId]);

  useEffect(() => {
    void getContact();
  }, [getContact]);

  const edit: (pizza: IPizza) => Promise<void> = async (pizza: IPizza) => {
    if (params.pizzaId) await dispatch(editPizza({id: params.pizzaId, pizza}));
    navigate('/admin');
    await dispatch(fetchPizzas());
    toast.success('Pizza edited successfully!');
  };

  return (
    <>
      {fetchLoading ? <Loader/> :
        <>
          {pizza ?
            <Form formAction={edit} existingPizza={pizza} isEditing isLoading={editLoading}/> : navigate('/')}
        </>
      }
    </>
  );
};

export default Edit;