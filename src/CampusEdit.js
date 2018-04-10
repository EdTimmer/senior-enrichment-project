import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, saveCampus, saveStudent } from './store';
import CampusSelectStudent from './CampusSelectStudent';

class CampusEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : '',
      image: this.props.campus ? this.props.campus.image : '',
      description: this.props.campus ? this.props.campus.description : '',
      errors: {}
    }
    this.onSave = this.onSave.bind(this);
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
    // this.onSelectStudent = this.onSelectStudent.bind(this);
    // this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps is:', nextProps);
    if(nextProps.campus) {
      this.setState({
        name: nextProps.campus.name,
        image: nextProps.campus.image,
        description: nextProps.campus.description
      })
    }
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
    const campus = { id: this.props.id, name: this.state.name, image: this.state.image, description: this.state.description };
    this.props.saveCampus(campus);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }
  // onSelectStudent(ev) {
  //   ev.preventDefault();
  //   const student = this.props.students.find( student => student.id === this.state.student.id*1 );
  //   this.props.saveStudent(student);  
  // }
  // onChange(ev){
  //   this.setState({ student: { id: student.id, firstName: student.firstName, lastName: student.lastName, campusId: this.props.id}});
  // }
  render() {
    const { campus, students, id } = this.props; 
    const { name, image, description, errors } = this.state;
    const { onChangeInfo, onSave, onDelete } = this;  //removed onSelectStudent and onChange
    if(!campus) {
      return null;
    }
    const studentsOfThisCampus = students.filter( student => student.campusId === id);

    return (
      <div>
        <h2>{ campus.name }</h2>
        <p><i>Number of students in {campus.name}:</i> <strong>{studentsOfThisCampus.length}</strong></p>
        <img src={campus.image} width={200}/>
        <p>{campus.description}</p>
        
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
          <button>Update</button>     
        </form>
        
        {/*<button disabled={ name.length === 0 }>Update</button> */}

        <CampusSelectStudent id={id} parentHistory={this.props.history}/>

        <p><i>Our Students:</i></p>
        <ul>          
            {
              studentsOfThisCampus.map(student => {
                return (
                  <li key={student.id}>
                    <Link to={`/students/${student.id}`}>{student.fullName}</Link>
                  </li>
                )
              })
            }         
        </ul>
        <button onClick={ onDelete }>Delete Campus</button>  
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students }, { id })=> {
  const campus = campuses.find( campus => campus.id === id );
  return {
    campus,
    students
  }
};

const mapDispatchToProps = (dispatch, {history})=> {
  console.log('history in CampusEdit dispatch:', history);
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history)),
    deleteCampus: (campus)=> dispatch(deleteCampus(campus, history)),
    saveStudent: (student)=> dispatch(saveStudent(student, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CampusEdit);