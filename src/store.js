import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import logger from './middleware/logger';

export default function configureStore(state) {

    const middlewares = [logger, thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(reducers, state, middlewareEnhancer);
}