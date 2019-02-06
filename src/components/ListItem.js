import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const ListItem = ({ text, onRemove, key }) => {
    return (
        <li key={key}>
            <div className="inputStop">
                <span>{text}</span>
                <span onClick={onRemove}>
                    <FaRegTrashAlt/>
                </span>
            </div>
        </li>
    )
};

export { ListItem };