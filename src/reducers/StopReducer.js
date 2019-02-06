import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    UPDATE_STOP,
    GET_ADDRESS_ERROR,
    IN_PROCESS
} from '../actions/types';

const INITIAL_STATE = {
    stops: [],
    error: '',
    inProcess: false,
    stopRemoved: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_STOP:
            return {
                ...state,
                stops: [...state.stops, { text: action.payload.address, coordinates: action.payload.coordinates }],
                stopRemoved: false,
                inProcess: false
            };
        case IN_PROCESS:
            return {
                ...state,
                inProcess: true,
                error: ''
            };
        case REMOVE_STOP:
            return {
                ...state,
                stops: state.stops.filter((stop, index) => action.payload.index !== index),
                stopRemoved: true
            };
        case UPDATE_STOP:
            return {
                ...state,
                stops: state.stops.map((stop, index) =>
                    index !== action.payload.index
                        ? stop
                        : action.payload.newAddress
                )
            };
        case MOVE_STOP:
            return {
                ...state,
                stops: [...action.payload.stops],
                stopRemoved: false
            };
        case GET_ADDRESS_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}