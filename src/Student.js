import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({ student, campuses, id, campusOfThisStudent })=>{
  if (!student) {
    return null;
  }
  return (
    <div className='container'>
    <h3>{ student.fullName }</h3>
    <div className='row'>
      <div className='col'>
        <img src={student.image} width={400}/>
      </div>
      <div className='col'>
        <h5><b>GPA:  { student.GPA }</b></h5>
        <h5><b>Email:  { student.email }</b></h5>       
        {!!campusOfThisStudent ? (
          <p><i>{student.fullName} is enrolled in <Link to={`/campuses/detail/${campusOfThisStudent.id}`}>{campusOfThisStudent.name}</Link></i></p>
        ) : (<p><i>{student.fullName} is not yet enrolled in any campus</i></p>)}

        <button>
          <Link to={`/students/edit/${student.id}`}>Edit</Link>
        </button>
      </div>
    </div>
  </div>
  )
}
  
const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);
  return {
    student,
    campuses,
    campusOfThisStudent
  };
};

export default connect(mapStateToProps)(Student);