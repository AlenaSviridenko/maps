/* global google */

import React, { Component } from 'react';
import {withGoogleMap, withScriptjs, GoogleMap, Marker, DirectionsRenderer, InfoWindow } from 'react-google-maps';

class MapComponent extends Component {
    constructor() {
        super();

        this.state = {
            directions: {},
            notEnoughStops: false,
            markerClicked: -1
        };
    }

    componentDidUpdate() {
        const DirectionsService = new google.maps.DirectionsService();
        const { stops } = this.props;
        const stopsLength = stops.length;
        let origin, destination, waypoints = [];

        if (stopsLength < 2) {
            if (!this.state.notEnoughStops) {
                this.setState({ directions: null, notEnoughStops: true });
            }
        }

        if (stopsLength > 1) {
            origin = this.createPoint(stops[0].coordinates.lat, stops[0].coordinates.lng);
            destination = this.createPoint(stops[stopsLength - 1].coordinates.lat, stops[stopsLength - 1].coordinates.lng);

            for(let i = 1; i < stopsLength - 1; i++) {
                waypoints.push({
                    location: this.createPoint(stops[i].coordinates.lat, stops[i].coordinates.lng),
                    stopover: true
                });
            }

            DirectionsService.route({
                origin,
                destination,
                waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        notEnoughStops: false
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    }

    toggleOpen (index) {
        this.setState({ markerClicked: index });
    }

    createPoint = (lat, lng) => new google.maps.LatLng(lat, lng);

    renderMarkers() {
        const { stops } = this.props;

        return stops.map((stop, i) => <Marker
            draggable
            key={i}
            onClick={() => this.toggleOpen(i)}
            position={stop.coordinates}>
            {this.state.markerClicked === i && <InfoWindow onCloseClick={() => this.toggleOpen(-1)}>
                <div>{stop.text}</div>
            </InfoWindow>}
        </Marker>);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 55.75222, lng: 37.6155 }}>
                {!this.state.notEnoughStops && <DirectionsRenderer
                    options={{draggable: true}}
                    directions={this.state.directions}
                />}
                {this.state.notEnoughStops && this.renderMarkers()}
            </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MapComponent))