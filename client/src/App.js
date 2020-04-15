import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import PrivateRoute from './components/routing/PrivateRoute';

import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alerts';
import setAuthToken from './util/setAuthToken';

const App = () =>{ 
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar/>
              <div className="container">
                <Alert/>
                  <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                  </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  )
}

export default App;
