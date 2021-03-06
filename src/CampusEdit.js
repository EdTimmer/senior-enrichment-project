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
      motto: this.props.campus ? this.props.campus.motto : '',
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
          return 'Our motto:  Motto is required!';
        }
      },
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.campus) {
      this.setState({
        name: nextProps.campus.name,
        image: nextProps.campus.image,
        description: nextProps.campus.description,
        motto: nextProps.campus.motto
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
    const campus = { id: this.props.id, name: this.state.name, image: this.state.image, description: this.state.description, motto: this.state.motto };
    this.props.saveCampus(campus);
  }
  onChangeInfo(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }
  render() {
    const { campus, students, id } = this.props; 
    const { name, image, description, motto, errors } = this.state;
    const { onChangeInfo, onSave, onDelete } = this; 
    if(!campus) {
      return null;
    }
    const studentsOfThisCampus = students.filter( student => student.campusId === id);

    return (
      <div>
        
          <div>
            <h1>Update information for <b>{ campus.name }</b></h1>
          </div>        
           
       
          <div className='row'> 
            <div className='col'>
              <img src={campus.image} width={400}/>
              <CampusSelectStudent id={id} parentHistory={this.props.history}/>

              <p><i>Our Students:</i></p>
              {studentsOfThisCampus.length === 0 ? (<p>There are no students in this campus yet</p>):(        
                <ul>          
               {
                 studentsOfThisCampus.map(student => {
                   return (
                     <div key={student.id}>
                       <img src={student.image} className='studentImageSmall' />
                       <Link to={`/students/detail/${student.id}`}>{student.fullName}</Link>
                     </div>
                   )
                 })
               }         
               </ul>)}
            </div>
            <div className='col text-left'>       
              <form onSubmit={ onSave }>
                <p>Name: <br/><input value={ name } name='name' onChange={ onChangeInfo }/>
                  {
                    errors.name
                  }
                </p>
                <p>Image URL: <br/><input value={ image } name='image' onChange={ onChangeInfo }/>
                  {
                    errors.image
                  }
                </p>
                <p>Description: <br/><input value={ description } name='description' onChange={ onChangeInfo }/>
                  {
                    errors.description
                  }
                </p>
                <p>Motto: <br/><input value={ motto } name='motto' onChange={ onChangeInfo }/>
                  {
                    errors.motto
                  }
                </p>
                <button><p>Update</p></button>                 
              </form>
              <button onClick={ onDelete } className='deleteButton'><p>Delete</p></button>
            </div>           
          </div>     
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


export default connect(mapStateToProps, mapDispatchToProps)(CampusEdit);