import { IPizza } from '../../types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import ButtonSpinner from '../UI/ButtonSpinner/ButtonSpinner.tsx';

interface Props {
  formAction: (pizza: IPizza) => void;
  existingPizza?: IPizza;
  isEditing?: boolean;
  isLoading?: boolean;
}

const initialState = {
  id: '',
  title: '',
  image: '',
  price: 0,
};

const Form: React.FC<Props> = ({
  formAction,
  existingPizza = initialState,
  isEditing = false,
  isLoading = false
}) => {

  const [form, setForm] = useState(existingPizza);

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevState) => {
      const {name, value} = e.target;

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.trim().length === 0 || form.price === 0 || form.image.trim().length === 0) {
      toast.warning('Fill out all fields!');
    } else {
      formAction({...form});
      if (!isEditing) {
        setForm({...initialState});
      }
    }
  };
  return (
    <>
      <h3 className="mb-4 text-center">
        {isEditing ? 'Edit pizza' : 'Add new pizza'}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={onChange}
            min={1}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image"
            name="image"
            value={form.image}
            onChange={onChange}
            required
          />
        </div>
        <div className="w-50 d-flex flex-column">
          <p className="mb-2">Image preview</p>
          <img
            className="w-25 rounded-3 mb-4"
            src={form.image}
            alt={form.title}
          />
        </div>
        <div className="d-flex gap-3">
          <NavLink to="/admin/pizzas" className="btn btn-outline-dark"> <i className="bi bi-arrow-left"></i> Back
          </NavLink>
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-dark d-flex align-items-center"
          >
          <span className="me-2">
            {isEditing ? 'Edit' : 'Add'}
          </span>
            {isLoading ? <ButtonSpinner/> : null}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;