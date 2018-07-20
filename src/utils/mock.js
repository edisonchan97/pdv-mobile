import Mock from 'mockjs';

// export default Mock.mock('http://g.cn', {

//           'name'    : '@name',

//           'age|1-100': 100,

//           'color'    : '@color'

// });

export const data= Mock.mock('http://g.cn', 'get', function(options) {
    return {
                  'name'    : '@name',

          'age|1-100': 100,

          'color'    : '@color'
    }
})

export const data2= Mock.mock(/\.json/, 'post', function(options) {
    return {
                  'name'    : '@name',

          'age|1-100': 100,

          'color'    : '@color'
    }
})