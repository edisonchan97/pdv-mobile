import { combineReducers } from 'redux';
import formData from '@/apps/home/reducer';
import proData from '@/apps/production/reducer';
//创建app后将app中的reducer增加
const rootReducer = combineReducers({
    formData,
    proData
});

export default rootReducer