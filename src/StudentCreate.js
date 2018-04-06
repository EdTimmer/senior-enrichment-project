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
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={name.length === 0}>Create Student</button>
        </form>
      </div>
    )
  }
}