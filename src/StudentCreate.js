import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent } from './store';

class StudentCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChangeName(ev) {
    this.setState({ name: ev.target.value })
  }
  onSave(ev) {
    ev.preventDefault();
    const student = { name: this.state.name };
    this.props.saveStudent(student);
  }
  render() {
    const { name } = this.state;
    const { onChangeName, onSave } = this;
    return (
      <div>
        <h3>Add A New Student</h3>
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={name.length === 0}>Add Student</button>
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