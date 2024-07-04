import axios from "axios";
import React,{useState} from "react";
import { NavLink ,useNavigate} from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
    const [formData,setFormData] = useState({});

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

      //  const resp =  await axios.post("http://localhost:5000/register",formData,{
      //       headers:{"content-type": "application/json"}});

      //   const data = await resp.data;

      

        const resp = await fetch("http://localhost:5000/register",{
              method:"POST",
              headers:{"content-type":"application/json"},
              body:JSON.stringify(formData)            
        })

        const data =await resp.json();

        
        console.log(data);
        navigate("/login")
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    <input
        type='text'
        placeholder='Name'
        id='name'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
       <input
        type='email'
        placeholder='Email'
        id='email'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Username'
        id='username'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
     
      <input
        type='password'
        placeholder='Password'
        id='password'
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
      />
      <button
      //   disabled={loading}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
          Sign Up
        {/* {loading ? 'Loading...' : 'Sign Up'} */}
      </button>
      {/* <OAuth /> */}
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <NavLink to="/login">Sign In</NavLink>
    </div> 
    </form>
    {/* <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p> */}
  </div>
  )
}

export default Signup;