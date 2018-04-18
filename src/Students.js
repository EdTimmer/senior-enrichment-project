import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({students, campuses})=> {
  if (students.length > 0) {
    return (
      <div>
        <h1>All Students</h1>
        <div>
          <div>
            <p><i>Number of students:</i> <strong>{students.length}</strong><Link to={'/students/create'}><button><p>Add</p></button></Link> </p> 
          </div>             
        </div>
        <span className='container-1'>
          {
            students.map(student => {
              const campus = campuses.find(campus=> campus.id === student.campusId);
              const campusName = campus ? <Link to={`/campuses/detail/${campus.id}`}>{campus.name}
          </Link> : 'none'
    
              return (
                <div key={student.id} className='studentBox center'>

                      <img src={student.image} className='studentImageSmall'/>               
                    
                      <p><Link to={`/students/detail/${student.id}`}>{student.fullName}</Link><br/>                 
                      <i>Enrolled in:<br/></i>{campusName}</p>
                    
                </div>               
              )
            })          
          }
        </span>            
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