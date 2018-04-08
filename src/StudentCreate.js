import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent } from './store';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      GPA: 0,
      email: ''
    }
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onSave(ev) {
    ev.preventDefault();
    const student = { firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email };
    this.props.saveStudent(student);
  }
  render() {
    const { firstName, lastName, GPA, email } = this.state;
    const { onChangeInfo, onSave } = this;
    return (
      <div>
        <h3>Add A New Student</h3>
        <form onSubmit={ onSave }>
          <p>First Name: <input value={ firstName } name='firstName' onChange={ onChangeInfo }/></p>
          <p>Last Name: <input value={ lastName } name='lastName' onChange={ onChangeInfo }/></p> 
          <p>GPA: <input value={ GPA } name='GPA' onChange={ onChangeInfo }/></p>
          <p>Email: <input value={ email } name='email' onChange={ onChangeInfo }/></p>
          <button disabled={firstName.length === 0 && lastName.length === 0 && email.length === 0}>Add Student</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history))    
  }
}

export default connect(null, mapDispatchToProps)(StudentCreate);