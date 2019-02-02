import axios from 'axios';

import {
    ADD_STOP,
    REMOVE_STOP,
    MOVE_STOP,
    GET_STOPS,
    GET_ADDRESS_ERROR
} from './types';

export const getStops = () => {
    return {
        type: GET_STOPS
    }
};

export const addStop = async (address, dispatch) => {
    dispatch({type: ADD_STOP})
    const response = await window.ymaps.geocode(address);
    const result = response.geoObjects.get(0);
    const precision = result.properties.get('metaDataProperty.GeocoderMetaData.precision');

    if (precision !== 'exact') {
        dispatch({
            type: GET_ADDRESS_ERROR,
            payload: { error: 'Адрес неточный. Пожалуйста, введите более конкретный адрес.' }
        });
    }

    const coordinates = result.geometry._coordinates;

    dispatch({
        type: ADD_STOP,
        payload: { address, coordinates }
    })
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