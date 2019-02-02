import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import logger from './middleware/logger';

export default function configureStore(state) {

    const middlewares = [logger, thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    return createStore(reducers, state, middlewareEnhancer);
}