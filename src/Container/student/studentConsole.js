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
class StudentConsole extends React.Component {
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
        // dbConfig.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         this.setState({ isUser: true });
        //     } else {
        //         this.setState({ isUser: false });
        //     }
        // })
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
        console.log('matlab loadUserProfile ka action dispatch ho rha hai');
        this.props.loadUserProfile();
    }
    componentDidMount(){
        console.log('matlab loadUserProfile ka action dispatch ho rha hai in didMount');            
        // this.props.loadVacancy();
    }
    createProfile = () => {
        let obj = {
            name: dbConfig.auth().currentUser.displayName,
            department: this.state.department,
            cgpa: this.state.cgpa,
            semester: this.state.semester,
        };
        this.props.createProfile(obj);
        this.setState({ open: false, openProfile: false });        
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
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
                            <div>
                            <RaisedButton label="Available Vacancies" primary={true} onClick={this.showVacancy} />                                
                                <Dialog
                                    title="Dialog With Actions"
                                    actions={this.actions}
                                    modal={false}
                                    open={this.state.open}
                                    onRequestClose={this.handleClose}
                                >
                                    <TextField
                                        // onChange={(event) => { this.updateValue(event, 'name') }}
                                        value={dbConfig.auth().currentUser.displayName}
                                        style={styles.textStyle}
                                        type='text'
                                        underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                        hintText="Name"
                                        disabled={true}
                                    /><br />
                                    <TextField
                                        onChange={(event) => { this.updateValue(event, 'cgpa') }}
                                        value={this.state.cgpa}
                                        style={styles.textStyle}
                                        type='text'
                                        underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                        hintText="CGPA"
                                    /><br />
                                    <TextField
                                        onChange={(event) => { this.updateValue(event, 'department') }}
                                        value={this.state.department}
                                        style={styles.textStyle}
                                        type='text'
                                        underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                                        hintText="Department"
                                    /><br />
                                    <SelectField
                                        floatingLabelText="Semester"
                                        value={this.state.semester}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            this.state.bloodGroup.map(data => {
                                                return (
                                                    <MenuItem value={data} primaryText={data} key={data} />
                                                )
                                            })
                                        }
                                    </SelectField>
                                </Dialog>
                                <div>
                                    {

                                        this.props.userPorfileData.length !== 0 ?
                                            <div>
                                                <Dialog
                                                    title="Student Profile"
                                                    actions={<FlatButton
                                                        label="Cancel"
                                                        primary={true}
                                                        onClick={this.handleClose}
                                                    />}
                                                    modal={false}
                                                    open={this.state.openProfile}
                                                    onRequestClose={this.handleClose}
                                                >
                                                    <h2 style={styles.textStyle}>
                                                        Name: {" "}
                                                        {this.props.userPorfileData[0].name}
                                                    </h2>
                                                    <h2 style={styles.textStyle}>
                                                        Department: {" "}
                                                        {this.props.userPorfileData[0].department}
                                                    </h2>
                                                    <h2 style={styles.textStyle}>
                                                        CGPA: {" "}
                                                        {this.props.userPorfileData[0].cgpa}
                                                    </h2>
                                                    <h2 style={styles.textStyle}>
                                                        Semester: {" "}
                                                        {this.props.userPorfileData[0].semester}
                                                    </h2>
                                                </Dialog>
                                                < RaisedButton label="View Profile" primary={true} style={styles.btn} onClick={(ev) => { this.setState({ openProfile: true }) }} />
                                                <br />
                                                <RaisedButton label="Create Profile" disabled={true} primary={true} style={styles.btn} onClick={() => { this.setState({ open: true }) }} />
                                                <strong>Contact to admin profile already creaated</strong>
                                            </div>

                                            :
                                            <div>
                                                <RaisedButton label="View Profile" disabled={true} primary={true} style={styles.btn}  onClick={(ev) => { this.setState({ openProfile: true }) }} />
                                                <strong>There is no data corresponding the user</strong>
                                                <br />
                                                <RaisedButton label="Create Profile" primary={true} style={styles.btn} onClick={() => { this.setState({ open: true }) }} />
                                            </div>
                                    }
                                </div>
                            </div>
                }
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(StudentConsole);
