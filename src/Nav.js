import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path })=> {
  return (
    <ul className='row'>
    <div className='col'>
        {
          path === '/' ? (
            <button className='navbutton'><p>Home</p></button>            
          ) : (
            <button className='navbutton'><Link to='/'>Home</Link></button>
          )
        }        
      </div>
      <div className='col'>
        {
          path === '/campuses' ? (
            <button className='navbutton'><p>All Campuses</p></button>            
          ) : (
            <button className='navbutton'><Link to='/campuses'>All Campuses</Link></button>
          )
        }
      </div>
      <div className='col'>
        {
          path === '/students' ? (
            <button className='navbutton'><p>All Students</p></button>            
          ) : (
            <button className='navbutton'><Link to='/students'>All Students</Link></button>
          )
        }
      </div>
    </ul>
  );
};

export default Nav;