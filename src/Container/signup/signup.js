import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import History from '../../History';
import { signUpRequestAsync, signUpErrorAlert } from '../../store/action/signup';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import './signup.css';
function mapStateToProps(state) {
    console.log('state from signup: ',state);
    return {
        currentUser: state.applicationReducers.currentUser,
        isProgressing: state.applicationReducers.isProgress,
        isError: state.applicationReducers.isError,
        errorText: state.applicationReducers.errorText,
        status: state.applicationSignInReducer.status,       

    }
}
function mapDispatchToProps(dispatch) {
    return {
        signUpUser: (dataObj) => dispatch(signUpRequestAsync(dataObj)),
        closeAlert: () => dispatch(signUpErrorAlert())
    }
}
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
        marginBottom: '10px'
    },
    heading: {
        color: '#212121'
    }

};
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    signUp = () => {
        let obj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            status: this.props.status,
        }
        this.props.signUpUser(obj);
    }
    signIn = () => {
        console.log('signin is triggered');
        History.push('/');

    }
    updateValue = (ev, target) => {
        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    dispatchClose = () => {
        this.props.closeAlert();
    }
    render() {
        console.log('this.props.status ', this.props.status);
        console.log('error alert info: ', this.props.errorText, this.props.isError);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                {
                    this.props.isProgressing ?
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ margin: '260px auto' }} size={80} thickness={5} />
                        </div>
                        : (
                            <div style={style.paperWapper}>
                                <h1 style={style.heading}>SignUp</h1>
                                <TextField
                                    onChange={(event) => { this.updateValue(event, 'name') }}
                                    value={this.state.name}
                                    style={style.textStyle}
                                    type='text'
                                    underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                    hintText="Name"
                                /><br />
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
                                <RaisedButton className={`btn`} onClick={this.signUp} label="Submit" primary={true} style={style.button} />
                                <RaisedButton className={`btn`} onClick={this.signIn} label="Login" primary={true} style={style.button} />
                            </div>
                        )
                }

            </div>
        );
    }
}

// export default SignUp;
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);