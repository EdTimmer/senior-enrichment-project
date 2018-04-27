import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({ campus, campuses, students, id })=> {
  if(!campus) {
    return null;
  }    

  const studentsOfThisCampus = students.filter( student => student.campusId === id);

  const nextCampusIndex = campuses.indexOf(campus) + 1;
  const nextCampusId = nextCampusIndex < campuses.length ? campuses[nextCampusIndex].id : campuses[0].id;
  const priorCampusIndex = campuses.indexOf(campus) -1;
  const lastCampusIndex = campuses.length - 1;
  const priorCampusId = priorCampusIndex !== -1 ? campuses[priorCampusIndex].id : campuses[lastCampusIndex].id;

  return (
      <div className='container'>
        <h1>{ campus.name }</h1>
        <div className='row'>
          <div className='col'>
            <img src={campus.image} height={300}/>
          </div>
          <div className='col'>  
            <Link to={`/campuses/detail/${priorCampusId}`}><button className='nextButton'><p>Prior</p></button></Link>
            <Link to={`/campuses/detail/${nextCampusId}`}><button className='nextButton'><p>Next</p></button></Link>
            <table>
            <tr>
            <td><p><i>Number of students in {campus.name}:</i> <strong>{studentsOfThisCampus.length}</strong></p></td>
            </tr>
            <tr>
            <td><p>{campus.description}</p></td>    
            </tr>
            <tr>
            <td><p>Our Motto: <b><i>{campus.motto}</i></b></p></td>
            </tr>          
            </table>            
            <Link to={`/campuses/edit/${campus.id}`}><button><p>Edit</p></button></Link>        
          </div>
        </div>

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
    )
}

const mapStateToProps = ({ campuses, students }, { id })=> {
  const campus = campuses.find( campus => campus.id === id );
  // const studentsOfThisCampus = students.filter( student => student.campusId === id);
  return {
    campus,
    campuses,
    students
    // studentsOfThisCampus
  }
};

export default connect(mapStateToProps)(Campus);