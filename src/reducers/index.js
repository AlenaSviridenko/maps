import { combineReducers } from 'redux';

import MapReducer from './MapReducer';
import PathReducer from './PathReducer';
import StopReducer from './StopReducer';

export default combineReducers({
    map: MapReducer,
    path: PathReducer,
    stop: StopReducer
});