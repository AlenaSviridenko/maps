import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    GET_STOPS
} from '../actions/types';
import swap from '../helpers/swap';

const INITIAL_STATE = {
    stops: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_STOP:
            return {
                ...state,
                stops: [...state.stops, action.payload.address]
            };
        case REMOVE_STOP:
            return {
                ...state,
                stops: state.stops.filter((stop, index) => action.payload.index !== index)
            };
        case MOVE_STOP:
            return {
                ...state,
                stops: swap(state.stops, action.payload.from, action.payload.to)
            };
        case GET_STOPS:
            return state;
        default:
            return state;
    }
}