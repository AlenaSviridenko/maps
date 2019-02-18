import {
    CHANGE_CENTER
} from './types';

export const changeCenter = (coordinates) => {
    return {
        type: CHANGE_CENTER,
        payload: { coordinates }
    };
};