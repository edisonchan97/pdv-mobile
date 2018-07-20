import * as types from './action-type';

//登录
export const login = () => {
    return {
        type: types.LOGIN
    }
}

//初始化
export const init = (info) => {
    return {
        type: types.INIT,
        payload: null
    }
}

//退出登录 清空session
export const logout = () => {
    sessionStorage.removeItem('mobile')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('_accessToken')
    sessionStorage.removeItem('password')
    return {
        type:'LOGOUT'
    }
}