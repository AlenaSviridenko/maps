import React from 'react';

import { ListItem } from './ListItem';

const StopList = ({ source, onRemove }) => {
    return (
        <ul>{
            source.map((stop, index) =>
                <ListItem
                    key={index}
                    text={stop}
                    onRemove={() => onRemove(index)}
                />
            )}
        </ul>
    )
};

export { StopList };