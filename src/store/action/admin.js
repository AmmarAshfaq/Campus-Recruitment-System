import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';

class AdminAction {
    
    static loadAllStudents() {
        return dispatch => {
        dispatch(AdminAction.loadStudentsRequest());
        dbConfig.database().ref('student/').on('child_added', (snapshot) => {
            console.log(snapshot.val());
            if(snapshot.val().studentData !== undefined){
                let datas = snapshot.val();
                console.log('snapshot.val(): ', snapshot.val());
                        let dataKeysArray = Object.keys(datas);
                        let obj = {
                            name: datas.studentData.name,
                            cgpa: datas.studentData.cgpa,
                            department: datas.studentData.department,
                            semester: datas.studentData.semester,
                            uid: snapshot.key,
                        }
                        dispatch(AdminAction.loadStudents(obj));
            }
            })
        }
    }
    static loadAllCompanies() {
        console.log('loadcompanyName')        
        return dispatch => {
        dispatch(AdminAction.loadCompanyRequest());
        console.log('loadcompanyName')
        dbConfig.database().ref('company/').on('child_added', (snapshot) => {
            console.log(snapshot.val());            
            let datas = snapshot.val().vacancy;
            if(datas){
                console.log("snapshot.val()", datas);
                        let obj = {
                            companyName: datas.companyName,
                            vacancy: datas.vacancy,
                            salary: datas.salary,
                            uid: datas.uid, 
                        }
                        console.log('all companies action: ', obj);
                        dispatch(AdminAction.loadCompanies(obj));
            }
            })
        }
    }

    static loadStudents(obj){
        return{
            type: actionTypes.LOAD_ALL_STUDENTS,
            obj
        }
    }
    static loadCompanies(obj){
        return{
            type: actionTypes.LOAD_ALL_COMPANIES,
            obj
        }
    }
    static loadCompanyRequest(){
        return{
            type: actionTypes.LOAD_COMPANY_REQUEST
        }
    }
    static loadStudentsRequest(){
        return{
            type: actionTypes.LOAD_ALL_STUDENTS_REQUEST,
            
        }
    }

}

export default AdminAction;