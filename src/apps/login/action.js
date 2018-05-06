import * as types from './action-type';

export const login = () => {
    return {
        type: types.LOGIN
    }
}

export const init = (info) => {
    return {
        type: types.INIT,
        payload: null
    }
}

