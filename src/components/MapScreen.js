import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Placemark, YMaps, GeoObject } from 'react-yandex-maps';

class MapScreen extends Component {

    onApiAvaliable(ymaps) {
        ymaps.load(() => {
            const suggestView = new ymaps.SuggestView('suggest', {
                results: 10,
            });
        });
    }

    render() {
        return (
            <YMaps onApiAvaliable={ymaps => this.onApiAvaliable(ymaps).bind(this)}>
                <Map state={{ center: [55.76, 37.64], zoom: 10 }}>
                    <GeoObject
                        options={{
                            draggable: true
                        }}
                        properties={{
                            balloonContent: 'я балун',
                            hintContent: 'content'
                        }}
                        geometry={{
                            type: 'Point',
                            coordinates: [55.76, 37.64],
                        }}
                    />
                </Map>
            </YMaps>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(MapScreen);