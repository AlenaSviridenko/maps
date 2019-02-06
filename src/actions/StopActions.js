import axios from 'axios';

import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    GET_STOPS
} from './types';

export const getStops = () => {
    return {
        type: GET_STOPS
    }
};

export const addStop = (address) => {
    return {
        type: ADD_STOP,
        payload: { address }
    }
};

export const removeStop = (index) => {
    return {
        type: REMOVE_STOP,
        payload: { index }
    }
};

export const moveStop = ({ from, to }) => {
    return {
        type: MOVE_STOP,
        payload: { from, to }
    }
};