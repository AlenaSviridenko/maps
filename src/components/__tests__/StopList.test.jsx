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
const INITIAL_STATE = {
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
};

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const store = createStore(reducers, INITIAL_STATE, enhancer);

jest.mock('axios');
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
    expect(getByText(TEST_LOCATION)).toBeVisible();
});

test('removes item on trash icon click', () => {
    const icon = wrapper.getByTitle('removeIcon');

    fireEvent.click(icon);

    expect(() => { wrapper.getByText(TEST_LOCATION); }).toThrowError(/Unable to find an element with the text/);
});

test('removes item on trash icon click', () => {
    const icon = wrapper.getByTitle('removeIcon');

    fireEvent.click(icon);

    expect(() => { wrapper.getByText(TEST_LOCATION); }).toThrowError(/Unable to find an element with the text/);
});

test('reordering list on Drag', () => {
    const customState = {
        ...INITIAL_STATE,
        stop: {
            stops: [...INITIAL_STATE.stop.stops, { text: 'Yaroslavl', coordinates: { lat: 57.37, lng: 39.52 }}]
        }
    };
    const customStore = createStore(reducers, customState, enhancer);
    const customWrapper = render(
        <Provider store={customStore}>
            <StopList/>
        </Provider>
    );
    const item = customWrapper.getByTestId('Yaroslavl');
    fireEvent.dragStart(item);
    fireEvent.dragEnter(item, { index: 0 });
    fireEvent.dragEnd(item);

    console.log(customWrapper.debug());

    expect(() => { wrapper.getByText(TEST_LOCATION); }).toThrowError(/Unable to find an element with the text/);
});