# pdv-mobile （Project Da Vinci）达芬奇计划移动端

- 基于react官方脚手架create-react-app搭建的react+react-redux+es6/7/8+react-router+less开发环境 
- 使用的eject暴露webapck配置方法
- 没有引入ant样式库
- 图标使用阿里图标
- 这是利用react官方的脚手架搭配自己的插件的开发方式， 不暴露配置文件也可以，（为什么要暴露配置文件？）
- 这里列举了一些必备的插件
- 关于异步是使用saga好，还是使用 async+await好？
- 如何评价dva脚手架
- 移动端和pc端的逻辑处理数据处理方面有没有差异
- 以此安装环境以后开发可在此基础之上改进
- 关注新技术，不断进步

## 一、装官方脚手架
```sh
npm install -g create-react-app
```
## 二、创建项目
```sh
create-react-app pdv-mobile
```
## 三、暴露配置文件
```sh
npm run eject
```
##  四、安装必备插件
```sh
npm install axios --save
```
```sh
npm install fastclick --save
```
```sh
npm install immutable --save
```
```sh
npm install prop-types --save
```
```sh
npm install react-addons-css-transition-group --save
```
```sh
npm install react-redux --save
```
```sh
npm install redux-logger --dev--save
```
```sh
npm install react-router-dom --save
```
```sh
npm install redux --save
```
```sh
npm install redux-thunk --save
```
```sh
npm install md5 --save
```
```sh
npm install moment --save
```
```sh
npm install babel-plugin-syntax-dynamic-import --save-dev
```
```sh
npm install babel-plugin-transform-decorators-legacy --save-dev
```
```sh
npm install babel-polyfill --save-dev
```
```sh
npm install postcss-px2rem --save-dev
```
```sh
npm install less-loader --save-dev
```
```sh
npm install less --save-dev
```
```sh
npm install classnames --save
```
```sh
npm install qs --save
```
## 五、修改config文件夹中的配置文件
```js
const paths = require('./paths');
const px2rem = require('postcss-px2rem');//--（1）

function resolve (dir) {                 //--（2）
  return path.join(__dirname, '..', dir) //--（3）
}                                        //--（4）
```
```js
oneOf: [
		...
		 {
        test: /\.(js|jsx|mjs)$/,
        include: paths.appSrc,
        use: [
            {
              loader: require.resolve('babel-loader'),
                options: {
                  // @remove-on-eject-begin
                  babelrc: true,//--（5）
                  presets: [require.resolve('babel-preset-react-app')],//--（6）
                  // @remove-on-eject-end
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  plugins: ["transform-decorators-legacy"],//--（7）
                },
              },
				...
            ]
      },
	  ]
```
```js
{
  test:/\.(css|less)$/,//--（8）
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
          options: {
              importLoaders: 1,
          },
    },
    {
      loader: require.resolve('postcss-loader'),
          options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                  ],
                      flexbox: 'no-2009',//--（9）
                }),
                px2rem({remUnit: 75})//--（10）设计稿根据750px(iphone6)
                  ],
                },
              },
              {
                loader: require.resolve('less-loader')  //--（11）
              },
          ],
},
```
```js
alias: {
	 ...
	  '@': resolve('src'),
}
```
```js
entry: [
    'babel-polyfill',
...
]
```
```js 
.bablelrc 文件内容
{
  "presets": ["react"],
  "plugins": ["syntax-dynamic-import"]
}
```
## 六、配置完成 可以将此项目clone直接使用

## 七、规范化

### 目录结构
 ```
 pdv-mobile/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    api/
    apps/
    assets/
    components/
    envconfig/
    style/
    utils/
    index.js
    logo.svg
    reducers.js
    routers.js
    store.js
 ```
 ``` 说明：
    （1）apps目录下的app都要作为独立可运行的app
    （2）独立的app包括
          action-type.js //--使用原始数据类型Symbol()消除魔术字符串
          index.js
          action.js
          reducer.js
          style.less
          api.js
          component目录 自己单独的组件不公用，公用的组件放到src/components目录下
     （3）将新app的路由写入src/routers.js中
     （4）将新app的reducer写入src/reducers.js中
     （5）app的style.less避免样式污染，样式都要包含在[app名称]-contaier中
     （6）一些工具放到src/utils目录下
      (7)一些修饰器放到src/decorators目录下下
      (8)关于接口调用可以在index和action中，推荐写到inde页中，因为index页的方法比较全面，像alert,router,context等都可以直接调用
```

## 八、发布
  
```
The project was built assuming it is hosted at the server root.
You can control this with the homepage field in your package.json.
For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build

Find out more about deployment here:

  http://bit.ly/2vY88Kr

  
The project was built assuming it is hosted at /pdv-mobile/.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
To publish it at http://liviuscn.github.io/pdv-mobile, run:

  npm install --save-dev gh-pages

Add the following script in your package.json.

    // ...
    "scripts": {
      // ...
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }

Then run:

  npm run deploy

Find out more about deployment here:

  http://bit.ly/2vY88Kr
```