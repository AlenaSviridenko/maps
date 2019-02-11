import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ListItem } from './ListItem';
import * as StopActions from '../actions';

class StopList extends Component {

    constructor(props) {
        super(props);
        const { dispatch } = props;

        bindActionCreators(StopActions, dispatch);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onRemoveStop = this.onRemoveStop.bind(this);
    }

    onDragStart = (index) => this.draggedItem = this.props.stops[index];

    onDragEnter(index) {
        const draggedOverItem = this.props.stops[index];

        if (this.draggedItem === draggedOverItem) {
            return;
        }

        const that = this;
        let items = this.props.stops.filter(item => item !== that.draggedItem);

        // inserting draggable item over the current item
        items.splice(index, 0, this.draggedItem);
        this.props.dispatch(StopActions.moveStop({ stops: items }));
    }

    onDragEnd = () => this.draggedItem = null;

    onRemoveStop = (index) => this.props.dispatch(StopActions.removeStop(index));

    render() {
        const { stops } = this.props;
        return (
            <ul>{
                stops.map((stop, index) =>
                    <ListItem
                        key={index}
                        text={stop.text}
                        onDragStart={() => this.onDragStart(index)}
                        onDragEnter={() => this.onDragEnter(index)}
                        onDragEnd={this.onDragEnd}
                        onRemove={() => this.onRemoveStop(index)}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops } = stop;
    return { stops };
};

export default connect(mapStateToProps)(StopList);