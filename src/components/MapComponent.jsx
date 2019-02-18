/* global google */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';
import { connect } from 'react-redux';

import { ERRORS, ROUTE_STYLES, DEFAULT_CENTER } from '../config/constants';
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
        this.stops = [];

        bindActionCreators({ changeCenter, updateStop }, dispatch);

        this.state = {
            notEnoughStops: false,
            markerClicked: -1,
            previousStopsCount: 0,
            path: [],
            stops: []
        };
    }

    componentDidMount() {
        this.onCenterChanged();
    }

    onCenterChanged() {
        const currentCenter = this.mapRef.current.getCenter().toJSON();
        this.props.dispatch(changeCenter(currentCenter));
    }

    componentDidUpdate() {
        const { stops } = this.props;
        const stopsLength = stops.length;

        if (stopsLength < 2) {
            // prevent infinite loop of setState -> update component
            if (!this.state.notEnoughStops) {
                this.setState({ notEnoughStops: true });
            }
        }

        // if there is enough stops - build path
        if (stopsLength > 1) {
            const waypoints = this.createWaypoints(stops);
            const origin = this.createPoint(stops[0].coordinates.lat, stops[0].coordinates.lng);
            const destination = this.createPoint(stops[stopsLength - 1].coordinates.lat, stops[stopsLength - 1].coordinates.lng);

            this.buildRoute(origin, destination, waypoints);
        }
    }

    buildRoute(origin, destination, waypoints) {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin,
            destination,
            waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK
                && result.routes && result.routes[0]
                && result.routes[0].overview_path) {

                this.setState({
                    path: result.routes[0].overview_path,
                    notEnoughStops: false
                });
            } else {
                console.error(ERRORS.routeFetchFailed, result);
            }
        });
    }

    createWaypoints(stops) {
        const waypoints = [];
        for(let i = 1; i < stops.length - 1; i++) {
            waypoints.push({
                location: this.createPoint(stops[i].coordinates.lat, stops[i].coordinates.lng),
                stopover: true
            });
        }

        return waypoints;
    }

    toggleOpen = (index) => this.setState({ markerClicked: index });

    createRef = (ref) => this.markerRefs.push(ref);

    createPoint = (lat, lng) => new google.maps.LatLng(lat, lng);

    onDragEnd(index) {
        const { lat, lng } = this.markerRefs[index].getPosition().toJSON();
        this.props.dispatch(updateStop({index, lat, lng }));
    };

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
                {
                    !this.state.notEnoughStops && <Polyline
                        path={this.state.path}
                        geodesic
                        options={ROUTE_STYLES}
                    />
                }
                {this.renderMarkers()}
            </GoogleMap>
        )
    }
}

export default connect()(withScriptjs(withGoogleMap(MapComponent)))