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
// import './company.css';
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
        allVacancy: state.studentReducers.vacancy,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        signInUser: (dataObj) => dispatch(loginRequestAsync(dataObj)),
        closeAlert: () => dispatch(loginErrorAlert()),

    }
}
class VacancyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isUser: false,
            openModal: false,
            vacancy: '',
            salary: '',
            open: false,
            companyName:''
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
    handleModal = () => {
        this.setState({ openModal: false });
    }
    showStudent = (obj) => {
        console.log(obj);
        this.setState({ vacancy: obj.vacancy, salary: obj.salary, companyName: obj.companyName ,openModal: true});
    }
    updateValue = (ev, target) => {

        let obj = {};
        obj[target] = ev.target.value;
        this.setState(obj);
    }
    handleClose = () => {
        this.setState({ openModal: false, });
        console.log('handle close called')
    }
    showForm = () => {
        this.setState({ openModal: true });
    }

    render() {
        console.log('this.props.allVacancy: ', this.props.allVacancy);
        return (
            <div>
                <ErrorAlert handleClose={this.dispatchClose} open={this.props.isError} errorText={this.props.errorText} />
                <Dialog
                    title={`Company Name: ${this.state.companyName}`}
                    modal={false}
                    open={this.state.openModal}
                    onRequestClose={this.handleModal}
                >
                    <h2>Vacancy: {this.state.vacancy}</h2>
                    <h2>Salary: {this.state.salary}</h2>
                    
                    
                    
                </Dialog>
                {/* <InfoDialog name={this.state.name} department={this.state.department} open={this.state.openModal} handleOpen={this.handleModal} /> */}
                {
                    this.props.isProgressing ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ margin: '260px auto' }} size={80} thickness={5} />
                        </div>
                    )
                        :
                        <div>
                            {/* <RaisedButton label="Add vacancy" primary={true} onClick={this.showForm} /> */}
                            <List>
                                {
                                    this.props.allVacancy.map((eachUser, i) => {
                                        return (
                                            <ListItem style={{backgroundColor:'#dedede'}} key={i} onClick={() => { this.showStudent(eachUser) }}>
                                                <h2>Company Name: </h2>
                                                {eachUser.companyName}
                                                
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
export default connect(mapStateToProps, mapDispatchToProps)(VacancyList);
