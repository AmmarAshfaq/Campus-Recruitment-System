import React from 'react';
import Dialog from 'material-ui/Dialog';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';


export default class InfoDialog extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {/* <RaisedButton label="Dialog" onClick={this.handleOpen} /> */}
                <Dialog
                    title="Dialog With Actions"
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleOpen}
                >
                    <h2>Name: {this.props.name}</h2>
                    <h2>Department: {this.props.department}</h2>
                    <h2>CGPA: {this.props.cgpa}</h2>
                    <h2>Semester: {this.props.semester}</h2>
                    
                    
                </Dialog>
            </div>
        );
    }
}