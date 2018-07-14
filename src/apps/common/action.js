import * as types from './action-type';
//loading
export const handleLoading = (value) => {
    return {
        type: types.LOADING,
        paload: value
    }
}