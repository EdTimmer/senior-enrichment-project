import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, saveCampus, saveStudent } from './store';
// import { timingSafeEqual } from 'crypto';
import CampusSelectStudent from './CampusSelectStudent';

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : '',
      // student: {id: null, name: '', campusId: null}
    }
    this.onSave = this.onSave.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    const campus = { id: this.props.id, name: this.state.name};
    this.props.saveCampus(campus);
  }
  onChangeName(ev) {
    this.setState({ name: ev.target.value })
  }
  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }
  onSelectStudent(ev) {
    ev.preventDefault();
    const student = this.props.students.find( student => student.id === this.state.student.id*1 );
    // const student = {id: this.props.id, name: this.state.name, campusId: this.state.campusId}
    console.log('student is:', student);
    // this.state.student.campusId = this.props.id;
    
    // student.campusId = this.state.campusId
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ student: { id: student.id, name: student.name, campusId: this.props.id}});
  }
  render() {
    const { campus, students, id } = this.props;
    const { name } = this.state;
    const { onChangeName, onSave, onDelete, onSelectStudent, onChange } = this;
    if(!campus) {
      return null;
    }
    const studentsOfThisCampus = students.filter( student => student.campusId === id)
    return (
      <div>
        <h2>Campus</h2>
        <h3>{ campus.name }</h3>
        <p><i>Number of students in {campus.name}:</i> <strong>{studentsOfThisCampus.length}</strong></p>
        
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={ name.length === 0 }>Update</button>     
        </form>
        <button onClick={ onDelete }>Delete</button>  

        {/* <form onSubmit={ this.onSelectStudent }>
          <select value={ id } onChange={ onChange }>
            <option value='-1'>Select Student</option>     
            {
              students.map( student => {
                return (
                  <option key={ student.id } value={ student.id }>
                    { student.name }
                  </option>
                );
              })
            }
          </select>
          <button disabled={ id*1 === -1}>
          Assign
          </button>
          </form> */}
          <CampusSelectStudent id={id}/>
        <p><i>Our Students:</i></p>
        <ul>          
            {
              studentsOfThisCampus.map(student => {
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
}

const mapStateToProps = ({ campuses, students }, { id })=> {
  // console.log('id is:', id);
  const campus = campuses.find( campus => campus.id === id );
  // const studentsOfThisCampus = students.filter( student => student.campusId === id)
  // console.log('studentsOfThisCampus is:', studentsOfThisCampus);
  return {
    campus,
    students
  }
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history)),
    deleteCampus: (campus)=> dispatch(deleteCampus(campus, history)),
    saveStudent: (student)=> dispatch(saveStudent(student, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Campus);