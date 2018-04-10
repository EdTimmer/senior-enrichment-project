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
      email: '',
      image: '',
      errors: {}
    }
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      firstName: (value)=> {
        if(!value) {
          return 'First name is required';
        }
      },
      lastName: (value)=> {
        if(!value) {
          return 'Last name is required';
        }
      },
      GPA: (value)=> {
        if (!value || value > 4.000) {
          return 'GPA is required and it cannot be higer than 4.000';
        }
      },
      email: (value)=> {
        if(!value) {
          return 'A valid email is required';
        }
      },
      image: (value)=> {
        if(!value) {
          return 'Image URL is required';
        }
      },
    }
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onSave(ev) {
    ev.preventDefault();
    const errors = Object.keys(this.validators).reduce( (memo, key )=> {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo; 
    }, {});
    this.setState({ errors });
    if(Object.keys(errors).length) {
      return; 
    }
    const student = { firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email, image: this.state.image };
    this.props.saveStudent(student);
  }
  render() {
    const { firstName, lastName, GPA, email, image, errors } = this.state;
    const { onChangeInfo, onSave } = this;
    console.log('GPA is:', GPA);
    return (
      <div>
        <h3>Add A New Student</h3>
        <form onSubmit={ onSave }>
          <p>First Name: <input value={ firstName } name='firstName' onChange={ onChangeInfo }/>
            {
              errors.firstName
            }
          </p>
          <p>Last Name: <input value={ lastName } name='lastName' onChange={ onChangeInfo }/>
            {
              errors.lastName
            }
          </p> 
          <p>Image URL: <input value={ image } name='image' onChange={ onChangeInfo }/>
            {
              errors.image
            }
          </p>
          <p>GPA: <input value={ GPA } name='GPA' onChange={ onChangeInfo }/>
            {
              errors.GPA
            }
          </p>
          <p>Email: <input value={ email } name='email' onChange={ onChangeInfo }/>
            {
              errors.email
            }
          </p>
          <button>Add Student</button>
        </form>
      </div>
    )
  }
}
// <button disabled={firstName.length === 0 || lastName.length === 0 || email.length === 0 || GPA*1>4}>Add Student</button>

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history))    
  }
}

export default connect(null, mapDispatchToProps)(StudentCreate);