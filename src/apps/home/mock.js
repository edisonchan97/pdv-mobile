import Mock from 'mockjs';

export const data = Mock.mock('http://g.cn/v1/addimg/shop', 'get', function (options) {
    return {
        'name': '@name',

        'age|1-100': 100,

        'color': '@color'
    }
})

export const data2 = Mock.mock(/\.json/, 'post', function (options) {
    return {
        'name': '@name',

        'age|1-100': 100,

        'color': '@color'
    }
})