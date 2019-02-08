import React, { Component } from 'react';

import { ListItem } from './ListItem';

class StopList extends Component {

    constructor(props) {
        super(props);

        this.state = { stops: [] }
    }

    componentDidMount() {
        this.setState({ stops: this.props.stops })
    }

    onDragStart(index) {
        this.draggedItem = this.state.stops[index];
    }

    onDragOver(index) {
        const draggedOverItem = this.state.stops[index];

        if (this.draggedItem === draggedOverItem) {
            return;
        }

        let items = this.state.stops.filter(item => item !== this.draggedItem);

        items.splice(index, 0, this.draggedItem);

        this.setState({ stops: items});
    }

    onDragEnd() {
        this.draggedItem = null;
    }

    render() {
        const { stops, onRemove } = this.props;
        return (
            <ul>{
                stops.map((stop, index) =>
                    <ListItem
                        key={index}
                        text={stop.text}
                        onDragStart={() => this.onDragStart(index)}
                        onDragOver={() => this.onDragOver(index)}
                        onDragEnd={this.onDragEnd}
                        onRemove={() => onRemove(index)}
                    />
                )}
            </ul>
        )
    }
}

export default StopList;