import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Create = () => {
    const [ values , setValues ]  = useState({
        name: '',
        description: '',
        price: '',
    })
    const navigate = useNavigate() ;
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:3000/users',values)
        .then(res =>{
            console.log(res)
            navigate('/');
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light' >
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h1>Add a user</h1>
            <form onSubmit={handleSubmit} >
                <div className='mb-2'>
                    <label htmlFor='name'>Name: </label>
                    <input  type='text' name='name' className='form-control' placeholder='Enter Name'
                    onChange={e => setValues({...values , name:  e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='description'>Description: </label>
                    <input  type='text' name='description' className='form-control' placeholder='Enter Description'
                    onChange={e => setValues({...values , description:  e.target.value})} 
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='phone'>Price: </label>
                    <input  type='number' name='Price' className='form-control' placeholder='Enter Price'
                    onChange={e => setValues({...values , price:  e.target.value})} 
                    />
                </div>
                <button className='btn btn-success'>Submit</button>
                <Link to = "/" className = "btn btn-primary ms-3" >Back</Link>
            </form>
        </div>
    </div>
  )
}

export default Create
