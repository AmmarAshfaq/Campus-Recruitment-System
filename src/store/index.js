import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import applicationReducers from './reducers/signupReducer';
import applicationSignInReducer from './reducers/loginReducer';
import applicationLogoutReducer from './reducers/logoutReducer';
import studentReducers from './reducers/studentReducer';
import companyReducers from './reducers/companyReducer';
import adminReducer from './reducers/adminReducer';
let reducers = combineReducers({
    applicationReducers,
    applicationSignInReducer,
    applicationLogoutReducer,
    studentReducers,
    companyReducers,
    adminReducer
});
const loggerMiddleware = createLogger();

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;