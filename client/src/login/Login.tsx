import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }
    onChange (e: any) {
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
                this.props.history.push(`/profile`)
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
                console.log(err)
            })
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label className="col-md-6" htmlFor="email">Email Address</label>
                                <input type="email"
                                    className="form-control col-md-6"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="col-md-6" htmlFor="password">Password</label>
                                <input type="password"
                                    className="col-md-6 form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" onClick={this.onSubmit} className="col-md-3 btn btn-lg btn-primary">
                                Sign in
                            </button>
                            <button type="button" onClick={this.onRegister} className="mr-1 col-md-3 btn btn-lg btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login