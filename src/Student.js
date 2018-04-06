import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { saveStudent } from './store';

// class Student extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: this.props.student ? this.props.student.name : ''
//     };
//     this.onSave = this.onSave.bind(this);
//     this.onChangeName = this.onChangeName.bind(this);
//   }
//   onSave(ev) {
//     ev.preventDefault();
//     const student = { id: this.props.id, name: this.state.name};
//     this.props.saveStudent(student)
//   }
//   onChangeName(ev) {
//     this.setState({ name: ev.target.value })
//   }
//   render() {
//     const { student } = this.props;
//     const { name } = this.state;
//     const { onChangeName, onSave} = this;
//     if (!student) {
//       return null;
//     }
//     return (
//       <div>
//         <h2>Student</h2>
//         <h3>{ student.name }</h3>
//         <form onSubmit={ onSave }>
//           <input value={ name } onChange={ onChangeName }/>
//           <button disabled={ name.length === 0 }>Update</button>
          
//         </form>
//       </div>
//     )
//   }
// }


const Student = ({ student })=> {
  if(!student) {
    return null;
  }
  return (
    <div>
      <h2>Student</h2>
      <h3>{ student.name }</h3>
    </div>
  )
}

const mapStateToProps = ({ students }, { id })=> {
  const student = students.find( student => student.id === id );
  console.log('student is:', student);
  return {
    student
  }
};

export default connect(mapStateToProps)(Student);