import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';


class Lists extends React.Component {
    render() {
        return (
            <div>
                <List>
                    {
                        this.props.allStudent.map(eachUser => {
                            return (
                                <ListItem onClick={()=>{this.props._onClick(eachUser)}}>
                                    Student Name: {' '}
                                    {eachUser.name}
                                </ListItem>
                            )
                        })

                    }
                </List>


            </div>
        )
    }
}
export default Lists;