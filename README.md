# my-react-app
#使用官方脚手架搭建的react+react-redux+es6/7/8+react-router+less开发环境

#一、装官方脚手架
```sh
npm install -g create-react-app
```
#二、创建项目
```sh
create-react-app my-react-app
```
#三、暴露配置文件
```sh
npm run eject
```
#四、安装必备插件
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
npm install react-router-dom --save
```
```sh
npm install redux --save
```
```sh
npm install redux-thunk --save
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
#五、修改config文件夹中的配置文件
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
#六、配置完成 可以将此项目clone直接使用

#七、规范化

##目录结构
 ```
 my-react-app/
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
          action-type.js
          index.js
          action.js
          reducer.js
          style.less
          component目录 自己单独的组件不公用，公用的组件放到src/components目录下
     （3）将新app的路由写入src/routers.js中
     （4）将新app的reducer写入src/reducers.js中
     （5）app的style.less避免样式污染，样式都要包含在[app名称]-contaier中
     （6）一些工具放到src/utils目录下
```