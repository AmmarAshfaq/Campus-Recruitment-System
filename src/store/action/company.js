import actionTypes from './actionTypes';
// import dbConfig from './firebaseConfig';
// import * as firebase from 'firebase';
import History from '../../History';
import dbConfig from './firebaseConfig';
let req = dbConfig.database().ref('/company');
class CompanyAction {


    static loadAllStudents() {
        console.log('company action');
        return dispatch => {
            console.log('company action');
            dispatch(CompanyAction.loadStudentsRequest());
            dbConfig.database().ref('student/').on('child_added', (snapshot) => {
                if (snapshot.val().studentData) {
                    let datas = snapshot.val();
                    console.log("snapshot.val()", datas);
                    let dataKeysArray = Object.keys(datas);
                    let obj = {
                        name: datas.studentData.name,
                        cgpa: datas.studentData.cgpa,
                        department: datas.studentData.department,
                        semester: datas.studentData.semester
                    }
                    console.log('company action data: ', obj);
                    dispatch(CompanyAction.loadStudents(obj));
                }
            })
        }
    }
    static removeData(obj) {
        console.log('here remove called')
        console.log('node is remvoed');
        return (dispatch) => {
            // dispatch(CompanyAction.loadStudentsRequest());
            req.child(obj.uid).remove()
                .then((data) => {
                    dispatch({
                        type: actionTypes.REMOVE_VACANCY,
                        id: obj.uid
                    });

                })
            // console.log('loadcompanyName')  
            // req.on('child_removed', (snapshot) => {
            //     let datas = snapshot.val();
            //         console.log("snapshot.val()", datas);
            //         dispatch({
            //             type: actionTypes.REMOVE_VACANCY,
            //             id: datas.uid
            //         });                
            // })
        }
    }
    static loadCompanies(obj) {
        return {
            type: actionTypes.LOAD_ALL_COMPANIES,
            obj
        }
    }
    static loadStudents(obj) {
        return {
            type: actionTypes.LOAD_ALL_STUDENTS,
            obj
        }
    }
    static loadStudentsRequest() {
        return {
            type: actionTypes.LOAD_ALL_STUDENTS_REQUEST,

        }
    }

}

export default CompanyAction;