import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({students, campuses})=> {
  if (students.length > 0) {
    return (
      <div>
        <h2>All Students</h2>
        <div className='row'>
        <div className='col'>
          <p><i>Number of all students:</i> <strong>{students.length}</strong></p> 
        </div>             
        <div className='col'>
          <button>
            <Link to={'/students/create'}>Add Student</Link>
          </button>  
        </div>
      </div>      


        <ul className='list-group'>
          {
            students.map(student => {
              const campus = campuses.find(campus=> campus.id === student.campusId);
              // console.log('campus is:', campus)
              const campusName = campus ? <Link to={`/campuses/detail/${campus.id}`}>{campus.name}
          </Link> : 'none'
    
              return (
                <div>
                  <li key={student.id} className='list-group-item list-group-item-success' className='row'>
                    <div className='col'>
                      <img src={student.image} width={100} />
                    </div>
                    <div className='col'>
                      <Link to={`/students/detail/${student.id}`}>{student.fullName}</Link>                  
                      <p><i>Enrolled in:</i> {campusName}</p>
                    </div>                                
                  </li>  
                  <br />
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