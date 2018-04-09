import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path })=> {
  return (
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        {
          path === '/' ? (
            <span className='nav-link active'>Home</span>            
          ) : (
            <Link to='/' className='nav-link'>Home</Link>
          )
        }
      </li>
      <li className='nav-item'>
        {
          path === '/campuses' ? (
            <span className='nav-link active'>All Campuses</span>            
          ) : (
            <Link to='/campuses' className='nav-link'>All Campuses</Link>
          )
        }
      </li>
      <li className='nav-item'>
        {
          path === '/students' ? (
            <span className='nav-link active'>All Students</span>            
          ) : (
            <Link to='/students' className='nav-link'>All Students</Link>
          )
        }
      </li>
    </ul>
  );
};

export default Nav;