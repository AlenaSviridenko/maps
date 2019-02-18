import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    UPDATE_STOP
} from './types';

export const updateStop = ({ index, lat, lng }) => {
    return {
        type: UPDATE_STOP,
        payload: { index, coordinates: { lat, lng } }
    }
};

export const addStop = ({name, lat, lng}) => {
    return {
        type: ADD_STOP,
        payload: { address: name, coordinates: { lat, lng } }
    };
};

export const removeStop = (index) => {
    return {
        type: REMOVE_STOP,
        payload: { index }
    }
};

export const moveStop = ({ stops }) => {
    return {
        type: MOVE_STOP,
        payload: { stops }
    }
};