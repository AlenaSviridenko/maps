import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import StopScreen from '../StopScreen';
import configureStore from '../../store';

const store = configureStore();

describe('Stop Screen component', () => {
    it('renders without crashing', () => {
        shallow(<StopScreen/>)
    });

    it('contains Stop input', () => {
        const wrapper = mount(
            <Provider store={store}>
                <StopScreen/>
            </Provider>
        ).find('Connect(StopScreen)');
        expect(wrapper.contains(<input placeholder="Новая точка маршрута" value=""/>)).toBeTruthy();
    });
});