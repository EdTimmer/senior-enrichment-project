import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({ campus, campuses, students, id, studentsOfThisCampus })=> {
  if(!campus) {
    return null;
  }    
     return (
      <div className='container'>
        <h3>{ campus.name }</h3>
        <div className='row'>
          <div className='col'>
            <img src={campus.image} height={300}/>
          </div>
          <div className='col'>  
            <Link to={!!campuses[campus.id-2] ? (`/campuses/detail/${campus.id - 1}`):(`/campuses/detail/${campuses[campuses.length -1].id}`)}><button className='nextButton'>Prior</button></Link>          
            <Link to={!!campuses[campus.id] ? (`/campuses/detail/${campus.id + 1}`):(`/campuses/detail/1`)}><button className='nextButton'>Next</button></Link>  
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
            <Link to={`/campuses/edit/${campus.id}`}><button>Edit</button></Link>        
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
  const studentsOfThisCampus = students.filter( student => student.campusId === id);
  return {
    campus,
    campuses,
    students,
    studentsOfThisCampus,  }
};

export default connect(mapStateToProps)(Campus);