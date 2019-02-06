import React from 'react';

const StopInput = React.forwardRef(({ placeholder, onEnter, onTextChange, value }, ref) => {
    return (
       <input
           placeholder={placeholder}
           onKeyPress={onEnter}
           ref={ref}
           onChange={onTextChange}
           value={value}
       />
    )
});

export { StopInput };