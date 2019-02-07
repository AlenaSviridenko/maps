import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    GET_STOPS,
    GET_ADDRESS_ERROR,
    IN_PROCESS
} from '../actions/types';
import swap from '../helpers/swap';

const INITIAL_STATE = {
    stops: [],
    error: '',
    inProcess: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_STOP:
            return {
                ...state,
                stops: [...state.stops, { text: action.payload.address, coordinates: action.payload.coordinates }]
            };
        case IN_PROCESS:
            return {
                ...state,
                inProcess: !state.inProcess,
                error: ''
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
        case GET_ADDRESS_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case GET_STOPS:
            return state;
        default:
            return state;
    }
}