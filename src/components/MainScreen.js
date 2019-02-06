import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'simple-flexbox';
import { YMaps } from 'react-yandex-maps';

import MapScreen from './MapScreen';
import Stop from './Stop';

class MainScreen extends Component {
    render() {
        return (
            <Row>
                <Column flexGrow={1} horizontal="start">
                    <Stop/>
                </Column>
                <Column flexGrow={1}>
                    <MapScreen/>
                </Column>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(MainScreen);