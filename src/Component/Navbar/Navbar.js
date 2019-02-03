import React from 'react';
import dbConfig from '../../store/action/firebaseConfig';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { logoutRequestAsync } from '../../store/action/logout';
import {connect} from 'react-redux';
import './navbar.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
function mapStateToProps(state) {
  return {
    currentUser: state.applicationLogoutReducer.currentUser
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signOutUser: () => dispatch(logoutRequestAsync())
  }
}
class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: false
    };
    dbConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ status: true });
      }
      else {
        this.setState({ status: false });
      }
    })
  }
  signOut = () => {
    this.props.signOutUser()
    this.setState({open: false});
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  changeURL = (page) => {
    console.log(this.props);

  }

  render() {
    return (
      <div>
        <AppBar
          className={`nav`}
          title="Campus Recruitment System"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          
          {
            this.state.status ?
              <MenuItem onClick={this.signOut}>Logout</MenuItem>
              :
              null
          }
        </Drawer>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerUndockedExample);