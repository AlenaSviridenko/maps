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
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onRemoveStop = this.onRemoveStop.bind(this);
    }

    onDragStart = ({ index }) => this.draggedItem = this.props.stops[index];

    onDragEnter({ index }) {
        const draggedOverItem = this.props.stops[index];
        const that = this;

        if (this.draggedItem === draggedOverItem) {
            return;
        }
        let items = this.props.stops.filter(item => item !== that.draggedItem);

        items.splice(index, 0, this.draggedItem);
        this.props.dispatch(StopActions.moveStop({ stops: items }));
    }

    onDragEnd = () => this.draggedItem = null;

    onRemoveStop = ({ index }) => this.props.dispatch(StopActions.removeStop(index));

    render() {
        const { stops } = this.props;
        return (
            <ul>{
                stops.map((stop, index) =>
                    <ListItem
                        index={index}
                        key={index}
                        text={stop.text}
                        onDragStart={this.onDragStart}
                        onDragEnter={this.onDragEnter}
                        onDragEnd={this.onDragEnd}
                        onRemove={this.onRemoveStop}
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