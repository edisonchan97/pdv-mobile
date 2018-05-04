import { combineReducers } from 'redux';
import home from '@/apps/home/reducer';
import production from '@/apps/production/reducer';
//创建app后将app中的reducer增加
const rootReducer = combineReducers({
    formData:home,
    proData:production
});

export default rootReducer