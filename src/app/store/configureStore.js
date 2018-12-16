import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "../reducers/rootReducer";

export const configureStore = (preloadState) => {
    const middlewares = [];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancer = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancer);

    const store = createStore(rootReducer, preloadState, composedEnhancer);

    return store;
}