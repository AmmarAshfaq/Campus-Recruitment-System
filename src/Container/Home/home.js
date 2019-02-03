import React from 'react';
import dbConfig from '../../store/action/firebaseConfig';
import RaisedButton from 'material-ui/RaisedButton';
import {status} from '../../store/action/login';
import {connect} from 'react-redux';
import History from '../../History';
import AdminAction from '../../store/action/admin';
import './home.css';

const styles ={
    btn:{
        width: '130px',
        marginTop: '30px',
    },
    btnWrapper:{
        textAlign: 'center',
    }
}
function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        saveStatus: (data) => dispatch(status(data)),
        loadStudents: () => dispatch(AdminAction.loadAllStudents()),
        loadCompanies: () => dispatch(AdminAction.loadAllCompanies()),
    }
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // dbConfig.auth().onAuthStateChanged(user => {
        //     if (user) {
        //         this.state.isUser = true;
        //     } else {
        //         this.state.isUser = false;
        //     }
        // })
        this.props.loadStudents();
    }
    componentWillMount(){
        this.props.loadCompanies();
    }
    componentDidMount(){
        
    }
    navigate = (select, ev) =>{
        if(select === 'student'){
            History.push(`/studentLogin`);
        }else{
            History.push(`/${select}`);            
        }
        this.props.saveStatus(select);
    }
    render() {
        return (
            <div>
                <h1 >
                    Login as a:
                </h1>
                <div style={styles.btnWrapper} className='btn-wrapper'>
                    <RaisedButton label="Student" primary={true}  style={styles.btn} onClick={(ev)=>{this.navigate('student', ev)}}/>
                    <br />
                    <RaisedButton label="Admin" primary={true} style={styles.btn} onClick={(ev)=>{this.navigate('admin', ev)}}/>
                    <br />
                    <RaisedButton label="Company" primary={true} style={styles.btn} onClick={(ev)=>{this.navigate('company', ev)}}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
