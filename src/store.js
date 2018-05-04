import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
//import createLogger from 'redux-logger';

let middlewares = [
    thunk
];
//const logger = createLogger();
//middlewares.push(logger);

export default function configureStore(initialState) {
    const store = applyMiddleware(
        ...middlewares
    )(createStore)(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(nextReducer)
        })
    }
    return store
}