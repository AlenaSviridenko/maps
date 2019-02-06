import axios from 'axios';

import config from '../config/config.json';
import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    UPDATE_STOP,
    GET_ADDRESS_ERROR,
    IN_PROCESS
} from './types';
import { ERRORS, NO_RESULTS } from '../config/constants';

export const updateStop = ({ newCoordinates, index }) => {
    return (dispatch) => {
        dispatch({ type: IN_PROCESS });
        const coordinatesString = newCoordinates.lat.toString().concat(',', newCoordinates.lng.toString());

        return axios.get(config.geocoderApi.replace('{INFO}', coordinatesString).replace('{TYPE}', 'latlng'))
            .then((response) => {

                if (response.data.status === NO_RESULTS) {
                    dispatch({
                        type: GET_ADDRESS_ERROR,
                        payload: { error: ERRORS.addressNotFound }
                    });
                    return;
                }

                if (response.data.results
                    && response.data.results[0]
                    && response.data.results[0].formatted_address) {

                    const formattedAddress = response.data.results[0].formatted_address;

                    dispatch({
                        type: UPDATE_STOP,
                        payload: {
                            index,
                            newAddress: {
                                text: formattedAddress,
                                coordinates: newCoordinates
                            }
                        }
                    })
                }
            });
    };
};

export const addStop = (address) => {
    return (dispatch) => {
        dispatch({ type: IN_PROCESS });

        return axios.get(config.geocoderApi.replace('{INFO}', address).replace('{TYPE}', 'address'))
            .then((response) => {

                if (response.data && response.data.status === NO_RESULTS) {
                    dispatch({
                        type: GET_ADDRESS_ERROR,
                        payload: { error: ERRORS.notPreciseAddress }
                    });
                    return;
                }

                if (response.data.results
                    && response.data.results[0]
                    && response.data.results[0].geometry
                    && response.data.results[0].geometry.location) {

                    const coordinates = response.data.results[0].geometry.location;
                    const formattedAddress = response.data.results[0].formatted_address;

                    dispatch({
                        type: ADD_STOP,
                        payload: { address: formattedAddress, coordinates }
                    })
                }
            });
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