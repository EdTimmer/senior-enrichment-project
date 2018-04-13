import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({students, campuses})=> {
  if (students.length > 0) {
    return (
      <div>
        <h3>All Students</h3>
        <div className='row'>
          <div className='col'>
            <p><i>Number of students:</i> <strong>{students.length}</strong></p> 
          </div>             
          <div className='col'>            
            <Link to={'/students/create'}><button>Add</button></Link>              
        </div>
      </div>
        <ul className='list-group'>
          {
            students.map(student => {
              const campus = campuses.find(campus=> campus.id === student.campusId);
              const campusName = campus ? <Link to={`/campuses/detail/${campus.id}`}>{campus.name}
          </Link> : 'none'
    
              return (
                <div key={student.id}>
                  <li className='row'>
                    <div className='col text-right'>
                      <img src={student.image} width={100} />
                    </div>
                    <div className='col'>
                      <Link to={`/students/detail/${student.id}`}>{student.fullName}</Link>                  
                      <p><i>Enrolled in:</i> {campusName}</p>
                    </div>        
                    <div className='col'>
                    </div>                                           
                  </li>                    
                </div>
           
              )
            })          
          }
        </ul>            
      </div>
    ) 
  }
  else {
    return (
      <div>
        <h4><i>There are no students.  Please add a student.</i></h4>
        <Link to={'/students/create'}>Add Student</Link>
      </div>
    )
  } 
}

const mapStateToProps = ({ students, campuses })=> {
  return {
    students,
    campuses
  }
};

export default connect(mapStateToProps)(Students);