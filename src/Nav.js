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
            <Link to='/'><button className='navbutton'>Return Home</button></Link>
          )
        }        
      </div>
      <div className='col'>
        {
          path === '/campuses' ? (
            <button className='navbutton'><p>All Campuses</p></button>            
          ) : (
            <Link to='/campuses'><button className='navbutton'>View All Campuses</button></Link>
          )
        }
      </div>
      <div className='col'>
        {
          path === '/students' ? (
            <button className='navbutton'><p>All Students</p></button>            
          ) : (
            <Link to='/students'><button className='navbutton'>View All Students</button></Link>
          )
        }
      </div>
    </ul>
  );
};

export default Nav;