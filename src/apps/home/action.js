import * as types from './action-type';

// 保存表单数据
export const saveFormData = (value, datatype) => {
  return {
    type: types.SAVEFORMDATA,
    value,
    datatype,
  }
}

// 保存图片地址
export const saveImg = path => {
  return {
    type: types.SAVEIMG,
    path,
  }
}

// 保存图片地址
export const clearData = () => {
  return {
    type: types.CLEARDATA,
  }
}
