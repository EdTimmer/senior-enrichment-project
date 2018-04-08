import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, saveStudent } from './store';

class Student extends Component {
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
    const student = {id: this.props.id, firstName: this.state.firstName, lastName: this.state.firstName, GPA: this.state.GPA, email: this.state.email, campusId: this.state.campusId}
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ campusId: ev.target.value * 1});
  }
  render() {
    const { student, campuses } = this.props;
    const { firstName, lastName, id, campusId, GPA, email } = this.state;
    const { onChangeEntry, onSave, onDelete, onSelectCampus, onChange } = this;
    if (!student) {
      return null;
    }
    const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);    
    const nameOfCampus = !!campusOfThisStudent ? `${student.name} is enrolled in ${campusOfThisStudent.name}` : `${student.name} is not yet enrolled in any campus`;    
    const availableCampuses = campuses.filter(campus => campus.id !== student.campusId);

    return (
      <div>
        <h2>Student</h2>
        <h3>{ student.name }</h3>
        <h5>GPA:  { student.GPA }</h5>
        <h5>Email:  { student.email }</h5>
        <p><i>{nameOfCampus}</i></p>
        <p>Update Information for {student.name}:</p>
        <form onSubmit={ onSave }>
          <p>First Name: <input value={ firstName } name='firstName' onChange={ onChangeEntry }/></p>
          <p>Last Name: <input value={ lastName } name='lastName' onChange={ onChangeEntry }/></p>
          <p>GPA: <input value={ GPA } name='GPA' onChange={ onChangeEntry }/></p>
          <p>Email: <input value={ email } name='email' onChange={ onChangeEntry }/></p>
          <button disabled={ firstName.length === 0 && lastName.length === 0 && email.length === 0 }>Update Student</button>     
        </form>

        <button onClick={ onDelete }>Delete Student</button>  

        <form onSubmit={ this.onSelectCampus }>
          <select value={ campusId } name='campusId' onChange={ onChange }>
          <option value='-1'>Select Campus for {student.name}</option>     
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
      </div>
    )
  }
};

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
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

export default connect(mapStateToProps, mapDispatchToProps)(Student);