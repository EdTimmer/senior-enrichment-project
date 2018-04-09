import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({campuses})=> {
  if (campuses.length > 0) {
    return (
      <div>
        <h2>All Campuses</h2>
        <p><i>Number of Campuses:</i> <strong>{campuses.length}</strong></p>        
        <ul>
          {
            campuses.map(campus => {
              return (
                <li key={campus.id}>
                  <Link to={`/campuses/detail/${campus.id}`}>{campus.name}</Link>
                </li>
              )
            })
          }
        </ul>
        <Link to={'/campuses/create'}>Add Campus</Link>
      </div>
    )  
  }
  else {
    return (
      <div>
        <h4><i>There are no campuses at present.  Please add a campus.</i></h4>
        <Link to={'/campuses/create'}>Add Campus</Link>
      </div>
    )
  }

}

const mapStateToProps = ({ campuses })=> {
  return {
    campuses
  }
};

export default connect(mapStateToProps)(Campuses);