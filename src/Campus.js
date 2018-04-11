import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCampus, saveCampus, saveStudent } from './store';
import CampusSelectStudent from './CampusSelectStudent';

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : '',
      image: this.props.campus ? this.props.campus.image : '',
      description: this.props.campus ? this.props.campus.description : ''
    }
    this.onSave = this.onSave.bind(this);
    this.onChangeInfo = this.onChangeInfo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectStudent = this.onSelectStudent.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSave(ev) {
    ev.preventDefault();
    const campus = { id: this.props.id, name: this.state.name, image: this.state.image, description: this.state.description };
    this.props.saveCampus(campus);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }
  onSelectStudent(ev) {
    ev.preventDefault();
    const student = this.props.students.find( student => student.id === this.state.student.id*1 );
    this.props.saveStudent(student);  
  }
  onChange(ev){
    this.setState({ student: { id: student.id, firstName: student.firstName, lastName: student.lastName, campusId: this.props.id}});
  }
  render() {
    const { campus, students, id } = this.props;
    const { name, image, description } = this.state;
    const { onChangeInfo, onSave, onDelete, onSelectStudent, onChange } = this;
    if(!campus) {
      return null;
    }
    const studentsOfThisCampus = students.filter( student => student.campusId === id)
    return (
      <div className='container'>
        <h2>{ campus.name }</h2>
        <div className='row'>
          <div className='col'>
            <img src={campus.image} height={300}/>
          </div>
          <div className='col'>
            
            <p><i>Number of students in {campus.name}:</i> <strong>{studentsOfThisCampus.length}</strong></p>
            <p>{campus.description}</p>
            {!!campus.link ? (
            <p><Link to={campus.link}><i>Would you like to know more?</i></Link></p>
            ) : (<br />)}
          </div>
        </div>
        {/*
        <form onSubmit={ onSave }>
          <p>Name: <input value={ name } name='name' onChange={ onChangeInfo }/></p>
          <p>Image URL: <input value={ image } name='image' onChange={ onChangeInfo }/></p>
          <p>Description: <input value={ description } name='description' onChange={ onChangeInfo }/></p>
          <button disabled={ name.length === 0 }>Update</button>     
        </form>
        <button onClick={ onDelete }>Delete</button>  

        <CampusSelectStudent id={id}/>
        */}
        <p><i>Our Students:</i></p>
        <ul>          
            {
              studentsOfThisCampus.map(student => {
                return (
                  <li key={student.id}>
                    <img src={student.image} height={50} />
                    <Link to={`/students/detail/${student.id}`}>{student.fullName}</Link>
                  </li>
                )
              })
            }         
        </ul>
       {studentsOfThisCampus.length === 0 ? (<p>There are no students currently enrolled in {campus.name}</p>) : (<p></p>)}

      <button>
          <Link to={`/campuses/edit/${campus.id}`}>Edit</Link>
        </button>
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
  return {
    saveCampus: (campus)=> dispatch(saveCampus(campus, history)),
    deleteCampus: (campus)=> dispatch(deleteCampus(campus, history)),
    saveStudent: (student)=> dispatch(saveStudent(student, history))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Campus);