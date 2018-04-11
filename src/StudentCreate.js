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
        if (!value || value > 4.0 || value <= 0) {
          return 'GPA of above 0.0 and not greater than 4.0 is required';
        }
      },
      email: (value)=> {
        if(!value) {
          return 'A valid email is required';
        }
      },
      image: (value)=> {
        // if(!value) {
        //   return 'Image URL is required';
        // }
      
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(value)) {
          return 'Please enter a valid image URL';
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
          <button><p>Add Student</p></button>
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