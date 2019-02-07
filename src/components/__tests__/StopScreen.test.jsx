import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import axiosMock from 'axios';
import thunk from 'redux-thunk';
import {
    render,
    fireEvent,
    cleanup,
    wait,
    waitForElement,
    getByTitle
} from 'react-testing-library';
import 'jest-dom/extend-expect';

import reducers from '../../reducers';
import StopScreen from '../StopScreen';

const TEST_LOCATION = 'Moscow';
const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const store = createStore(reducers, {
    stop: {
        stops: [
            {
                text: TEST_LOCATION,
                coordinates: {
                    lat: 55.75222,
                    lng: 37.6155
                }
            }
        ],
        error: 'Test error'
    }
}, enhancer);

jest.mock('axios');
console.error = jest.fn();

let wrapper;

afterEach(() => {
    cleanup();
});

beforeEach(() => {
    wrapper = render(
        <Provider store={store}>
            <StopScreen/>
        </Provider>
    );
});

test('loads correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('text in input can be changed', () => {
    const input = wrapper.getByValue('');

    fireEvent.change(input, { target: { value: TEST_LOCATION } });

    expect(input.value).toEqual(TEST_LOCATION);
});

test('render error', () => {
    const { getByText } = wrapper;
    expect(getByText('Test error')).toBeVisible();
});

test('calls addStop on enter', async () => {
    const input = wrapper.getByValue('');

    fireEvent.change(input, { target: { value: TEST_LOCATION } });
    fireEvent.keyPress(input, { charCode: 13 });
    axiosMock.get.mockResolvedValueOnce(() => Promise.resolve({
        data: {
            status: 'OK',
            results: [
                {
                    geometry: {
                        location: {
                            lat: 57,
                            lng: 37
                        }
                    }
                }
            ]
        }
    }));

    await wait(() => expect(axiosMock.get).toHaveBeenCalledTimes(1));
});