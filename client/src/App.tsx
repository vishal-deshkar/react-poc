import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import Dashboard from './containers/dashboard/Dashboard';


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.changeLoggingStatus = this.changeLoggingStatus.bind(this)
  }
  changeLoggingStatus() {
    this.setState({isLoggedIn:true})
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" render={(props) => <Login view={this.changeLoggingStatus} {...props} /> } />
          <Route exact path="/" render={() => (
            this.state.isLoggedIn ? (
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