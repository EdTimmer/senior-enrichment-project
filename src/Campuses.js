import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({campuses, students})=> {
  if (campuses.length > 0) {
    return (
      <div>
        <h3>All Campuses</h3>
        <div>
          <div>
            <p><i>Number of Campuses:</i> <strong>{campuses.length}</strong><Link to={'/campuses/create'}><button>Add</button></Link></p> 
            
          </div>             
          <div>            
                         
          </div>
        </div>  
        <ul className='container-1'>
          {
            campuses.map(campus => {
              return (
                <div key={campus.id} className='studentBox center'>
                
                  <div>
                    <div>
                      <img src={campus.image} height={200} />
                    </div>
                    <div>
                      <Link to={`/campuses/detail/${campus.id}`}>{campus.name}</Link>
                      <p><i>Number of students:</i> {students.filter( student => student.campusId === campus.id).length}</p>
                    
                    </div> 
                              
                  </div>                
                </div>
              )
            })
          }
        </ul>
      </div>
    )  
  }
  else {
    return (
      <div>
        <h4><i>There are no campuses at present.  Please add a campus.</i></h4>
        <Link to={'/campuses/create'}>Add Campus</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ campuses, students })=> {
  return {
    campuses,
    students
  }
};

export default connect(mapStateToProps)(Campuses);