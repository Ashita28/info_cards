import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch("http://localhost:5000/api/user");
        const result = await response.json();

        if (!response.ok) {
            setErr(result.err);
        } else {
            setData(result);
            setErr('');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "DELETE",
        });

        const result1 = await response.json();

        if (!response.ok) {
            setErr(result1.err);
        } else {
            setErr("Deleted Successfully");
            setTimeout(() => {
                setErr("");
                getData();
            }, 1000);
        }
    };

    return (
        <div className='container my-2'>
            {err && <div className='alert alert-danger'>{err}</div>}
            <div className='row'>
                {data.map((ele) => (
                    <div key={ele._id} className='col-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>{ele.name}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>{ele.email}</h6>
                                <p className='card-text'>{ele.age}</p>
                                <span 
                                    className='card-link' 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => navigate(`/${ele._id}`)} // Use the correct path here
                                >
                                    Edit
                                </span>
                                <span 
                                    className='card-link' 
                                    style={{ cursor: 'pointer' }} 
                                    onClick={() => handleDelete(ele._id)}
                                >
                                    Delete
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Read;
