import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import StopList from '../StopScreen';
import configureStore from '../../store';

describe('Stop List component', () => {
    const initialState = {
        stop: {
            stops: [{
                text: 'test1',
                coordinates: {
                    lat: 55.75222,
                    lng: 37.6155
                }
            },
                {
                    text: 'test2',
                    coordinates: {
                        lat: 58.75222,
                        lng: 39.6155
                    }
                }]
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
                <StopList/>
            </Provider>
        ).find('StopList');
    });

    it('renders without crashing', () => {
        shallow(<StopList/>)
    });

    it('has 1 node when 1 stop', () => {
        expect(wrapper.exists('li')).toBeTruthy();
        expect(wrapper.find('li')).toHaveLength(2);
    });

    it('should reorder list on drag&drop', () => {
        wrapper.instance().onDragStart({index: 0});
        wrapper.instance().onDragEnter({index: 1});
        wrapper.instance().onDragEnd();
        wrapper.update();

        const reorderedStops = wrapper.instance().props.stops;
        expect(reorderedStops[0].text).toBe('test2');
        expect(reorderedStops[1].text).toBe('test1');
    });

    it('should remove stop from list', () => {
        wrapper.instance().onRemoveStop({index: 0});
        wrapper.update();
        expect(wrapper.instance().props.stops).toHaveLength(1);
    });
});