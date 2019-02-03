import actionTypes from './actionTypes';
import dbConfig from './firebaseConfig';
import History from '../../History';
// console.log(signUpRequest());
export function signUpRequestAsync(SignupObj) {
    return (dispatch) => {
        console.log('till here code run')
        dispatch(signUpRequest());
        dbConfig.auth().createUserWithEmailAndPassword(SignupObj.email, SignupObj.password)
        .then(user => {
                console.log('created user', user);
                if(SignupObj.status === 'student'){
                    History.push('/student');
                }
                if(SignupObj.status === 'company'){
                    History.push('/studentList');
                }
                
                return user.updateProfile({
                    displayName: SignupObj.name,
                })
                    .then(() => {
                        console.log('newly created user: ', SignupObj);
                        let obj = {
                            name: user.displayName,
                            uid: user.uid,
                            email: user.email,
                            dataObj:{},
                        }
                        if(SignupObj.status === 'student'){
                            console.log('student action signup')
                            // dbConfig.database().ref('/student').child(`/${user.uid}`).set(obj);
                            dispatch(signUpSucceed(obj));
                        }
                        if(SignupObj.status === 'company'){
                            console.log('company Action signup');                            
                            dbConfig.database().ref('/company').child(`/${user.uid}`).set(obj);
                            dispatch(signUpSucceed(obj));
                        }
                    })
            })
            .catch((error) => {
                dispatch(signUpError(error.message));
                History.push('/signup');
                // alert(error.message);
            })


    }
}

function signUpRequest() {
    return {
        type: actionTypes.SIGNUP_PROGRESS
    }
}
function signUpSucceed(data) {
    return {
        type: actionTypes.SIGNUP_SUCCEED,
        data
    }
}
function signUpError(error){
    return{
        type: actionTypes.SIGNUP_ERROR,
        error
    }
}
export function signUpErrorAlert(){
    return{
        type: actionTypes.SIGNUP_ERROR_ALERT
    }
}
