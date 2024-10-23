import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };
    console.log(addUser);

    const res = await fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser)
    });

    const result = await res.json();

    if (!res.ok) {
      console.log(result.error); // Use result.error
      setErr(result.error || "An error occurred"); // Improved error handling
    } else {
      console.log(result);
      setName("");
      setEmail("");
      setAge(0);
      setErr("");
      navigate("/read");
    }
  };

  return (
    <div className='container my-3'>
      <h1 className='h1 text-center'>Fill the data</h1>
      {err && <div className='alert alert-danger'>{err}</div>} {/* Fixed class name */}
      <form className='form' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Age</label>
          <input
            type='number'
            className='form-control'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost;
