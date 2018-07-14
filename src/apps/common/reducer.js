import * as types from './action-type';

const defaultState={
    loading:true
}

const common = (state = defaultState, action = {}) => {
    switch (action.type) {
      case types.LOADING:
        return { ...state, loading: action.paload }
      default:
        return state;
    }
  }

  export default common;