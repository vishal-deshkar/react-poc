import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import rootReducer from '../reducers';
const middlewares=[
    thunk
]

const intialState = {};

const store = createStore(rootReducer, intialState, applyMiddleware(...middlewares));

export default store;