## 项目结构 ##
    build
    |-- webpack.config.js               # 公共配置
    |-- webpack.dev.js                  # 开发配置
    |-- webpack.release.js              # 发布配置
    docs                                # 项目文档
    node_modules                        
    src                                 # 项目源码
    |-- conf                            # 配置文件
    |-- pages                           # 页面目录
    |   |-- page1                       
    |   |   |-- index.js                # 页面逻辑
    |   |   |-- index.scss              # 页面样式
    |   |   |-- img                     # 页面图片
    |   |   |   |-- xx.png          
    |   |   |-- __tests__               # 测试文件
    |   |   |   |-- xx.js
    |   |-- app.html                    # 入口页
    |   |-- app.js                      # 入口JS
    |-- components                      # 组件目录
    |   |-- loading
    |   |   |-- index.js
    |   |   |-- index.scss
    |   |   |-- __tests__               
    |   |   |   |-- xx.js
    |-- js
    |   |-- actions
    |   |   |-- index.js
    |   |   |-- __tests__               
    |   |   |   |-- xx.js
    |   |-- reducers 
    |   |   |-- index.js
    |   |   |-- __tests__               
    |   |   |   |-- xx.js
    |   |-- xx.js                 
    |-- css                             # 公共CSS目录
    |   |-- common.scss
    |-- img                             # 公共图片目录
    |   |-- xx.png
    tests                               # 其他测试文件
    package.json                        
    READNE.md

## 要完成的功能 ##
    [] 编译 jsx、es6、scss 等资源
    [] 自动引入静态资源到相应 html 页面
    [] 实时编译和刷新浏览器
    [] 按指定模块化规范自动包装模块
    [] 自动给 css 添加浏览器内核前缀
    [] 按需打包合并 js、css
    [] 压缩 js、css、html
    [] 图片路径处理、压缩、CssSprite
    [] 对文件使用 hash 命名，做强缓存
    [] 语法检查
    [] 全局替换指定字符串
    [] 本地接口模拟服务
    [] 发布到远端机
