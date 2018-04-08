import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, saveStudent } from './store';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.student ? this.props.student.name : '',
      campusId: -1
    };
    this.onSave = this.onSave.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectCampus = this.onSelectCampus.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    const student = { id: this.props.id, name: this.state.name };
    this.props.saveStudent(student);
  }
  onChangeName(ev) {
    this.setState({ name: ev.target.value })
  }
  onDelete() {
    this.props.deleteStudent({ id: this.props.id });
  }
  onSelectCampus(ev) {
    ev.preventDefault();
    const campus = this.props.campuses.find( campus => campus.id === this.state.id*1 );
    const student = {id: this.props.id, name: this.state.name, campusId: this.state.campusId}
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ campusId: ev.target.value * 1});
  }
  render() {
    const { student, campuses } = this.props;
    const { name, id, campusId } = this.state;
    const { onChangeName, onSave, onDelete, onSelectCampus, onChange } = this;
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
        <p><i>{nameOfCampus}</i></p>

        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={ name.length === 0 }>Update</button>     
        </form>

        <button onClick={ onDelete }>Delete</button>  

        <form onSubmit={ this.onSelectCampus }>
          <select value={ campusId } onChange={ onChange }>
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