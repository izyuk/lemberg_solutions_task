import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/styles';
// import {ListSubheader} from '@material-ui/core';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
// import ExpandMore from 'material-ui-icons/ExpandMore';
// import {Divider} from '@material-ui/core';
// import json

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: 'red',
    },
    nested: {
        paddingLeft: 10,
    },
});

function getItems() {
    var json = {
        "time": "1564148682550",
        "value": {
            "sensors": [
                {
                    "name": "front-sensor-1",
                    "temperature": 24,
                    "humidity": 5,
                    "powerConsumption": 70
                },
                {
                    "name": "front-sensor-2",
                    "temperature": 14,
                    "humidity": 3,
                    "powerConsumption": 50
                },
                {
                    "name": "Sensors of back-plc-1",
                    "temperature": 14,
                    "powerConsumption": 50,
                    "spindle": {
                        "speed": 100,
                        "feedRate": 30
                    },
                    "sensors": [
                        {
                            "name": "front-nested-123",
                            "temperature": 24,
                            "humidity": 5,
                            "powerConsumption": 70
                        },
                        {
                            "name": "front-nested-231",
                            "temperature": 14,
                            "humidity": 3,
                            "powerConsumption": 50
                        }
                    ]
                },
                {
                    "name": "back-plc-2",
                    "temperature": 30,
                    "powerConsumption": 90,
                    "spindle": {
                        "speed": 200,
                        "feedRate": 50
                    },
                    "gripSensor": {
                        "pressure": 50,
                        "temperature": 30,
                        "led": {
                            "power": true,
                            "powerConsumption": 3
                        }
                    }
                },
                {
                    "name": "Expand to find more sensors",
                    "sensors": [
                        {
                            "name": "front-nested-1",
                            "temperature": 24,
                            "humidity": 5,
                            "powerConsumption": 70
                        },
                        {
                            "name": "front-nested-2",
                            "temperature": 14,
                            "humidity": 3,
                            "powerConsumption": 50
                        },
                        {
                            "name": "Expand to find much more sensors",
                            "sensors": [
                                {
                                    "name": "front-nested-123",
                                    "temperature": 24,
                                    "humidity": 5,
                                    "powerConsumption": 70
                                },
                                {
                                    "name": "front-nested-231",
                                    "temperature": 14,
                                    "humidity": 3,
                                    "powerConsumption": 50
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };
    return json;
}

class NestedList extends React.Component {
    state = {};
    handleClick = (e) => {
        this.setState({[e]: !this.state[e]});
    };

    magicKey = 'sensors';

    recursiveMapping(object, i){
        return (
            object[this.magicKey] ?
                <div key={i}>
                    <ListItem component={'li'} button
                              onClick={this.handleClick.bind(this, object.name)}>
                        <ListItemText primary={object.name}/>
                        {this.state[object.name] ? (
                            <ExpandLess/>
                        ) : (
                            <ExpandMore/>
                        )}
                    </ListItem>
                    <Collapse
                        key={i}
                        in={this.state[object.name]}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List disablePadding>
                            { object[this.magicKey] && object[this.magicKey].map((item, i) => this.recursiveMapping(item, i))}
                        </List>
                    </Collapse>
                </div> :
                <ListItem
                    button
                    onClick={this.handleClick.bind(this, object.name)}
                    key={i}
                >
                    <ListItemText primary={object.name}/>
                </ListItem>
        )
    };

    render() {
        const items = getItems();
        return (
            <div>
                {items.value[this.magicKey].map((item, i) => item && this.recursiveMapping(item, i))}
            </div>
        );
    }
}

export default NestedList;