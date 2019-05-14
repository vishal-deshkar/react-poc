import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import './Dashboard.css';
import { connect } from "react-redux";
import { fetchProfile, updateProfile } from "./../../actions/profiles-action";

class Dashboard extends Component<any,any> {
    interestedOptions = [
                { label: 'Cloud', value: 1},
                { label: 'Datascience', value: 2},
                { label: 'Big Data', value: 3},
            ];
    primaryOptions = [
                { label: 'Java', value: 1},
                { label: 'Dot Net', value: 2},
                { label: 'Angular', value: 3},
                { label: 'React', value: 4}
            ];
    isEditable = 1;
    constructor(props: any) {
        super(props);
        this.state = {
            id:'',
            totalExp: '',
            skills: '',
            intrest: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    componentDidMount() {
        debugger;
        const id = localStorage.getItem('user-id');
        this.props.fetchProfile(id);
    }

    onEdit() {
        this.isEditable = 1;
        // this.setState({ isEditable: 1 });
    }
    
    onSave = () => {
        const obj = {
            id: this.state.id,
            totalExp: this.state.totalExp,
            skills: this.state.skills,
            intrest: this.state.intrest
        }
        this.props.updateProfile(obj);
        // this.update(obj).then(res => {
        //     if (res) {
        //         this.setState({ isEditable: 0 });
        //     }
        // })
    }

    // update = (obj: any) => {
    //     return axios
    //         .put(`/user/${obj.id}`, {
    //             totalExp: obj.totalExp,
    //             skills: obj.skills,
    //             intrest: obj.intrest
    //         })
    //         .then(res => {                
    //             return res.data
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.profile._id,
            totalExp: nextProps.profile.totalExp,
            skills: nextProps.profile.skills,
            intrest: nextProps.profile.intrest
        });
    }
    handlePsChange = (skills) => {
        this.setState({ skills });
    }
    handleInChange = (intrest) => {
        this.setState({ intrest });
    }

    onChange (e: any) {
        console.log(this.state);
        this.setState({ [e.target.name]: e.target.value })
    }
    render () {
        
        return (
            <div className="app">
                <div className="top-panel">
                    <Link to={'/'} className="navbar-brand">Brand Logo</Link>
                    
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
                            <Link to={'/search'} className="nav-link disabled-link">Search</Link>
                        </li>
                    </ul>
                    
                </nav>

                <div className="content">
                    <div className="container-fluid">
                        <div className="col-md-6">
                            <form noValidate>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="totalExp">Total Experience</label>
                                    <input disabled={!this.isEditable} type="number"
                                        className="form-control col-md-6"
                                        name="totalExp"
                                        placeholder="Enter Total Experience"
                                        value={this.state.totalExp || ''}
                                        onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="primarySkills">Primary Skills</label>
                                    <div className="col-md-6 multiselect-pos pd-0">
                                        <ReactMultiSelectCheckboxes isDisabled={!this.isEditable} value={this.state.skills || ''} onChange={this.handlePsChange} options={this.primaryOptions} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="interestedIn">Interested In</label>
                                    <div className="col-md-6 multiselect-pos pd-0">
                                        <ReactMultiSelectCheckboxes isDisabled={!this.isEditable} value={this.state.intrest || ''} onChange={this.handleInChange} options={this.interestedOptions} />
                                    </div>                                    
                                </div>
                                <div className="col-md-12 spacer"></div>
                                <div className="col-md-12 pd-0 text-right">
                                   {!this.isEditable && (
                                        <button type="button" onClick={this.onEdit} className="mr-lr-1 col-md-3 btn btn-lg btn-primary">
                                            Edit
                                        </button>
                                    )}                                    
                                    <button type="button" disabled={!this.isEditable} onClick={this.onSave} className="col-md-3 btn btn-lg btn-primary">
                                        Save
                                    </button>
                                </div>                                
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.profileReducer.item);
    // this.isEditable = 0;
    return { profile: state.profileReducer.item }
}

// const mapStateToProps = (state) => ({
//     profile: state.profileReducer.item
// })

export default connect(mapStateToProps, { fetchProfile, updateProfile })(Dashboard);