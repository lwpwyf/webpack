# webpack配置
 ## entry： 入口配置，这个是表示入口文件，他由最先的.js文件，对其进行索引，拿到他们所引导向的文件，索引构成了依赖图。而webpack是一个模块打包工具，所以会根据这个图来建立文件之间的索引，打包成相应的文件。
 用法: 
 单入口文件：entry是一个字符串。一个项目只有一个入口，且是单页面应用。
 module.export = {
     entry: './path/to/me.js'
 }

  多入口文件：entry是一个对象。一个项目有多个入口，且是多页面应用。
 module.export = {
     entry: {
         './path/to/me.js',
         './path/to/it.js',
     }
 }

 ## output 用来表示输出到硬盘的位置
   单入口对应的出口
  path: path.resolve(__dirname, 'dist'), //打包的路径  单入口文件
        // filename: 'bunldle.js'//打包的文件名         

   多入口对应的出口
  path: path.resolve(__dirname, 'dist'), //打包的路径
        filename: '[name].js'//
    }

 ## Loader 

  ### 为什么用Loader 
    webpack本身只支持js和json的开箱即用，Loader是为了webpack只能使用这两种资源的问题，让它可以支持更多种资源的加载，并把资源加到依赖图中，他本身是一个函数，接受源文件为参数，返回转换的结果。
    babel-loader,转换es6,es7之类的。css-loader, .css文件的加载和解析。less-loader把less装换成css,ts-loader把ts转化成js.
    file-loader，进行图片，字体的打包。raw-loader将文件以字符串的形式导入(首屏资源可以借助他当做字符串导入) tread-loader多进程打包js和css.
### Loader的用法
    module: {
        rules:[test: /\.txt$/, use: 'raw-loader']  //test指定匹配规则       use指定使用的Loader名称
    }
## plugins
 ### 插件用于打包输出时bundle文件的优化资源管理和环境变量注入。，用来弥补webpack的能力，任何Loader不能做到的事情，都是用plugin来完成。作用于整个构建过程。

 ### 常见plugins
    CommonsChunkPlugin用于将公共的js文件提取成gong公共js.
    CleanWebpackPlugin 清理构建目录。
    ExtractTextWebpackPlugin 将css从bunlde文件里提取成一个独立的css文件。
    CopyWebpackPlugin 将文件或者文件夹拷贝到构建的输出目录。
    HtmlWebpackPlugin 创建html文件去承载输出的bundle,这样我们就不用自己去建立html文件了。
    UglifyjsWebpackPlugin 压缩js
    ZipWebpackPlugin 将打包出来的资源生成一个zip包
 ### 常见用法
    plugin [
        new HtmlWebpackPlugin({template: './src/ndex,html'})    -> 配置在plugin数组中
    ]
## Mode
 ### 用来指定当前的构建环境: production（默认） , development, none.
 根据mode来开启相应的函数和方法。

 ## 实例
  ### 热更新
   #### webpack-dev-server 用于热更新的一个插件
    这个插件每次更新的时候不会把文件放到硬盘中，而是放到内存里，所以大大提高了构件速度，也不会生成硬盘文件。
   #### webpack-dev-middle也是用于热更新的一个中间件模块
    WDM将webpack输出的文件传输给服务器，适用于灵活的定制场景。（express或者koa)这个是一种geng更好配置的方式，更加定制化。

  ### 文件指纹
    打包后输出的文件名的后缀，通常用来做版本管理。对于没有修改的文件，可以用浏览器本地的缓存

    Hash: 跟整个项目的构建有关，只要有项目文件的更改，那么整个项目构建的hash值就会更改。

    Chunkhash: 和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值。也就是不同的项目模块有不同的entry.所以适用于不同模块的打包。

    Contenthash: 根据文件内容来定义hash,文件内容不变，则contenthahs不变。在Chunkhash中由于给整个功能都搭上了模块，所以
    当css变化的时候，我们通常也会使得css文件发生替代，因为不同，所以我们可以给每个css文件加上Contenthash，这样子可以使得一些文件不会更新。

    文件指纹很大的用处在于热更新，版本控制

  ### css设置文件指纹
    我们需要加入mini-css-extract-plugin插件，将其插入进来，这个跟style-loader会产生冲突。因为一个是集合，一个分离出来。

 ## 压缩
   ### js文件默认压缩，当然也可以通过自己下载插件进行压缩。
   ### css文件压缩
        optimize-css-assets-webpack-plugin插件
        参数设置
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor: require('cssnano')
        })
   ### html压缩
        HtmlWebpackPlugin这个用来组织html的压缩
        对于这个来说一个页面对应一个new HtmlWebpackPlugin()
        
 ## 兼容
    如何在编写css的时候不需要添加前缀呢?
    - autoprefixer插件 和 postcss-loader一款很强大的css插件
    根据can i use 网站
    autoprefixer这款插件最好是使用npm安装不然很容易出现can't find mondoule 'anutoprefixer'


 ## 移动端css px转rem
    px2rem-loader插件。手淘的自动插件。

 
 ## 内联？ 资源内联
  ### 意义
   1. 可以将资源内联作为页面的初始化脚本，上报相关打点，css
   内联可以避免页面的闪动。
   2. 请求方面来说，可以减少http网络请求数。
    比如小图片内联或者是字体内联。
  ### 实例
    html和js内联（raw-loader) ,如果用的ES6的代码，还需要将代码进行先转换，然后再内联，所以所以还有在raw-loader之前还要加上babel-loader将ES6转成ES5.
        require('raw-loader!babel-loader!../../node_modules/lib-flexible/flexible.js')

    css内联
        1. 借助style-loader
        2. html-inline-css-webpack-plugin推荐









## webpack常见错误
1. 在开发者模式下，我们应该采用热更新，但是在线上发布中，我们不应该采用热更新模式，所以基于此，我们不应该在发布配置中加上热更新模式。不然会报错。
报错信息
- Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' (use [hash] instead)
解决方案
删去plugins中的new webpack.HotModuleReplacementPlugin()

2. const { CleanWebpackPlugin } = require("clean-webpack-plugin"); CleanWebpackPlugin新的引入方法。每次打包之后都会对前面产物的清楚。



