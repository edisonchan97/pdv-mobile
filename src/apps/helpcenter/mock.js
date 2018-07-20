import Mock from 'mockjs';

//mock基本模板
export const data = Mock.mock('http://g.cn/v1/test', 'get', function (options) {
    return {
        data: {

        },
        http_code: 200
    }
})

export const data2 = Mock.mock('http://g.cn/v1/test2', 'post', function (options) {
    return {
        data: {

        },
        http_code: 200
    }
})