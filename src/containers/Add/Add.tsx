import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCreateLoading } from '../../store/slices/pizzasSlice.ts';
import Form from '../../components/Form/Form.tsx';
import { toast } from 'react-toastify';
import { addPizza, fetchPizzas } from '../../store/thunks/pizzasThunk.ts';
import { IPizzaForm } from '../../types';

const Add = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const createPizzaLoading: boolean = useAppSelector(selectCreateLoading);

  const addNewPizza: (pizza: IPizzaForm) => Promise<void> = async (pizza: IPizzaForm) => {
    await dispatch(addPizza({...pizza}));
    navigate('/admin');
    await dispatch(fetchPizzas());
    toast.success('Pizza added successfully!');
  };

  return (
    <>
      <Form formAction={addNewPizza} isLoading={createPizzaLoading}/>
    </>
  );
};

export default Add;