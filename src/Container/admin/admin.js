import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import History from '../../History';
import { loginRequestAsync, loginErrorAlert } from '../../store/action/login';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import dbConfig from '../../store/action/firebaseConfig';
import CompanyAction from '../../store/action/company';
import AdminAction from '../../store/action/admin';
import './admin.css';
const style = {
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
    }

};


function mapStateToProps(state) {
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgressing: state.applicationSignInReducer.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText,
        status: state.applicationSignInReducer.state,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert: () => dispatch(loginErrorAlert()),
        loadCompanies: () => dispatch(AdminAction.loadAllCompanies()),
        loadStudents: () => dispatch(AdminAction.loadAllStudents()),
    }
}
class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ isUser: true });
            }
        })
    }

    // componentWillMount(){
    //     this.props.loadCompanies();
    // }

    // componentDidMount(){
    //     this.props.loadStudents();
    // }
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
            password: this.state.password
        }
        this.props.signInUser(obj);
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    showStudents = () =>{
        History.push('/admin/students');
    }
    showCompanies = () =>{
        History.push('/admin/companies');
    }
    render() {
        console.log('Progressing in LOGIN: ', this.props.isProgressing);
        return (
            <div>
                <h1>
                    Admin ID: admin@mail.com
                    <br />
                    Password: admin123456
                </h1>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />

                {
                    this.props.isProgressing ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ margin: '260px auto' }} size={80} thickness={5} />
                        </div>
                    )
                        :
                        this.state.isUser ?
                            <div>
                                <RaisedButton className='btn' label="Students" onClick={this.showStudents} primary={true} style={style.button} />
                                <RaisedButton className='btn' label="Companies" onClick={this.showCompanies} primary={true} style={style.button} />
                            </div>
                            :
                            <div style={style.paperWapper}>

                                <h1 style={style.heading}>Login</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'email') }}
                                    value={this.state.email}
                                    style={style.textStyle}
                                    type='email'
                                    underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                    hintText="Email"
                                /><br />
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'password') }}
                                    value={this.state.password}
                                    style={style.textStyle}
                                    type='password'
                                    underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                    hintText="Password"
                                /><br />
                                <RaisedButton className='btn' onClick={this.signIn} label="Login" primary={true} style={style.button} />
                                <RaisedButton className='btn' onClick={this.register} label="Register" primary={true} style={style.button} />
                            </div>
                }
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
