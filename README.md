# CourseManageWebsite

### 目录结构
- public  
存放所有的静态资源界面  
    - index即我的课程主页
    - login登录界面
    - register注册界面
    - search搜索结果界面
    - CreateCourse/announcement公告列表页面
    - CreateCourse/announceDetail公告详情界面
    - CreateCourse/homeworkList作业列表页面
    - CreateCourse/homeworkDetail作业详情界面
    - CreateCourse/resource资源列表界面
    - LearnCourse/announcement公告列表页面
    - LearnCourse/announceDetail公告详情界面
    - LearnCourse/homeworkList作业列表页面
    - LearnCourse/homeworkDetail作业详情界面
    - LearnCourse/resource资源列表界面
- router  
存放三个主要路由器:index、user、course
- tool  
存放工具类
- uploadFiles  
存放用户头像或者课程资源、图片
- tempFiles  
临时存放上传的文件
- api文档.xlsx  
各接口详细情况
- app.js  
服务器开启入口（node app.js）
- package.json/package-lock.json  
引入模块信息文件
- scholat.sql  
数据库导入文件

### TIPS
- tool文件夹下的pool是连接数据库配置文件，请根据自己的需要修改对应的内容
