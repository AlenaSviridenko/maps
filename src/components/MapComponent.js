import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose } from 'redux';

const MapComponent = withScriptjs(withGoogleMap(({ stops }) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 55.75222, lng: 37.6155 }}
    >
        {
            stops.map(coordinates => <Marker draggable position={coordinates} />)
        }
    </GoogleMap>
));

export { MapComponent }