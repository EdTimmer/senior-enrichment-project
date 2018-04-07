import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, saveCampus } from './store';

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : ''
    }
    this.onSave = this.onSave.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    const campus = { id: this.props.id, name: this.state.name};
    this.props.saveCampus(campus);
  }
  onChangeName(ev) {
    this.setState({ name: ev.target.value })
  }
  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }
  render() {
    const { campus, studentsOfThisCampus } = this.props;
    const { name } = this.state;
    const { onChangeName, onSave, onDelete } = this;
    if(!campus) {
      return null;
    }
    return (
      <div>
        <h2>Campus</h2>
        <h3>{ campus.name }</h3>
        <p>Number of Students in {campus.name}: {studentsOfThisCampus.length}</p>
        
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChangeName }/>
          <button disabled={ name.length === 0 }>Update</button>     
        </form>
        <button onClick={ onDelete }>Delete</button>  
        <ul>          
            {
              studentsOfThisCampus.map(student => {
                return (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                  </li>
                )
              })
            }         
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { id })=> {
  const campus = campuses.find( campus => campus.id === id );
  const studentsOfThisCampus = students.filter( student => student.campusId === id)
  console.log('studentsOfThisCampus is:', studentsOfThisCampus);
  return {
    campus,
    studentsOfThisCampus
  }
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history)),
    deleteCampus: (campus)=> dispatch(deleteCampus(campus, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Campus);