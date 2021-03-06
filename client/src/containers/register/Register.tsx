import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e: any) {
        e.preventDefault()

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        this.register(user).then(res => {
            this.props.history.push(`/`)
        })
    }
    register = (newUser: any) => {
        return axios.post('/register', {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
        }).then(res => {
            console.log('Registered!')
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate>
                            <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
                            <div className="form-group">
                                <label className="col-md-6" htmlFor="firstname">First Name</label>
                                <input type="text"
                                    className="form-control col-md-6"
                                    name="firstname"
                                    placeholder="Enter First Name"
                                    value={this.state.firstname}
                                    onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <label className="col-md-6" htmlFor="lastname">Last Name</label>
                                <input type="text"
                                    className="form-control col-md-6"
                                    name="lastname"
                                    placeholder="Enter Last Name"
                                    value={this.state.lastname}
                                    onChange={this.onChange} />
                            </div>
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
                                    className="form-control col-md-6"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="button" onClick={this.onSubmit} className="col-md-3 btn btn-lg btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register