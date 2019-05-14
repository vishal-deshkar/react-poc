import types from './actionTypes';
import axios from 'axios';

export const fetchProfile = (id) => dispatch => {
  axios
      .get(`/user/${id}`)
      .then(res => {                
          return dispatch({
            type:types.FETCH_PROFILE,
            payload: res.data
        })
      })
      .catch(err => {
          console.log(err)
      })
}

export const updateProfile = (obj) => dispatch => {
  axios
        .put(`/user/${obj.id}`, {
          totalExp: obj.totalExp,
          skills: obj.skills,
          intrest: obj.intrest
      })
      .then(res => {                
          return dispatch({
            type:types.UPDATE_PROFILE,
            payload: res.data
        })
      })
      .catch(err => {
          console.log(err)
      })
}
