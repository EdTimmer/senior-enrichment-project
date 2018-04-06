import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({campuses})=> {
  return (
    <div>
      <h2>All Campuses</h2>
      <Link to={'/campuses/create'}>Create Campus</Link>
      <ul>
        {
          campuses.map(campus => {
            return (
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )  
}

const mapStateToProps = ({ campuses })=> {
  return {
    campuses
  }
};

export default connect(mapStateToProps)(Campuses);