import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import data from './data/data';

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
        const items = data;
        return (
            <div>
                {items.value[this.magicKey].map((item, i) => item && this.recursiveMapping(item, i))}
            </div>
        );
    }
}

export default NestedList;