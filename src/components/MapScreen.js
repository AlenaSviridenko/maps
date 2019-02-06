import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapComponent from './MapComponent';
import { updateStop } from '../actions';
import config from '../config/config.json';

class MapScreen extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        bindActionCreators(updateStop, dispatch);
    }

    render() {
        return (
            <MapComponent
                stops={this.props.stops}
                stopRemoved={this.props.stopRemoved}
                updateStop={(newCoordinates, index) => this.props.dispatch(updateStop({ newCoordinates, index }))}
                googleMapURL={config.googleMapApiUrl}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops, stopRemoved } = stop;
    return { stops, stopRemoved };
};

export default connect(mapStateToProps)(MapScreen);