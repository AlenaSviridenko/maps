import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const ListItem = ({ text, onRemove, key, onDragStart, onDragOver, onDragEnd }) => {
    return (
        <li key={key} >
            <div className="inputStop"
                 draggable
                 onDragStart={onDragStart}
                 onDragOver={onDragOver}
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