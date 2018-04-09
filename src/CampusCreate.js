import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus } from './store';

class CampusCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
      description: ''
    }
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onSave(ev) {
    ev.preventDefault();
    const campus = { name: this.state.name, image: this.state.image, description: this.state.description };
    this.props.saveCampus(campus);
  }
  render() {
    const { name, image, description } = this.state;
    const { onChangeInfo, onSave } = this;
    return (
      <div>
        <h3>Add A New Campus</h3>
        <form onSubmit={ onSave }>
          <p>Name: <input value={ name } name='name' onChange={ onChangeInfo }/></p>
          <p>Image URL: <input value={ image } name='image' onChange={ onChangeInfo }/></p>
          <p>Description: <input value={ description } name='description' onChange={ onChangeInfo }/></p>
          <button disabled={name.length === 0}>Add Campus</button>
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