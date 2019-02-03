import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';
export function loginRequestAsync(loginObj){
    return (dispatch)=>{
        console.log(loginObj);
        dispatch(loginRequest());
        dbConfig.auth().signInWithEmailAndPassword(loginObj.email, loginObj.password)
        .then(user=>{
            if(loginObj.status === 'student'){
                History.push('/student');
            }
            if(loginObj.status === 'company'){
                History.push('/studentList');
            }
            if(loginObj.status === 'admin'){
                History.push('/admin');
            }
            let obj={
                name: user.displayName,
                uid: user.uid,
                email: user.email
            }
            
            dispatch(loginSucceed(obj));
        })
        .catch((error)=>{
            dispatch(loginError(error.message));
        })
    }
}

function loginRequest(){
    return{
        type: actionTypes.LOGIN_PROGRESS
    }
}
function loginSucceed(data){
    return{
        type: actionTypes.LOGIN_SUCCEED,
        data
    }
}

function loginError(error){
    return{
        type: actionTypes.LOGIN_ERROR,
        error
    }
}

export function loginErrorAlert(){
    return{
        type: actionTypes.LOGIN_ERROR_ALERT
    }
}
export function status(data){
    return{
        type: actionTypes.STATUS,
        data
    }
}
