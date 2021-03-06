/*
* 修饰器的使用
* 带有两个参数的decorator 第一个参数代表methods 第二个参数代表class
* 为class扩展方法（将方法扩展到class的prototype中）
* @param {object} methods 包含多个方法的对象
* @target {class} 目标class
* @return 不改变原class功能的基础上，进行拓展
*/
export default methods => {
  return target => {
    Object.assign(target.prototype, methods);
  }
}


//这个方法不一定写到这里 对decorator不起作用 
/**
 * 字符串填充函数
 * @param  {string} value      目标字符串
 * @param  {array} position 需要填充的位置
 * @param  {string} padstr   填充字符串
 * @return {string}          返回目标字符串
 */
export const padStr = (value, position, padstr, inputElement) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value = value.substring(0, item + index) + padstr + value.substring(item + index)
    }
  })
  value = value.trim();
  // 解决安卓部分浏览器插入空格后光标错位问题
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length); 
  })
  return value;
}

