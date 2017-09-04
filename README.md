# 安全阀校验系统

[线上演示](http://106.14.147.206/safety_valve_admin/)

## 前言
事情是这样的，我爸是一名安全阀校验员，他那边需要一个安全校验系统的软件，我也正好以此作为一个学习的机会，满足一下自己对Vue和Node的好奇。

# 开发依赖
- Windows 10
- VS Code
- Node v8.3.0
- MySQL 5.7
- vue-webpack模板 https://github.com/vuejs-templates/webpack
- ElementUI http://element.eleme.io

## 项目运行
``` bash
# 克隆到本地
git clone https://github.com/Jic1993/Safety_Valve_Admin.git

# 进入前端文件夹，并安装依赖
cd Safety_Valve_Admin
npm install

# 开启本地开发服务localhost:8010
npm run dev

# 发布环境
npm run build

# 进入后端文件夹，并安装依赖
cd Safety_Valve_Admin/backend
npm install

# 开启后台服务
node server.js
```

# 目录结构
```shell
├── backend                    // 服务端文件夹
│   ├── api                    // 所有服务
│   ├── server.js              // 服务端入口文件
│   ├── db.js                  // 数据库配置
│   └── package.json           // package.json
├── build                      // Webpack构建相关
├── config                     // Webpack配置相关
├── dist                       // 生成的生产环境下的项目
├── src                        // 源码目录（开发都在这里进行）
│   ├── api                    // 统一管理所有请求
│   ├── assets                 // 放置需要经由 Webpack 处理的静态文件
│   ├── components             // 全局公用组件
│   ├── router                 // 路由
│   ├── utilities              // 全局公用方法
│   ├── view                   // 路由页面组件
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 无需经由 Webpack 处理的静态文件
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json
```

# 使用说明
- 录入
1. 录入员填写安全阀校验的委托申请单，并点击**添加**；
2. 然后在右侧的派发栏中点击**派发任务**，系统会自动生成《校验委托申请单》的Excel文件。

    这步之后校验员界面中才能看到待校验的任务列表数据。

- 校验
校验员在待校验的任务列表中点击一行，表示选中该校验任务开始校验，等校验完成，并填入所有校验数据后，点击**结束本次任务**，则校验完成。

- 送审
每当完成一个校验后，在录入员界面的送审栏中就可以看到已经检验完成的任务数据，选择并点击**提交送审**，这步之后审核人界面才能看到该待审核的校验任务数据。

- 审核
选择要通过的校验记录，并点击**批量审核**，此时后台自动生成相应的《校验记录》EXCEL文档。

- 签发
选择要通过的校验记录，并点击**批量签发**，此时后台自动生成相应的《校验报告》EXCEL文档，并且将该校验记录写入《校验台帐》EXCEL文档
