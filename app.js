//创建文件page.js,创建web服务器，托管静态资源public目录，包含登录、注册、个人中心、搜索结果、每个课程的三个分支页面
//向服务器发送请求（post  /myreg）
//挂载到路由器下面  添加前缀/createCourse 以及 /learnCourse

//引入模块
const express = require('express');
//引入body-parser中间件
const bodyParser = require('body-parser');
//引入session中间件
const session = require('express-session');
//引入路由器
const iRouter = require('./router/index.js');
const uRouter = require('./router/user.js');
const cRouter = require('./router/course.js');



//创建服务器
const app = express();
//设置端口
app.listen(8080);
//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//post请求数据解析为对象
app.use(bodyParser.urlencoded({
    extended:true
}));
//托管静态资源
app.use(express.static('./public'));
app.use(express.static('./uploadFiles'));


//挂载路由器
app.use('/index', iRouter);
app.use('/user', uRouter);
app.use('/course', cRouter);