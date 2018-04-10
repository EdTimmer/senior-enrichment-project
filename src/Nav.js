import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path })=> {
  return (
    <ul className='row'>
    <div className='col'>
        {
          path === '/' ? (
            <span>Home</span>            
          ) : (
            <Link to='/'>Home</Link>
          )
        }
        
      </div>
      <div className='col'>
        {
          path === '/campuses' ? (
            <span>All Campuses</span>            
          ) : (
            <Link to='/campuses'>All Campuses</Link>
          )
        }
      </div>
      <div className='col'>
        {
          path === '/students' ? (
            <span>All Students</span>            
          ) : (
            <Link to='/students'>All Students</Link>
          )
        }
      </div>
    </ul>
  );
};

export default Nav;