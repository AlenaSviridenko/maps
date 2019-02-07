import axios from 'axios';

import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    GET_STOPS,
    GET_ADDRESS_ERROR,
    IN_PROCESS
} from './types';

const geocoderApi = 'https://maps.googleapis.com/maps/api/geocode/json?address={ADDRESS}&key=AIzaSyAQ-oUhp2w6CfcVdcR5a17y1V-W76HEFIg';

export const getStops = () => {
    return {
        type: GET_STOPS
    }
};

export const addStop = (address) => {
    return (dispatch) => {
        dispatch({ type: IN_PROCESS });

        return axios.get(geocoderApi.replace('{ADDRESS}', address))
            .then((response) => {

                if (response.data.status === 'ZERO_RESULTS') {
                    dispatch({
                        type: GET_ADDRESS_ERROR,
                        payload: { error: 'Адрес неточный. Пожалуйста, введите более конкретный адрес.' }
                    });
                    return;
                }
                const coordinates = response.data.results[0].geometry.location;

                dispatch({
                    type: ADD_STOP,
                    payload: { address, coordinates }
                })

            });
    };
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