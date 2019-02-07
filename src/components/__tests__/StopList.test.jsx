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
import StopList from '../StopList';

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
            <StopList/>
        </Provider>
    );
});

test('loads correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('render stops list', () => {
    const { getByText } = wrapper;
    //const li = wrapper.getByText('Test error');
    expect(getByText(TEST_LOCATION)).toBeVisible();
});