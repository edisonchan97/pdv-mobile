import { combineReducers } from 'redux';
import formData from '@/apps/home/reducer';
import proData from '@/apps/production/reducer';
import userData from '@/apps/login/reducer';
import common from '@/apps/common/reducer';
//创建app后将app中的reducer增加
const rootReducer = combineReducers({
    formData,
    proData,
    userData,
    common
});

export default rootReducer