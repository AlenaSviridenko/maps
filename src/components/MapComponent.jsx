/* global google */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';
import { connect } from 'react-redux';

import { ROUTE_STYLES, DEFAULT_CENTER } from '../config/constants';
import { changeCenter, updateStop } from '../actions';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;

        this.onDragEnd = this.onDragEnd.bind(this);
        this.createRef = this.createRef.bind(this);
        this.onCenterChanged = this.onCenterChanged.bind(this);
        this.markerRefs = [];
        this.mapRef = React.createRef();

        bindActionCreators({ changeCenter, updateStop }, dispatch);

        this.state = {
            markerClicked: -1
        };
    }

    componentDidMount() {
        this.onCenterChanged();
    }

    onCenterChanged() {
        const currentCenter = this.mapRef.current.getCenter().toJSON();
        this.props.dispatch(changeCenter(currentCenter));
    }

    buildRoute() {
        return this.props.stops.map((stop) => {
            return this.createPoint(stop.coordinates.lat, stop.coordinates.lng);
        });
    };

    toggleOpen = (index) => this.setState({ markerClicked: index });

    createRef = (ref) => this.markerRefs.push(ref);

    createPoint = (lat, lng) => new google.maps.LatLng(lat, lng);

    onDragEnd(index) {
        const { lat, lng } = this.markerRefs[index].getPosition().toJSON();
        this.props.dispatch(updateStop({index, lat, lng }));
    };

    renderPolyline() {
        if (this.props.stops.length < 2) {
            return;
        }

        const path = this.buildRoute();

        return <Polyline
            path={path}
            geodesic
            options={ROUTE_STYLES}
        />
    }

    renderMarkers() {
        const { stops } = this.props;

        // change center to stop only for the first one
        if (stops.length === 1) {
            this.mapRef.current.panTo(stops[0].coordinates);
        }

        return stops.map((stop, i) => <Marker
            draggable
            key={i}
            onClick={() => this.toggleOpen(i)}
            position={stop.coordinates}
            label={(i + 1).toString()}
            onDragEnd={() => this.onDragEnd(i)}
            ref={this.createRef}>
            {
                this.state.markerClicked === i && <InfoWindow onCloseClick={() => this.toggleOpen(-1)}>
                    <div>{stop.text}</div>
                </InfoWindow>
            }
        </Marker>);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                ref={this.mapRef}
                onCenterChanged={this.onCenterChanged}
                defaultCenter={DEFAULT_CENTER}>
                {this.renderPolyline()}
                {this.renderMarkers()}
            </GoogleMap>
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops } = stop;
    return { stops };
};

export default connect(mapStateToProps)(withScriptjs(withGoogleMap(MapComponent)))