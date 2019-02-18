import { combineReducers } from 'redux';

import StopReducer from './StopReducer';
import GoogleMapReducer from './GoogleMapReducer';

export default combineReducers({
    stop: StopReducer,
    map: GoogleMapReducer
});