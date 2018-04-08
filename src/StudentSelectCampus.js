import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent } from './store';

class StudentSelectCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campusId: -1
    };
    this.onSelectCampus = this.onSelectCampus.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSelectCampus(ev) {
    ev.preventDefault();
    const campus = this.props.campuses.find( campus => campus.id === this.state.id*1 );
    const student = {id: this.props.id, name: this.props.student.name, campusId: this.state.campusId}
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ campusId: ev.target.value * 1});
  }
  render() {
    const { student, campuses } = this.props;
    const { name, id, campusId } = this.state;
    const { onSelectCampus, onChange } = this;
    console.log('props are: ', this.props)
     
    return (
      <div>
        <form onSubmit={ this.onSelectCampus }>
          <select value={ campusId } onChange={ onChange }>
          <option value='-1'>Select Campus</option>     
          {
            campuses.map( campus => {
              return (
                <option key={ campus.id } value={ campus.id }>
                  { campus.name }
                </option>
              );
            })
          }
          </select>
          <button disabled={ campusId*1 === -1}>
          Assign
          </button>
        </form>          
      </div>
    )
  }
}

const mapStateToProps = ({ students, campuses }, { id })=> {
  
  const student = students.find( student => student.id === id );
  return {
    student,
    campuses
  }
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSelectCampus);