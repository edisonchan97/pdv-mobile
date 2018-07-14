# 此目录用于存放app（page）
# 要求每个app可以单独运行
# 规范
- app目录，包括
- index.js 入口
- style.less 样式
- action-type.js 使用Symbol()消除魔术字符串，为了便于调试log数据，要加参数
- action.js 尽量简洁，不要有太多的逻辑，复杂的逻辑放到index.js中，调用接口等也放到index.js中
- reducer.js
- api.js 接口文件
- mock.js 本地模拟数据
- 路由 apps/[模块]/[app名称]/XX
- common文件夹中存放公共的acton,state操作，比如loading、alert、