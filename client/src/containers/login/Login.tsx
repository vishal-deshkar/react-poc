import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: false,
            passwordValid: false,
            userValid: 1
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }
    onChange (e: any) {
        this.setState({ userValid: 1 });
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e: any) {
        e.preventDefault();
        console.log("onSubmit");
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.login(user).then(res => {
            if (res) {
                this.setState({ userValid: true });
                localStorage.setItem('user-id', res._id);
                localStorage.setItem('user-name', res.firstname);
                this.props.view();
                this.props.history.push(`/`)
                console.log("Login Success");
            }
        })
    }
    onRegister (e: any) {
        e.preventDefault();
        console.log("onRegister");
        this.props.history.push(`/register`)
    }
    
    login = (user: any) => {
        return axios
            .post('/login', {
                email: user.email,
                password: user.password
            })
            .then(res => {
                localStorage.setItem('usertoken', res.data)
                return res.data
            })
            .catch(err => {
                console.log(err);
                this.setState({ userValid: 0 });
            })
    }
    render () {
        return (
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form">
                                    <h3 className="text-center text-info">Login</h3>
                                    <div className="form-group">
                                        <label className="text-info">Username:</label><br/>
                                        <input type="text" id="username" 
                                            className="form-control" 
                                            name="email"
                                            placeholder="Enter Email"
                                            value={this.state.email}
                                            onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-info">Password:</label><br/>
                                        <input type="text" id="password" 
                                            className="form-control"
                                            name="password"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">                                        
                                        <input type="submit" onClick={this.onSubmit} name="submit" className="btn btn-info btn-md" value="submit"/>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <a href="#" onClick={this.onRegister} className="text-info">Register here</a>
                                    </div>
                                    {!this.state.userValid && (
                                        <div className="user-err">Invalid email or password</div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login