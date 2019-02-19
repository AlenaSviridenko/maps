import React from 'react';
import { shallow } from 'enzyme';

import { MainScreen } from '../MainScreen';
import StopScreen from '../StopScreen';
import { MapScreen } from '../MapScreen';

describe('Main Screen component', () => {
    it('renders without crashing', () => {
        shallow(<MainScreen/>)
    });

    it('contains both Map Screen and Input Screen', () => {
        const wrapper = shallow(<MainScreen/>);
        expect(wrapper.contains(<StopScreen/>)).toBeTruthy();
        expect(wrapper.contains(<MapScreen/>)).toBeTruthy();
    });
});