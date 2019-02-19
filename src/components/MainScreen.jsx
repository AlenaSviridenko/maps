import React from 'react';
import { Row, Column } from 'simple-flexbox';

import { MapScreen } from './MapScreen';
import StopScreen from './StopScreen';

const MainScreen = () => {
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

export { MainScreen };