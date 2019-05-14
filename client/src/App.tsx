import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import Dashboard from './containers/dashboard/Dashboard';


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
  }
  isLoggedIn() {
    const token = localStorage.getItem('usertoken');
    return token?true:false;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/" render={() => (
            this.isLoggedIn() ? (
              <Dashboard />
            ) : (
              <Redirect to="/login"/>
            )
          )}/>        
          <Route exact path="/register" component={Register} />
          <Redirect from='/*' to='/'/>
        </Switch>
      </Router>
    );
  }
}


export default App;