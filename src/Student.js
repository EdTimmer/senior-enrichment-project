import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Student = ({ student, students, campuses, id, campusOfThisStudent })=>{
  if (!student) {
    return null;
  }
  return (
    <div className='container'>
    <h1>{ student.fullName }</h1>
    <div className='row'>
      <div className='col'>
        <img src={student.image} width={400}/>
      </div>
      <div className='col'>
        <Link to={!!students[student.id-2] ? (`/students/detail/${student.id - 1}`):(`/students/detail/${students[students.length -1].id}`)}><button className='nextButton'><p>Prior</p></button></Link>
        <Link to={!!students[student.id] ? (`/students/detail/${student.id + 1}`):(`/students/detail/1`)}><button className='nextButton'><p>Next</p></button></Link>   
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
  const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);
  return {
    student,
    students,
    campuses,
    campusOfThisStudent
  };
};

export default connect(mapStateToProps)(Student);