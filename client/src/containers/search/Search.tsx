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
            allUsers: [],
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
        debugger
        console.log("this.state.search :"+this.state.search);
        var s = "Mumbai";
        if (s.match(/Mu.*/)) {
        // do something
        }
        let searchResult = this.state.allUsers.filter((item: any) => {
            let ser = this.state.search ? this.state.search.toLowerCase() : "";

            if(item.name && item.name.toLowerCase().includes(ser)) {
                return true;
            } else if(item.primarySkills && item.primarySkills.toLowerCase().includes(ser)) {
                return true;
            } else if(item.intrestedIn && item.intrestedIn.toLowerCase().includes(ser)) {
                return true;
            }
            return false;
        });

        this.setState({
            users: searchResult
        });
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
                    users: response,
                    allUsers: response
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
                    <button onClick={this.onSearch} className="btn btn-primary col-md-2 srch-btn">
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