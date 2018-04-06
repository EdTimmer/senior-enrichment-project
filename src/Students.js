import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({students})=> {
  return (
    <div>
      <h2>All Students</h2>
      <p>Number of Students: {students.length}</p>
      <Link to={'/students/create'}>Add Student</Link>
      <ul>
        {
          students.map(student => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.name}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )  
}

const mapStateToProps = ({ students })=> {
  return {
    students
  }
};

export default connect(mapStateToProps)(Students);