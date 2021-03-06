import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Multiselect from "@khanacademy/react-multi-select";
import './Dashboard.css';

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
    constructor(props: any) {
        super(props);
        this.state = {
            id:'',
            firstname:'',
            totalExp: '',
            skills: '',
            intrest: '',
            isEditable:1,
        }
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.checkInput = this.checkInput.bind(this);
    }

    componentDidMount() {
        const id = localStorage.getItem('user-id');
        this.getuser(id).then(res => {
            if (res) {
                console.log("Get User");
                console.log(res);
                this.setState({
                    id: res._id,
                    firstname:res.firstname,
                    totalExp: res.totalExp,
                    skills: res.skills,
                    intrest: res.intrest,
                });
                if (res.totalExp) {
                    this.setState({ isEditable: 0 });
                }
            }
        });
    }

    onEdit() {
        this.setState({ isEditable: 1 });
    }
    
    onSave = () => {
        const obj = {
            id: this.state.id,
            totalExp: this.state.totalExp,
            skills: this.state.skills,
            intrest: this.state.intrest
        }
        this.update(obj).then(res => {
            if (res) {
                this.setState({ isEditable: 0 });
            }
        })
    }

    update = (obj: any) => {
        return axios
            .put(`/user/${obj.id}`, {
                totalExp: obj.totalExp,
                skills: obj.skills,
                intrest: obj.intrest
            })
            .then(res => {                
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    getuser = (id: any) => {
        return axios
            .get(`/user/${id}`)
            .then(res => {                
                return res.data
            })
            .catch(err => {
                console.log(err)
            })
    }
    handlePsChange = (skills) => {
        this.setState({ skills });
    }
    handleInChange = (intrest) => {
        this.setState({ intrest });
    }

    checkInput(evt: any) {
        debugger
        let regexp1 = new RegExp("[^0-9.]");
        if(regexp1.test(evt.target.value))
        {
            evt.preventDefault();
            // alert("Only numbers are allowed");
            // return false;
        }        
    }

    onChange (e: any) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render () {
        
        return (
            <div className="app">                
                <div className="content">
                    <div className="container-fluid">
                        <div className="col-md-8 con">
                            <form noValidate>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="totalExp">Total Experience</label>
                                    <input disabled={!this.state.isEditable} type="number"
                                        className="form-control col-md-6"
                                        name="totalExp"
                                        pattern="\d+((\.|,)\d+)?"
                                        placeholder="Enter Total Experience"
                                        value={this.state.totalExp}
                                        onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="primarySkills">Primary Skills</label>
                                    <div className="col-md-2 multiselect-pos pd-0">
                                        <ReactMultiSelectCheckboxes name="primarySkills"  isDisabled={!this.state.isEditable} value={this.state.skills} onChange={this.handlePsChange} options={this.primaryOptions} />
                                    </div>
                                    <div className="col-md-4 label-text">
                                        {this.state.skills?(this.state.skills.map((skill, index) => {
                                            let label;
                                            if (index != this.state.skills.length-1) {
                                                label = <span key={index}>{skill.label+", "}</span>
                                            } else {
                                                label = <span key={index}>{skill.label}</span>
                                            }
                                            return (label);
                                        })):null}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-6" htmlFor="interestedIn">Enroll (Emerging Tech)</label>
                                    <div className="col-md-2 multiselect-pos pd-0">
                                        <ReactMultiSelectCheckboxes isDisabled={!this.state.isEditable} value={this.state.intrest} onChange={this.handleInChange} options={this.interestedOptions} />
                                    </div>
                                    <div className="col-md-4 label-text">
                                        {this.state.intrest?(this.state.intrest.map((intitem, index) => {
                                            let label;
                                            if (index != this.state.intrest.length-1) {
                                                label = <span key={index}>{intitem.label+", "}</span>
                                            } else {
                                                label = <span key={index}>{intitem.label}</span>
                                            }
                                            return (label);
                                        })):null}
                                    </div>
                                </div>
                                <div className="col-md-12 spacer"></div>
                                <div className="col-md-12 pd-0 text-right">
                                   {!this.state.isEditable && (
                                        <button type="button" onClick={this.onEdit} className="mr-lr-1 col-md-3 btn btn-lg btn-primary">
                                            Edit
                                        </button>
                                    )}                                    
                                    <button type="button" disabled={!this.state.isEditable} onClick={this.onSave} className="col-md-3 btn btn-lg btn-primary">
                                        Save
                                    </button>
                                </div>                                
                            </form>
                        </div>
                        <div className="col-md-4 u-name">
                        {`${this.state.firstname}'s Home`}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard