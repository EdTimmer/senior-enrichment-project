import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({ student, students, campuses, id })=>{
  if (!student) {
    return null;
  }

  const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);

  const nextStudentIndex = students.indexOf(student) + 1;
  const nextStudentId = nextStudentIndex < students.length ? students[nextStudentIndex].id : students[0].id;
  const priorStudentIndex = students.indexOf(student) -1;
  const lastStudentIndex = students.length - 1;
  const priorStudentId = priorStudentIndex !== -1 ? students[priorStudentIndex].id : students[lastStudentIndex].id;
  return (
    <div className='container'>
    <h1>{ student.fullName }</h1>
    <div className='row'>
      <div className='col'>
        <img src={student.image} width={400}/>
      </div>
      <div className='col'>
        <Link to={`/students/detail/${priorStudentId}`}><button className='nextButton'><p>Prior</p></button></Link>
        <Link to={`/students/detail/${nextStudentId}`}><button className='nextButton'><p>Next</p></button></Link>
        <h5><b>GPA:  { student.GPA }</b></h5>
        <h5><b>Email:  { student.email }</b></h5>       
        {!!campusOfThisStudent ? (
          <p><i>{student.fullName} is enrolled in <Link to={`/campuses/detail/${campusOfThisStudent.id}`}>{campusOfThisStudent.name}</Link></i></p>
        ) : (<p><i>{student.fullName} is not yet enrolled in any campus</i></p>)}

        
      <Link to={`/students/edit/${student.id}`}><button><p>Edit</p></button></Link>

        
      </div>
    </div>
  </div>
  )
}
  
const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  // const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);
  return {
    student,
    students,
    campuses
    // campusOfThisStudent
  };
};

export default connect(mapStateToProps)(Student);