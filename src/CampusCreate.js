import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus } from './store';

class CampusCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: '',
      motto: '',
      errors: {}
    }
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      name: (value)=> {
        if(!value) {
          return 'Campus name is required';
        }
      },
      image: (value)=> {
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!regexp.test(value)) {
          return 'Please enter a valid image URL';
        }
      },
      description: (value)=> {
        if(!value) {
          return 'Campus description is required';
        }
      },
      motto: (value)=> {
        if(!value) {
          return 'Our motto is:  Motto is required!';
        }
      },
    }
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onSave(ev) {
    ev.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key)=> {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;  
    }
    const campus = { name: this.state.name, image: this.state.image, description: this.state.description, motto: this.state.motto };
    this.props.saveCampus(campus);
  }
  render() {
    const { name, image, description, motto, errors } = this.state;
    const { onChangeInfo, onSave } = this;
    return (
      <div>
        <h3>Add A New Campus</h3>
        <form onSubmit={ onSave }>
          <p>Name: <input value={ name } name='name' onChange={ onChangeInfo }/>
            {
              errors.name
            }
          </p>
          <p>Image URL: <input value={ image } name='image' onChange={ onChangeInfo }/>
            {
              errors.image
            }
          </p>
          <p>Description: <input value={ description } name='description' onChange={ onChangeInfo }/>
            {
              errors.description
            }
          </p>
          <p>Motto: <input value={ motto } name='motto' onChange={ onChangeInfo }/>
            {
              errors.motto
            }
          </p>

          <button>Add</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history))    
  }
}

export default connect(null, mapDispatchToProps)(CampusCreate);