# 移动端基础项目 - [simple]

[simple 项目地址](http://192.168.110.8:10080/tangqitao/react-mobile-tmp/tree/master/example/simple)

了解此项目前，务必先阅读学习相关技术栈：

[react v16.8+](https://react.docschina.org/docs/hooks-intro.html)

[nextjs v9](https://nextjs.org/docs/getting-started)

[mobx v5](https://mobx.js.org/README.html)（[mobx-react v6](https://github.com/mobxjs/mobx-react)）

[less](http://lesscss.cn/)

[antd-mobile v2](https://mobile.ant.design/docs/react/introduce-cn)

[prop-types](https://www.jianshu.com/p/2896acb5746b)

## 介绍

### 一、设备/环境支持

安装有【现代高级浏览器】的设备/环境

### 二、整体使用 rem 弹性布局（设计稿以 750px 为基准）

1rem = 75px，所以正常情况下 10rem 为可视区域最大宽度

#### 可自动化将代码中的 px 转换为 rem

```less
// 编译前的代码
.before-build {
  border-top: 75px soild #eee;
}

// 编译后的代码
.after-build {
  border-top: 1rem soild #eee;
}
```

忽略自动转化的情况包括（注意！）：

a.不转化的 css 属性为，"font\*", "letter-spacing"；

b.node_modules 路径下的文件；

c.值小于 1.1px，如：height: 1px 将不转化成为 rem；

d.media 选择的属性；

e.非 px 结尾的值，如：PX、em、vw

#### 对 1px 问题做了统一的自动化处理：

一般情况下，现代浏览器已解决 1px 问题，但为了兼容老旧手机，做了一些自动化的处理。在支持 0.5px 的机型上自动添加 .hairlines 类，并在打包项目时，自动将 1px 以下的值编译。

```less
// 编译前的代码 - before
.build {
  border-top: 1px soild #eee;
}

// 编译后的代码 - after （已自动对 CSSModule 做了处理）
.build_HASH {
  border-top: 1px soild #eee;
}
.hairlines .build_HASH {
  border-top: 0.5px soild #eee;
}
```

### 三、配置文件

#### 客户端配置

客户端配置文件在 config/evn/client.js

注意：此配置将暴露在浏览器对象中，window.hzConfig！所以里面的配置项都不安全！

#### 服务端配置

服务端配置文件在 config/evn/server.js，配置仅暴露在服务端上

## 规范事项

### 一、文件路由 - pages

项目整体为[文件路由](https://nextjs.org/docs/basic-features/pages)，/pages/\* 下以 .js 结尾的文件将被解析为路由，所以需要注意文件名称。并且禁止把任何公共组件放在 pages 目录下。（在项目资源打包的时候，会干扰正常的公共文件提取处理等，未开发的路由也建议直接删除或者修改文件后缀）

#### 命名规范

由于是文件路由，务必使用【中划线规则】命名文件或文件夹，如：

```
pages/set-up/index.js

pages/set-up/go-home.js
```

### 二、样式

整体采用 less 语法

#### UI 组件库

基础 UI 组件库使用 antd-mobile，变量配置文件在 src/styles/themes/default.less

#### 命名规范

建议采用

#### 文件路径

src/styles/\*下用于存放基础公共样式方法或页面组件样式（pages 下的组件）

特别说明：src/components/\*下的组件样式无需放入此目录，而是推荐在目录在创建 styles 目录，如：

```
components
│
├── MobxTest
│   │
│   ├── index.jsx
│   │
│   └── styles // 存放组件的样式文件
│       │
|       └── index.less
└── ...
```

#### 弹性布局

推荐用百分比替代大尺寸的值（大于等于 5rem、375px 的值）

虽然 10rem 为 750px，及满屏。但是我们推荐使用百分比来替换那些大于半屏的值（可避免一些样式问题）

```less
// 如果父类宽为满屏的情况下
// 不推荐
.bad {
  width: 10rem; // 大于 5rem
}
.bad-2 {
  width: 750px; // 大于 375px
}
.bad-3 {
  width: 375px; // 等于 375px
}

// 推荐
.good {
  width: 100%;
}
.good-2 {
  width: 100%;
}
.good-3 {
  width: 50%;
}
```

### 三、公共组件

#### 命名规范

以【帕斯卡（大驼峰命名）】文件夹以及类，代码中常量采用全大写，其余采用驼峰

#### 目录结构

公共组件提取到 components 目录下，大致如下：

```
components
│
├── MobxTest // 组件名称
│   ├── index.jsx // 唯一入口文件
│   │
│   ├── mod // 子组件目录
│   │   │
|   │   └── Test.jsx // 子组件 或 类
│   │
│   └── styles // 样式目录
│       │
|       └── index.less
└── ...
```

### 四、资源文件

资源文件分为：public 和 assets

建议根据文件进行分类，对应图片文件进行无损压缩！

这里推荐一个 mac 系统的压缩软件：[ImageOptim](https://imageoptim.com/mac)

#### public 目录

此为项目根目录下的 public 文件夹，里面的所有资源都将跟随 node 服务对外发布，如：/public/static/favicon.ico

tips：一般不易更变的文件可存放在此处！

特别说明：

如何启用 cdn ？ - 可直接将文件夹下的内容存入 cdn，然后再配置文件 config/evn/client.js 中修改配置 env.cdn。

#### src/assets 目录

此目录下的文件需要通过 webpack loader 来打包处理后，才能使用。（引入文件报错的话，大概率就是没有配置 loader）

tips：存放易更换的文件！

### 五、Mobx

mobx 类存放在 src/stores 目录下；

实例存放在 src/contexts 目录下；

默认情况下 src/contexts/store.jsx 为全局 mobx 的初始化文件

公共的全局 mobx hooks 方法在 src/hooks/useStores.jsx

### 六、工具类使用

项目在 src/utils 下内置了 cookie、localStorage、request 等公共方法，务必统一使用

## 其他说明

...
