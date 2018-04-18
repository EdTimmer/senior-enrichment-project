import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCampus, saveCampus, saveStudent } from './store';
// import { timingSafeEqual } from 'crypto';

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
    // .then(()=> history.push('/students')) //added
  }
  onChange(ev){
    this.setState({ id: ev.target.value * 1});
  }
  render() {
    const { campus, students, parentHistory } = this.props; 
    const { id } = this.state;
    const { onSelectStudent, onChange } = this;

    const notEnrolledStudents = students.filter(student => student.campusId !== campus.id)

    return (
      <div>
        <form onSubmit={ this.onSelectStudent }>
          <select value={ id } onChange={ onChange }>
            <option value='-1'>Select New Student</option>     
            {
              notEnrolledStudents.map( student => {
                return (
                  <option key={ student.id } value={ student.id }>
                    { student.fullName }
                  </option>
                );
              })
            }
          </select>
          <button disabled={ id*1 === -1}><p>Enroll</p></button>
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

const mapDispatchToProps = (dispatch, {parentHistory, id})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(Object.assign(student, {campusId: id}), parentHistory, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusSelectStudent);