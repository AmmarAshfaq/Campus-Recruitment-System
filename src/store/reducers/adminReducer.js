import actionTypes from '../action/actionTypes';
let initialState = {
    allStudents: [],
    allCompanies: [],
}
function adminReducers(state = initialState, action) {

    switch (action.type) {
        case actionTypes.LOAD_ALL_STUDENTS_REQUEST:
            console.log('allStudent array is cleared:');
            return Object.assign({}, state, { allStudents: [] });

        case actionTypes.LOAD_ALL_STUDENTS:
            return Object.assign({}, state, { allStudents: [...state.allStudents, action.obj] });

        case actionTypes.LOAD_ALL_COMPANIES:
            return Object.assign({}, state, { allCompanies: [...state.allCompanies, action.obj] });

        case actionTypes.LOAD_COMPANY_REQUEST:
            return Object.assign({}, state, {allCompanies:[]});
            
        case actionTypes.REMOVE_VACANCY:
        console.log('action.remove Vacancy');
            return Object.assign({},
                state,
                {
                    allCompanies:
                        state.allCompanies.filter(data => {
                            console.log('data.uid '+ data.uid );
                            console.log('action.id '+ action.id )                            
                            return data.uid !== action.id
                        })
                }
            )
            case actionTypes.REMOVE_STUDENT:
                return Object.assign({},
                    state,
                    {
                        allStudents:
                            state.allStudents.filter(data => {                            
                                return data.uid !== action.id
                            })
                    }
                )
        
        default:
            return state;
    }
}
export default adminReducers;