import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Student extends Component {
  constructor() {
    super();
  }
  render() {
    const { student, campuses, id } = this.props;
 
    if (!student) {
      return null;
    }

    const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);    
    const nameOfCampus = !!campusOfThisStudent ? `${student.fullName} is enrolled in ${campusOfThisStudent.name}` : `${student.fullName} is not yet enrolled in any campus`;    

    return (
      <div>
        <h2>{ student.fullName }</h2>
        <h5>GPA:  { student.GPA }</h5>
        <h5>Email:  { student.email }</h5>
        <p><i>{nameOfCampus}</i></p>
    
        <Link to={`/students/edit/${student.id}`}>Edit</Link>
      </div>
  
  
    )
  }
}

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  console.log('students are:', students);
  return {
    student,
    campuses
  };
};

export default connect(mapStateToProps)(Student);