import {
    CHANGE_CENTER
} from '../actions/types';

const INITIAL_STATE = {
    lat: 0,
    lng: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_CENTER:
            return {
                ...state,
                lat: action.payload.coordinates.lat,
                lng: action.payload.coordinates.lng
            };
        default:
            return state;
    }
}