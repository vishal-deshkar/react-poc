import React, { Component } from 'react'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import './Search.css';

class Search extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            search: '',
            users: [],
            columns: [
                {
                    dataField: 'name',
                    text: 'User Name'
                },
                {
                    dataField: 'primarySkills',
                    text: 'Primary Skills'
                }, {
                    dataField: 'intrestedIn',
                    text: 'Intrested In',
                    sort: true
                }
            ]
          } 
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch() {
        console.log("this.state.search :"+this.state.search);
        // this.getusers(obj).then(res => {
        //     if (res) {
        //         this.setState({ isEditable: 0 });
        //     }
        // })
    }
    getusers = () => {
        return axios
            .get(`/users`)
            .then(res => {                
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getusers().then(response => {
              if (response) {
                response.forEach(item => {
                    item.name = `${item.firstname} ${item.lastname}`;
                    if (item.skills && item.skills.length) {
                        item.primarySkills = '';
                        item.skills.forEach(skill => {
                            if (!item.primarySkills) {
                                item.primarySkills = `${skill.label}`;
                            } else {
                                item.primarySkills = `${item.primarySkills}, ${skill.label}`;
                            }
                        })
                    }
                    if (item.intrest && item.intrest.length) {
                        item.intrestedIn = '';
                        item.intrest.forEach(int => {
                            if (!item.intrestedIn) {
                                item.intrestedIn = `${int.label}`;
                            } else {
                                item.intrestedIn = `${item.intrestedIn}, ${int.label}`;
                            }
                        })
                    }
                });
                this.setState({
                    users: response
                });
              }
        });
      }

    onChange (e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render () {
        console.log("Search Content");
        return (
            <div className="content">
                <div className="container-fluid">
                    <input type="text"
                        className="form-control col-md-9"
                        name="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.onChange}/>
                    <button className="btn btn-primary col-md-2 srch-btn">
                        Search
                    </button>
                    <div className="table-container">
                        <BootstrapTable 
                            striped
                            hover
                            keyField='id' 
                            data={ this.state.users } 
                            columns={ this.state.columns } />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Search