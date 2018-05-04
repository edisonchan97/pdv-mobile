import { combineReducers } from 'redux';
import counter from './counter';
import todoList from './todoList';
import message from './message';
import product from './product';
import detail from './detail';
import shopcar from './shopcar';
import user from './user';

//--将pages中的reducer
const rootReducer = combineReducers({
    counter,
    todoList,
    message,
    product,
    detail,
    shopcar,
    user
});

export default rootReducer