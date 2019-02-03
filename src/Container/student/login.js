import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import History from '../../History';
import dbConfig from '../../store/action/firebaseConfig';
import { loginRequestAsync, loginErrorAlert } from '../../store/action/login';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import StudentAction from '../../store/action/student';
import './login.css';

const styles = {
    paper: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        display: 'inline-block',
        padding: '40px'
    },
    paperWapper: {
        width: '40vw',
        margin: '0 auto',
        marginTop: '100px',
        border: '5px solid darkgrey',
        padding: '30px'

    },
    textStyle: {
        width: '100%'
    },
    button: {
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',

    },
    heading: {
        color: '#212121'
    },
    btn: {
        width: '200px',
        marginTop: '30px',
    },
    btnWrapper: {
        textAlign: 'center',
    }

};


function mapStateToProps(state) {
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgressing: state.applicationSignInReducer.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText,
        status: state.applicationSignInReducer.status,
        userPorfileData: state.studentReducers.userProfile,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert: () => dispatch(loginErrorAlert()),
        createProfile: (obj) => dispatch(StudentAction.createProfileAction(obj)),
        loadUserProfile: () => dispatch(StudentAction.loadUserProfile()),
        loadVacancy: () => dispatch(StudentAction.loadVacancy()),
    }
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cgpa: '',
            department: '',
            semester: '',
            email: '',
            password: '',
            isUser: false,
            open: false,
            openProfile: false,
            loadProfile: false,
            bloodGroup: [
                "1st",
                "2nd",
                "3rd",
                "4th",
                "5th",
                "6th",
                "7th",
                "8th",
            ]
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ isUser: true });
            } else {
                this.setState({ isUser: false });
            }
        })
        this.actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
            ,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.createProfile}
            />
        ];
    }
    componentWillMount() {
        // this.props.loadUserProfile();
    }
    componentDidMount(){
        this.props.loadVacancy();
    }
    createProfile = () => {
        let obj = {
            name: dbConfig.auth().currentUser.displayName,
            department: this.state.department,
            cgpa: this.state.cgpa,
            semester: this.state.semester,
        };
        this.props.createProfile(obj)
    }
    register = () => {
        History.push('/signup');
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    signIn = () => {
        let obj = {
            email: this.state.email,
            password: this.state.password,
            status: this.props.status
        }
        this.props.signInUser(obj);
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    handleClose = () => {
        this.setState({ open: false, openProfile: false });
        console.log('handle close called')
    }
    //semester select
    handleChange = (event, index, semester) => {
        this.setState({ semester });
    }
    showVacancy = () => {
        History.push('/student/vacancies');
    }
    render() {
        console.log('this.props.userPorfileData: ', this.props.userPorfileData)
        console.log('Progressing in LOGIN: ', this.props.status);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                {
                    this.props.isProgressing ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ margin: '260px auto' }} size={80} thickness={5} />
                        </div>
                    )
                        :
                            <div style={styles.paperWapper}>
                                <h1 style={styles.heading}>Login</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'email') }}
                                    value={this.state.email}
                                    style={styles.textStyle}
                                    type='email'
                                    underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                    hintText="Email"
                                /><br />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'password') }}
                                    value={this.state.password}
                                    style={styles.textStyle}
                                    type='password'
                                    underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                    hintText="Password"
                                /><br />

                                <RaisedButton className='btn' onClick={this.signIn} label="Login" primary={true} style={styles.button} />
                                <RaisedButton className='btn' onClick={this.register} label="Register" primary={true} style={styles.button} />
                            </div>
                }
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
