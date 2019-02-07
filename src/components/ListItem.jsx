import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const ListItem = ({ text, onRemove, key, onDragStart, onDragEnter, onDragEnd }) => {
    return (
        <li key={key}>
            <div className="stopItem"
                 draggable
                 onDragStart={onDragStart}
                 onDragEnter={onDragEnter}
                 onDragEnd={onDragEnd}
            >
                <span>{text}</span>
                <span onClick={onRemove}>
                    <FaRegTrashAlt className="icon"/>
                </span>
            </div>
        </li>
    )
};

export { ListItem };