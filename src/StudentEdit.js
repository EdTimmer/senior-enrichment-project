import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, saveStudent } from './store';
import { Link } from 'react-router-dom';
// import StudentSelectCampus from './StudentSelectCampus';

class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      GPA: this.props.student ? this.props.student.GPA : 0,
      email: this.props.student ? this.props.student.email : '',
      campusId: -1
    };
    this.onSave = this.onSave.bind(this);
    this.onChangeEntry = this.onChangeEntry.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectCampus = this.onSelectCampus.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps is:', nextProps);
    if(nextProps.student) {
      this.setState({
        firstName: nextProps.student.firstName,
        lastName: nextProps.student.lastName,
        GPA: nextProps.student.GPA,
        email: nextProps.student.email,
        campusId: nextProps.student.campusId
      })
    }
  }

  onSave(ev) {
    ev.preventDefault();
    const student = { id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email };
    this.props.saveStudent(student);
  }
  onChangeEntry(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onDelete() {
    this.props.deleteStudent({ id: this.props.id });
  }
  onSelectCampus(ev) {
    ev.preventDefault();
    const campus = this.props.campuses.find( campus => campus.id === this.state.id*1 );
    const student = {id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email, campusId: this.state.campusId}
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value * 1});
  }
  render() {
    const { student, campuses, id } = this.props;  // added id
    const { firstName, lastName, campusId, GPA, email } = this.state;   //removed id
    const { onChangeEntry, onSave, onDelete, onSelectCampus, onChange } = this;
    if (!student) {
      return null;
    }
    let campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId); 
    if (!campusOfThisStudent) {
      campusOfThisStudent = {};
      campusOfThisStudent.name = 'none of the campuses';
    } 
    const availableCampuses = campuses.filter(campus => campus.id !== student.campusId);
    
    return (
      <div>      
        <p>Update Information for {student.fullName}:</p>
        <form onSubmit={ onSave }>
          <p>First Name: <input value={ firstName } name='firstName' onChange={ onChangeEntry }/></p>
          <p>Last Name: <input value={ lastName } name='lastName' onChange={ onChangeEntry }/></p>
          <p>GPA: <input value={ GPA } name='GPA' onChange={ onChangeEntry }/></p>
          <p>Email: <input value={ email } name='email' onChange={ onChangeEntry }/></p>
          <button disabled={ firstName.length === 0 && lastName.length === 0 && email.length === 0 }>Update Student</button>     
        </form>

         

        <p>{student.fullName} is currently enrolled in: {campusOfThisStudent.name}</p>

        <form onSubmit={ this.onSelectCampus }>
          <select value={ campusId } name='campusId' onChange={ onChange }>
          <option value='-1'>Select Campus</option>     
          {
            availableCampuses.map( campus => {
              return (
                <option key={ campus.id } value={ campus.id }>
                  { campus.name }
                </option>
              );
            })
          }
          </select>
          <button disabled={ campusId*1 === -1}>
          Assign
          </button>
        </form>          
        {/* 
          TESTING:
        <StudentSelectCampus id={id}/>
        */}
        <button onClick={ onDelete }>Delete Student</button> 
      </div>
    )
  }
};

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  // console.log('student in mapStateToProps is:', student);
  return {
    student,
    campuses
  };
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history)),
    deleteStudent: (student)=> dispatch(deleteStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);