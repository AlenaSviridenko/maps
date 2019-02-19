import React from 'react';

import MapComponent from './MapComponent';
import config from '../config/config.json';

const MapScreen = () => {
    return (
        <MapComponent
            googleMapURL={config.googleMapApiUrl}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
        />
    )
};

export { MapScreen }