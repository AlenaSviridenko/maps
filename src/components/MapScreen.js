import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapComponent from './MapComponent';

class MapScreen extends Component {
    render() {
        return (
            <MapComponent
                stops={this.props.stops}
                stopRemoved={this.props.stopRemoved}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ-oUhp2w6CfcVdcR5a17y1V-W76HEFIg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops, stopRemoved } = stop;
    return { stops, stopRemoved };
};

export default connect(mapStateToProps)(MapScreen);