import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { createLogger } from 'redux-logger';
import { setToken } from '@/utils/token';
const logger = createLogger();

let middlewares = [
    thunk
];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}
let initState = {};//通常为服务器给出的初始值window.STATE_FROM_SERVER；如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。

let token = sessionStorage.getItem('_accessToken');
if (token) {
    initState={
        userData:{
            isLogin:true
        }
    }
    setToken(token)
}

//更换皮肤
//let skin = localStorage.getItem('skin') || '#1EB5AD';

export default function configureStore(initialState = initState) {
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