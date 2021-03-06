import React, { Component } from 'react';
import { loadCampuses, loadStudents } from './store';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';
import Campus from './Campus';
import Student from './Student';
import Home from './Home';
import CampusCreate from './CampusCreate';
import StudentCreate from './StudentCreate';
import StudentEdit from './StudentEdit';
import CampusEdit from './CampusEdit';

class App extends Component {
  componentDidMount() {
    this.props.loadCampuses();
    this.props.loadStudents();
  }
  render() {
    return (
      <Router>
        <div>
          <Route render={({location})=> <Nav path={location.pathname} /> } />
            <Route path='/' exact component={ Home } />
            <Route path='/campuses' exact component={ Campuses } />
            <Route path='/students' exact component={ Students } />
            <Route path='/campuses/create' exact render={({history})=> <CampusCreate history={ history }/>}/>
            <Route path='/students/create' exact render={({history})=> <StudentCreate history={ history }/>}/>
            <Route path='/campuses/detail/:id' exact render={({match, history})=> <Campus id={ match.params.id * 1 } history={ history }/>}/>
            <Route path='/campuses/edit/:id' exact render={({match, history})=> <CampusEdit id={ match.params.id * 1 } history={ history }/>}/>
            <Route path='/students/detail/:id' exact render={({match, history})=> <Student id={ match.params.id * 1 } history={ history }/>}/>
            <Route path='/students/edit/:id' exact render={({match, history})=> <StudentEdit id={ match.params.id * 1 } history={ history }/>}/>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    loadCampuses: ()=> dispatch(loadCampuses()),
    loadStudents: ()=> dispatch(loadStudents())
  }
}

export default connect(null, mapDispatchToProps)(App);