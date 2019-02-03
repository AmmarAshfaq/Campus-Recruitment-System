import actionTypes from '../action/actionTypes';
let initialState = {
    userProfile:[],
    vacancy: [],
}
function studentReducers(state = initialState, action) {
    
    switch (action.type) {
        case actionTypes.LOAD_USER_PROFILE:
            return Object.assign({}, state, {userProfile: [action.data]});

        case actionTypes.LOAD_VACANCY:
            return Object.assign({}, state, {vacancy: [...state.vacancy, action.obj]});

        case actionTypes.CLEAR_USER_PROFILE:
            return Object.assign({}, state, {userProfile:[]});
            
        default:
            return state;
    }
}
export default studentReducers;