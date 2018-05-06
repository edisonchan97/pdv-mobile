import * as types from './action-type';

let defaultState = {
    isLogin:false
}
//用户信息
 const userData = (state = defaultState , action = {}) => {
  switch(action.type){
    case types.LOGIN:
      return {...state, isLogin:true};
    default:
      return state;
  }
}

export default userData;