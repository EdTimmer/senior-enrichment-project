import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveStudent } from './store';

const Students = ({ students, addStudent })=> {
  return (
    <div>
      <h2>All Students</h2>
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

const mapDispatchToProps = (dispatch)=> {
  return {
    addStudent: ()=> {
      return dispatch(saveStudent(student, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);