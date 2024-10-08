import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Home() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    const handleDelete = (id) => {
        const confirm = window.confirm("Would you like to Delete ?");
        if (confirm) {
            axios.delete('http://localhost:3000/users/' + id)
                .then(res => {
                    // location.reload();
                    navigate(0);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className='d-flex flex-column justify-content-start align-items-center bg-light' style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <h1>List of Services...</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end mb-3'>
                    <Link to='/create' className='btn btn-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.description}</td>
                                <td>{d.price}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Link to={`/read/${d.id}`} className="btn btn-sm btn-info me-2">Read</Link>
                                        <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                                        <button onClick={() => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Home;
