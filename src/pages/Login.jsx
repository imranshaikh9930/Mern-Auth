import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UsersContext } from "../Context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { currentUser, setCurrentUser } = useContext(UsersContext);

  // console.log(currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
        alert("Please enter your username and password.");
        return;
    }

    try {
        const resp = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include",
        });

        if (resp.status === 401) {
            alert("Username or password incorrect.");
            return;
        }

        if (resp.status === 200) {
            const data = await resp.json();
            setCurrentUser(data);
            navigate("/");
            alert("Login successful.");
        } else if (resp.status === 204) {
            alert("User does not exist.");
        } else {
            alert("An unexpected error occurred.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Failed to log in. Please try again later.");
    }
};


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          //   disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
          {/* {loading ? 'Loading...' : 'Sign Up'} */}
        </button>

        {/* <OAuth /> */}
        <div className="flex gap-2 mt-5">
          <p>Don't Have an account?</p>
          <NavLink to="/signup">Sign up</NavLink>
        </div>
      </form>
      {/* <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p> */}
    </div>
  );
};

export default Login;
