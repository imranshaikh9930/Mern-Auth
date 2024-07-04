import React, { useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { UsersContext } from '../Context/userContext';

const Navbar = () => {
   
  

  

  return (
    <nav className='font-Inter flex justify-between items-center bg-slate-300 w-full p-4'>
      <div className='font-medium'>Authentication</div>
      <div className='font-normal'>
        <ul className='flex items-center gap-4 mx-4'>
          <NavLink to="/" className="cursor-pointer"><li>Home</li></NavLink>
          <NavLink to="/about" className="cursor-pointer"><li>About</li></NavLink>
          <NavLink to="/profile" className="cursor-pointer"><li>Profile</li></NavLink>
         
        </ul>
      </div>
      {/* Uncomment this if you need the menu icon for smaller screens */}
      {/* <div className=''>
        <span className="w-8 h-1.5 my-1 bg-black block"></span>
        <span className="w-8 h-1.5 my-1 bg-black block"></span>
        <span className="w-8 h-1.5 my-1 bg-black block"></span>
      </div> */}
    </nav>
  );
};

export default Navbar;
