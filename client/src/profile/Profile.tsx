import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import axios from 'axios';
import './Profile.css';

class Profile extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }
    
    render () {
        return (
            <div className="wrapper">
                <div className="top-panel">
                    <Link to={'/profile'} className="navbar-brand">Brand Logo</Link>
                </div>
                <nav className="left-panel">
                    <ul className="navbar-nav mr-auto">
                        {/* <p>Dummy Heading</p> */}
                        <li className="nav-item">
                            <Link to={'/profile'} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/create'} className="nav-link">Create</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/index'} className="nav-link">Index</Link>
                        </li>
                    </ul>
                </nav>

                <div className="content">
                    <div className="container-fluid">
                        <div className="col-md-6">
                            <form noValidate>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="first_name">First Name</label>
                                    <input type="text"
                                        className="form-control col-md-6"
                                        name="first_name"
                                        placeholder="Enter First Name"/>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="last_name">Last Name</label>
                                    <input type="text"
                                        className="form-control col-md-6"
                                        name="last_name"
                                        placeholder="Enter Last Name" />
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="email">Email Address</label>
                                    <input type="email"
                                        className="form-control col-md-6"
                                        name="email"
                                        placeholder="Enter Email" />
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control col-md-6"
                                        name="password"
                                        placeholder="Enter Password" />
                                </div>
                                <button type="button" className="col-md-3 btn btn-lg btn-primary">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile