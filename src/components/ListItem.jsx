import React, { Component } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onDragStart() {
        const { index, onDragStart } = this.props;
        onDragStart({ index });
    }

    onDragEnd() {
        const { index, onDragEnd } = this.props;
        onDragEnd({ index });
    }

    onDragEnter() {
        let { index, onDragEnter } = this.props;
        onDragEnter({ index });
    }

    onRemove() {
        let { index, onRemove } = this.props;
        onRemove({ index });
    }

    render() {
        const { index, text } = this.props;
        return (
            <li key={index}>
                <div className="stopItem"
                     draggable
                     onDragStart={this.onDragStart}
                     onDragEnter={this.onDragEnter}
                     onDragEnd={this.onDragEnd}
                     data-testid={text}
                >
                    <span>{text}</span>
                    <span onClick={this.onRemove}>
                    <FaRegTrashAlt className="icon" title="removeIcon"/>
                </span>
                </div>
            </li>
        )
    }
}

export { ListItem };