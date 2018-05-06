import * as home from './action-type';

let defaultState = {
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
  selectedProList:[],//已选择的产品
  dataList:[],//全部产品
}
// 首页表单数据
 const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.SAVEFORMDATA:
      return {...state, ...{[action.datatype]: action.value}};
    case home.SAVEIMG:
      return {...state, ...{imgpath: action.path}};
    case home.CLEARDATA:
      return {...state, ...defaultState};
    default:
      return state;
  }
}

export default formData;