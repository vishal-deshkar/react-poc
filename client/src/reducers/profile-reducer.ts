import types from '../actions/actionTypes';
import { string } from 'prop-types';


const initialState = {
    item:{},
    text:'',
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.FETCH_PROFILE:
            state={
                ...state,
                item:action.payload
            }
        break;
        case types.UPDATE_PROFILE:
            state={
                ...state,
                text:action.payload
            }
    }
    return state;
}