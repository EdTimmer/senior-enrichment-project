import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, saveStudent } from './store';
import { Link } from 'react-router-dom';
// import StudentSelectCampus from './StudentSelectCampus';

class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      GPA: this.props.student ? this.props.student.GPA : 0,
      email: this.props.student ? this.props.student.email : '',
      image: this.props.student ? this.props.student.image : '',
      campusId: -1,
      errors: {}
    };
    this.onSave = this.onSave.bind(this);
    this.onChangeEntry = this.onChangeEntry.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectCampus = this.onSelectCampus.bind(this);
    this.onChange = this.onChange.bind(this);
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
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps is:', nextProps);
    if(nextProps.student) {
      this.setState({
        firstName: nextProps.student.firstName,
        lastName: nextProps.student.lastName,
        GPA: nextProps.student.GPA,
        email: nextProps.student.email,
        image: nextProps.student.image,
        campusId: nextProps.student.campusId
      })
    }
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
    const student = { id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email, image: this.state.image };
    this.props.saveStudent(student);
  }
  onChangeEntry(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onDelete() {
    this.props.deleteStudent({ id: this.props.id });
  }
  onSelectCampus(ev) {
    ev.preventDefault();
    const campus = this.props.campuses.find( campus => campus.id === this.state.id*1 );
    const student = {id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, GPA: this.state.GPA, email: this.state.email, campusId: this.state.campusId, image: this.state.image}
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value * 1});
  }
  render() {
    const { student, campuses, id } = this.props;  // added id
    const { firstName, lastName, campusId, GPA, email, image, errors } = this.state;   //removed id
    const { onChangeEntry, onSave, onDelete, onSelectCampus, onChange } = this;
    if (!student) {
      return null;
    }
    let campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId); 
    if (!campusOfThisStudent) {
      campusOfThisStudent = {};
      campusOfThisStudent.name = 'none of the campuses';
    } 
    const availableCampuses = campuses.filter(campus => campus.id !== student.campusId);
    
    return (
      <div>      
        <p>Update Information for <b>{student.fullName}</b>:</p>
        <img src={student.image}/>
        <form onSubmit={ onSave }>
          <p>First Name: <input value={ firstName } name='firstName' onChange={ onChangeEntry }/>
            {
            errors.firstName
            }
          </p>
          <p>Last Name: <input value={ lastName } name='lastName' onChange={ onChangeEntry }/>
            {
            errors.lastName
            }
          </p>
          <p>Image URL: <input value={ image } name='image' onChange={ onChangeEntry }/>
            {
              errors.image
            }
          </p>
          <p>GPA: <input value={ GPA } name='GPA' onChange={ onChangeEntry }/>
            {
              errors.GPA
            }
          </p>
          <p>Email: <input value={ email } name='email' onChange={ onChangeEntry }/>
            {
              errors.email
            }
          </p>
          <button>Update Student</button>     
        </form>

        {/* <button disabled={ firstName.length === 0 || lastName.length === 0 || email.length === 0 || GPA*1 > 4}>Update Student</button>*/}

         

        <p>{student.fullName} is currently enrolled in: {campusOfThisStudent.name}</p>

        <form onSubmit={ this.onSelectCampus }>
          <select value={ campusId } name='campusId' onChange={ onChange }>
          <option value='-1'>Select Campus</option>     
          {
            availableCampuses.map( campus => {
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
        {/* 
          TESTING:
        <StudentSelectCampus id={id}/>
        */}
        <button onClick={ onDelete }>Delete Student</button> 
      </div>
    )
  }
};

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  // console.log('student in mapStateToProps is:', student);
  return {
    student,
    campuses
  };
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history)),
    deleteStudent: (student)=> dispatch(deleteStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);