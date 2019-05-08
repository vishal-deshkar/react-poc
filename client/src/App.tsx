import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Landing from './landing/Landing';
import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';

const App: React.FC = () => {
  return (
    <Router>
        <div className="App">
          {/* <Navbar /> */}
          <Route exact path="/" component={Login} />
          <div className="container-fluid mr-0 pd-0">
            <Route exact path="/register" component={Register} />
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
  );
}

export default App;
