import React, { Component } from 'react'
import axios from 'axios'

class Search extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange (e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render () {
        console.log("Search Content");
        return (
            <div className="container-fluid">
                <h1>Search Content</h1>
            </div>
        )
    }
}

export default Search