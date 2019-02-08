import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'simple-flexbox';

import MapScreen from './MapScreen';
import StopScreen from './StopScreen';

class MainScreen extends Component {
    render() {
        return (
            <Row>
                <Column flexGrow={1} horizontal="start">
                    <StopScreen/>
                </Column>
                <Column flexGrow={4}>
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