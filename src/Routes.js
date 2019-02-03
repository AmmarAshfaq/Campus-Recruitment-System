import React from 'react'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './Container/login/login';
import SignUp from './Container/signup/signup';
// import Home from './Container/home';
import Home from './Container/Home/home';
import StudentLogin from './Container/student/login';
import StudentConsole from './Container/student/studentConsole';
import CompanyLogin from './Container/company/company';
import StudentList from './Container/company/allStudents';
import AdminLogin from './Container/admin/admin';
import VacancyList from './Container/student/vacancy';
import AllCompanies from './Container/allCompanies/allCompanies';
import AllStudents from './Container/allStudents/allStudent';
import History from './History';

class Routers extends React.Component {
  render() {
    return (
        <Router history = {History}>
        <Switch>   
          <Route exact path="/" component={Home}/>
          <Route exact path="/studentLogin" component={StudentLogin}/>
          <Route exact path="/student" component= {StudentConsole} />
          <Route exact path="/company" component={CompanyLogin}/>
          <Route exact path="/admin" component={AdminLogin}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/studentList" component={StudentList}/>
          <Route exact path="/student/vacancies" component={VacancyList}/>
          <Route exact path="/admin/companies" component={AllCompanies}/>
          <Route exact path="/admin/students" component={AllStudents}/>
          
          {/* <Route path="/signup" component={SignUp}/>
          <Route path="/home" component={Home}/> */}

          {/* <Route path="/topics" component={Topics}/> */}
        </Switch>
      </Router>
      
    )
  }
}
export default Routers;