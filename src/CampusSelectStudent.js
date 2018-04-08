import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, saveCampus, saveStudent } from './store';
import { timingSafeEqual } from 'crypto';

class CampusSelectStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
    }
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSelectStudent(ev) {
    ev.preventDefault();
    this.props.saveStudent(this.state)
    .then(()=> this.setState({id: -1}))  
  }
  onChange(ev){
    this.setState({ id: ev.target.value * 1});
    // console.log('ev.target.value is:', ev.target.value);
  }
  render() {
    const { campus, students } = this.props;
    const { id } = this.state;
    const { onSelectStudent, onChange } = this;

    const notEnrolledStudents = students.filter(student => student.campusId !== campus.id)

    return (
      <div>
        <form onSubmit={ this.onSelectStudent }>
          <select value={ id } onChange={ onChange }>
            <option value='-1'>Select Student</option>     
            {
              notEnrolledStudents.map( student => {
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
        </form>        
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { id })=> {
  const campus = campuses.find( campus => campus.id === id );
  return {
    campus,
    students
  }
};

const mapDispatchToProps = (dispatch, {history, id})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(Object.assign(student, {campusId: id}), history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusSelectStudent);