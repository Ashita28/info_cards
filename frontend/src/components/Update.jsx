import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [err, setErr] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    const getSingleData = async () => {
        const response = await fetch(`http://localhost:5000/api/user/${id}`);
        const result = await response.json();

        if (!response.ok) {
            setErr(result.error || "An error occurred"); // Use result.error
        } else {
            setName(result.name);
            setEmail(result.email);
            setAge(result.age);
            setErr("");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };
        console.log(updatedUser);

        const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser),
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result.error);
            setErr(result.error || "An error occurred"); // Use result.error
        } else {
            console.log("Updated result...", result);
            setErr("");
            navigate("/read");
        }
    };

    useEffect(() => {
        getSingleData();
    }, []);

    return (
        <div className='container my-2'>
            <h1 className='h1 text-center'>Edit Data</h1>
            {err && <div className='alert alert-danger'>{err}</div>}
            <form className='form' onSubmit={handleUpdate}>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Email</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Age</label>
                    <input
                        type='number'
                        className='form-control'
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-info'>Update</button>
            </form>
        </div>
    );
}

export default Update;
