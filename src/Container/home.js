import React from 'react';
import dbConfig from '../store/action/firebaseConfig';
function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        dbConfig.auth().onAuthStateChanged(user => {
            if (user) {
                this.state.isUser = true;
            } else {
                this.state.isUser = false;
            }
        })

    }
    
    render() {
        return (
            <div>
                <h1 >
                    Home Page
                </h1>
            </div>
        );
    }
}

export default Home;
