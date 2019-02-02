import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Placemark, YMaps, GeoObject } from 'react-yandex-maps';

class MapScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            marks: []
        }
    }

    handleApiAvailable(ymaps) {
        window.ymaps = ymaps;
        ymaps.load(() => {
            const suggestView = new ymaps.SuggestView('suggest', {
                results: 10,
            });
        });
    }

    async renderGeomarks() {
        this.setState({ marks: this.props.stops.map((stop, index) => {
            return <GeoObject
                options={{
                    draggable: true
                }}
                properties={{
                    balloonContent: stop.text
                }}
                geometry={{
                    type: 'Point',
                    coordinates: stop.coordinates,
                }}
            />
        })
        });
    }

    render() {
        return (
            <YMaps>
                <Map
                    onLoad={(ymaps) => this.handleApiAvailable(ymaps)}
                    state={{ center: [55.76, 37.64], zoom: 10 }}
                >
                    {this.state.marks}
                </Map>
            </YMaps>
        )
    }
}

const mapStateToProps = ({ stop }) => {
    const { stops } = stop;
    return { stops };
};

export default connect(mapStateToProps)(MapScreen);