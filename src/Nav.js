import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path })=> {
  return (
    <ul className='row'>
    <div className='col'>
        {
          path === '/' ? (
            <p>Home</p>            
          ) : (
            <Link to='/'>Home</Link>
          )
        }
        
      </div>
      <div className='col'>
        {
          path === '/campuses' ? (
            <p>All Campuses</p>            
          ) : (
            <Link to='/campuses'>All Campuses</Link>
          )
        }
      </div>
      <div className='col'>
        {
          path === '/students' ? (
            <p>All Students</p>            
          ) : (
            <Link to='/students'>All Students</Link>
          )
        }
      </div>
    </ul>
  );
};

export default Nav;