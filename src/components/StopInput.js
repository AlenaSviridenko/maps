import React from 'react';

const StopInput = ({ placeholder, onEnter, onTextChange, value }) => {
    return (
       <input
           id="suggest"
           placeholder={placeholder}
           onKeyPress={onEnter}
           onChange={onTextChange}
           value={value}
       />
    )
};

export { StopInput };