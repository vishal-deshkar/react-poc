import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import './App.css';
import Login from './containers/login/Login';
import Register from './containers/register/Register';
import Dashboard from './containers/dashboard/Dashboard';
import Search from './containers/search/Search';


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false,
      uname:''
    }
    this.changeLoggingStatus = this.changeLoggingStatus.bind(this)
  }
  changeLoggingStatus() {
    let uname = localStorage.getItem('user-name')||'Guest';
    
    this.setState({
      isLoggedIn:true,
      uname:uname
    });
    

  }

  render() {
    return (
      <Router>
        { this.state.isLoggedIn ? (
          <div>
            <div className="top-panel">
                <Link to={'/'} className="navbar-brand">{this.state.uname}'s Home</Link>              
            </div>
              <nav className="left-panel">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item pd-lr-1">
                        <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item pd-lr-1">
                        <Link to={'/create'} className="nav-link disabled-link">TBD</Link>
                    </li>
                    <li className="nav-item pd-lr-1">
                        <Link to={'/index'} className="nav-link disabled-link">TBD</Link>
                    </li>
                    <li className="nav-item pd-lr-1">
                        <Link to={'/search'} className="nav-link">View Enrolments</Link>
                    </li>
                </ul>
            </nav>
          </div>
            ) : (
              null
            )
        }
        
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
          <Route exact path="/search" render={() => (
            this.state.isLoggedIn ? (
              <Search />
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Redirect from='/*' to='/'/>
        </Switch>
      </Router>
    );
  }
}


export default App;