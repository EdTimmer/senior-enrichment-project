import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, saveStudent, selectCampus } from './store';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.student ? this.props.student.name : '',
      id: this.props.campus ? this.props.campus.id : ''
    };
    this.onSave = this.onSave.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectCampus = this.onSelectCampus.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    const student = { id: this.props.id, name: this.state.name};
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
    this.props.selectCampus(campus);  //THIS SHOULD BE AN UPDATE OF THE STUDENT, NOT OF THE CAMPUS
  }
  onChange(ev){
    this.setState({ id: ev.target.value });
  }
  render() {
    const { student, campuses } = this.props;
    const { name, id } = this.state;
    const { onChangeName, onSave, onDelete, onSelectCampus, onChange } = this;
    if (!student) {
      return null;
    }
    return (
      <div>
        <h2>Student</h2>
        <h3>{ student.name }</h3>
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={ name.length === 0 }>Update</button>     
        </form>
        <button onClick={ onDelete }>Delete</button>  
        <form onSubmit={ this.onSelectCampus }>
          <select value={ id } onChange={ onChange }>
          <option value='-1'>Select Campus</option>     
          {
            campuses.map( campus => {
              return (
                <option key={ campus.id } value={ campus.id }>
                  { campus.name }
                </option>
              );
            })
          }
          </select>
          <button disabled={ id*1 === -1}>
          Assign
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  // console.log('student is:', student);
  return {
    student,
    campuses
  }
};

const mapDispatchToProps = (dispatch, {history})=> {
  // console.log('campus is:', campus);
  return {
    selectCampus: (campus)=> dispatch(selectCampus(campus, history)),
    saveStudent: (student)=> dispatch(saveStudent(student, history)),
    deleteStudent: (student)=> dispatch(deleteStudent(student, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);