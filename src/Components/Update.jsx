import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/users/' + id)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', description: '', price: '' };

    if (!values.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!values.description) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    if (!values.price) {
      newErrors.price = 'Price is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      axios.put('http://localhost:3000/users/' + id, values)
        .then(res => {
          console.log(res);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update Service</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Enter Name'
              value={values.name}
              onChange={e => setValues({ ...values, name: e.target.value })}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>
          <div className='mb-2'>
            <label htmlFor='description'>Description: </label>
            <input
              type='text'
              name='description'
              className='form-control'
              placeholder='Enter Description'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>
          <div className='mb-3'>
            <label htmlFor='price'>Price: </label>
            <input
              type='number'
              name='price'
              className='form-control'
              placeholder='Enter Price'
              value={values.price}
              onChange={e => setValues({ ...values, price: e.target.value })}
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
