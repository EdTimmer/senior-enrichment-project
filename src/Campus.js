import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  render() {
    const { campus, studentsOfThisCampus } = this.props;
    const { name } = this.state;
    if(!campus) {
      return null;
    }
    return (
      <div>
        <h2>Campus</h2>
        <h3>{ campus.name }</h3>
        <p>Number of Students in this Campus: {studentsOfThisCampus.length}</p>
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

export default connect(mapStateToProps)(Campus);