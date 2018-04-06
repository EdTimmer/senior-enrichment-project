import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path })=> {
  return (
    <ul>
      <li>
        {
          path === '/' ? (
            <span>Home</span>            
          ) : (
            <Link to='/'>Home</Link>
          )
        }
      </li>
      <li>
        {
          path === '/campuses' ? (
            <span>All Campuses</span>            
          ) : (
            <Link to='/campuses'>All Campuses</Link>
          )
        }
      </li>
      <li>
        {
          path === '/students' ? (
            <span>All Students</span>            
          ) : (
            <Link to='/students'>All Students</Link>
          )
        }
      </li>
    </ul>
  );
};

export default Nav;