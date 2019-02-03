import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';

class StudentAction {
    static createProfileAction(obj) {
        console.log(obj)
        return (dispatch) => {
            let uid = dbConfig.auth().currentUser.uid;
            console.log('uid', uid)
            dbConfig.database().ref(`/student/${uid}`).update({ studentData: obj });
        }
    }

    static loadUserProfile() {
        return dispatch => {
                dispatch(StudentAction.clearUserProfile());
                let uid = dbConfig.auth().currentUser.uid;
                console.log('uid from loadProfile Action: ', uid);
                dbConfig.database().ref(`/student/${uid}`).on('value', snapshot => {
                    if (snapshot.val() !== null) {
                        let obj = {
                            name: snapshot.val().studentData.name,
                            department: snapshot.val().studentData.department,
                            cgpa: snapshot.val().studentData.cgpa,
                            semester: snapshot.val().studentData.semester,
                        };
                        console.log(obj);
                        dispatch(StudentAction.loadProfile(obj));
                    }
                })
            
        }
    }
    static loadVacancy() {
        return (dispatch) => {
            dbConfig.database().ref('/company').on('child_added', snapshot=>{
                let data = snapshot.val().vacancy;
                if(data){
                    console.log('comming vacancy: ', data);
                    let obj = {
                        companyName: data.companyName,
                        salary: data.salary,
                        uid: data.uid,
                        vacancy: data.vacancy
                    }
                    dispatch(StudentAction.loadCompanyVacancy(obj));
                }
            });
        }
    }
    static removeStudent(obj) {
        return (dispatch) => {
            dbConfig.database().ref('/student').child(obj.uid).remove()
                .then((data) => {
                    dispatch({
                        type: actionTypes.REMOVE_STUDENT,
                        id: obj.uid
                    });

                })
        }
    }
    static loadCompanyVacancy(obj){
        return{
            type: actionTypes.LOAD_VACANCY,
            obj
        }
    }
    // static createProfile(data){
    //     return{
    //         type: actionTypes.CREATE_PROFILE,
    //         data
    //     }
    // }
    static loadProfile(data) {
        return {
            type: actionTypes.LOAD_USER_PROFILE,
            data
        }
    }

    static clearUserProfile(){
        return{
            type: actionTypes.CLEAR_USER_PROFILE,
        }
    }


}

export default StudentAction;