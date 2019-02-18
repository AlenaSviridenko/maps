import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import StopScreen from '../StopScreen';
import configureStore from '../../store';

describe('Stop Screen component', () => {
    const initialState = {
        stop: {
            stops: []
        },
        map: {
            lat: 55.75222,
            lng: 37.6155
        }
    };
    const store = configureStore(initialState);
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <StopScreen/>
            </Provider>
        ).find('StopScreen');
    });

    it('renders without crashing', () => {
        shallow(<StopScreen/>)
    });

    it('contains input', () => {
        expect(wrapper.exists('input')).toBeTruthy();
    });

    it('should app stop on enter', () => {
        wrapper.instance().onTextChange('test');
        wrapper.instance().onEnter({ charCode: 13 });
        expect(wrapper.instance().props.stops).toHaveLength(1);
    })
});