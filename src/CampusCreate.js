import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus } from './store';

class CampusCreate extends Component {
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
    const campus = { name: this.state.name };
    this.props.saveCampus(campus);
  }
  render() {
    const { name } = this.state;
    const { onChangeName, onSave } = this;
    return (
      <div>
        <h3>Add A New Campus</h3>
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
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