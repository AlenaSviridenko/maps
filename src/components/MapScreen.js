import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MapComponent } from './MapComponent';

class MapScreen extends Component {

   /* getDirectionPoints() {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(41.8507300, -87.6512600),
            destination: new google.maps.LatLng(41.8525800, -87.6514100),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }*/

    render() {
        return (
            <MapComponent
                stops={this.props.stops.map(stop => stop.coordinates)}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ-oUhp2w6CfcVdcR5a17y1V-W76HEFIg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops } = stop;
    return { stops };
};

export default connect(mapStateToProps)(MapScreen);