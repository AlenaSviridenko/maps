import { combineReducers } from 'redux';

import StopReducer from './StopReducer';

export default combineReducers({
    stop: StopReducer
});