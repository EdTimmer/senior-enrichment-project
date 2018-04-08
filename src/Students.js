import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({students, campuses})=> {
  return (
    <div>
      <h2>All Students</h2>
      <p><i>Number of all students:</i> <strong>{students.length}</strong></p>
      <Link to={'/students/create'}>Add Student</Link>
      <ul>
        {
          students.map(student => {
            const campus = campuses.find(campus=> campus.id === student.campusId);
            console.log('campus is:', campus)
            const campusName = campus ? <Link to={`/campuses/${campus.id}`}>{campus.name}
        </Link> : 'none'
  
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.name}</Link>
                <br />
                Enrolled in:
                {campusName}
                <br />               
              </li>  
         
            )
          })          
        }
      </ul>
    </div>
  )  
}

const mapStateToProps = ({ students, campuses })=> {
  return {
    students,
    campuses
  }
};

export default connect(mapStateToProps)(Students);