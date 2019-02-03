import actionTypes from '../action/actionTypes';
let initialState = {
    allStudents:[],
}
function companyReducers(state = initialState, action) {
    
    switch (action.type) {
        case actionTypes.LOAD_ALL_STUDENTS_REQUEST:
            console.log('allStudent array is cleared:');
            return Object.assign({}, state, { allStudents: [] });

        case actionTypes.LOAD_ALL_STUDENTS:
            return Object.assign({}, state, {allStudents: [...state.allStudents, action.obj]});

        // case actionTypes.REMOVE_VACANCY:
        //     console.log('action.remove Vacancy');
        //         return Object.assign({},
        //             state,
        //             {
        //                 allStudents:
        //                     state.allStudents.filter(data => {
        //                         return data.uid !== action.uid
        //                     })
        //             }
        //         )

        default:
            return state;
    }
}
export default companyReducers;