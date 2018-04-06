import React, { Component } from 'react';
import { loadCampuses, loadStudents, saveCampus } from './store';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Campuses from './Campuses';
import Students from './Students';
import Campus from './Campus';
import Student from './Student';
import Home from './Home';
import CampusCreate from './CampusCreate';

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
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path='/campuses' exact component={ Campuses } />
            <Route path='/students' exact component={ Students } />
            <Route path='/campuses/create' exact render={({history})=> <CampusCreate history={ history }/>}/>
            <Route path='/campuses/:id' exact render={({match})=> <Campus id={ match.params.id * 1 }/>}/>
            <Route path='/students/:id' exact render={({match})=> <Student id={ match.params.id * 1 }/>}/>
          </Switch>
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