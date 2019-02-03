import React from 'react';
import dbConfig from '../../store/action/firebaseConfig';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import History from '../../History';
import { loginRequestAsync, loginErrorAlert } from '../../store/action/login';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorAlert from '../../Component/errorAlert';
import Lists from '../../Component/list';
import { List, ListItem } from 'material-ui/List';
import CompanyAction from '../../store/action/company';
import InfoDialog from '../../Component/modal';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import './company.css';
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
    console.log(state);
    return {
        currentUser: state.applicationSignInReducer.currentUser,
        isProgressing: state.applicationSignInReducer.isProgress,
        isError: state.applicationSignInReducer.isError,
        errorText: state.applicationSignInReducer.errorText,
        status: state.applicationSignInReducer.status,
        allStudent: state.companyReducers.allStudents,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert: () => dispatch(loginErrorAlert()),

    }
}
class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isUser: false,
            semester: '',
            department: '',
            cgpa: 0,
            openModal: false,
            vacancy: '',
            salary: '',
            open: false,
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
                onClick={this.createVacancy}
            />
        ];
    }
    createVacancy = () => {
        let obj = {
            vacancy: this.state.vacancy,
            salary: this.state.salary,
            companyName: dbConfig.auth().currentUser.displayName,
            uid: dbConfig.auth().currentUser.uid,
        }
        dbConfig.database().ref('/company/'+obj.uid+'/').update({vacancy: obj});
        this.setState({ open: false });

    }
    handleModal = () => {
        this.setState({ openModal: false });
    }
    showStudent = (obj) => {
        console.log(obj);
        this.setState({ name: obj.name, department: obj.department, cgpa: obj.cgpa, semester: obj.semester, openModal: true });
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    handleClose = () => {
        this.setState({ open: false, });
        console.log('handle close called')
    }
    showForm = () => {
        this.setState({ open: true });
    }

    render() {
        console.log('this.props.allStudent: ', this.props.allStudent);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                <InfoDialog name={this.state.name} department={this.state.department} cgpa={this.state.cgpa} semester={this.state.semester} open={this.state.openModal} handleOpen={this.handleModal} />
                <Dialog
                    title="company Vacancy"
                    actions={this.actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <TextField
                        onChange={(event) => { this.updateValue(event, 'vacancy') }}
                        value={this.state.vacancy}
                        style={{
                            width: '100%'
                        }}
                        type='text'
                        underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                        hintText="vacancy"

                    /><br />
                    <TextField
                        onChange={(event) => { this.updateValue(event, 'salary') }}
                        value={this.state.salary}
                        style={{
                            width: '100%'
                        }}
                        type='text'
                        underlineFocusStyle={{ borderBottom: '2px solid #2196f3 ' }}
                        hintText="Salary"
                    /><br />
                </Dialog>
                {
                    this.props.isProgressing ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ margin: '260px auto' }} size={80} thickness={5} />
                        </div>
                    )
                        :
                        <div>
                            <RaisedButton label="Add vacancy" primary={true} onClick={this.showForm} />
                            <List>
                                {
                                    this.props.allStudent.map(eachUser => {
                                        return (
                                            <ListItem onClick={() => { this.showStudent(eachUser) }}>
                                                Student Name: {' '}
                                                {eachUser.name}
                                            </ListItem>
                                        )
                                    })

                                }
                            </List>

                        </div>
                }
            </div>
        );
    }
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
