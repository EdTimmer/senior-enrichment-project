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
        if(!value) {
          return 'Image URL is required';
        }
      },
      description: (value)=> {
        if(!value) {
          return 'Campus description is required';
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
    const campus = { name: this.state.name, image: this.state.image, description: this.state.description };
    this.props.saveCampus(campus);
      // .catch((err)=> {
      //   alert('Image URL has to be a valid image URL address');
      // })
  }
  render() {
    const { name, image, description, errors } = this.state;
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
          <button>Add Campus</button>
        </form>
      </div>
    )
  }
}

// <button disabled={name.length === 0}>Add Campus</button>

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history))    
  }
}

export default connect(null, mapDispatchToProps)(CampusCreate);