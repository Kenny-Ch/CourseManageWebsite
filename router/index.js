const express = require('express');
//引入连接池的模块
const pool = require('../tool/pool.js');

//创建路由器对象
const r = express.Router();

//添加路由

//搜索课程
r.get('/search', (req, res) => {
    let obj = req.query;
    console.log(obj)
    //2.验证数据是否为空
    if (!obj.search) {
        res.send({code: 401, msg: 'searched info is required'});
        //阻止往后执行
        return;
    } else {
        pool.query("SELECT * FROM course WHERE cname like '%" + obj.search + "%'", (err, result) => {
            if (err) throw err;
            console.log("数据库模糊查询结果", result);

            res.send({code: 200, result: result})
        })

    }
})


//获取我的所有课程
r.get('/mycourses', (req, res) => {
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        pool.query('SELECT * FROM user_allcourses WHERE userEmail=?', [userInfo.email], (err, result) => {
            console.log('查询结果：', result);
            if (err) throw err;

            let allCourse = result
            let joinCourse = []
            let createCourse = []

            for(let i=0; i<result.length; i++) {
                if(result[i].userEmail == result[i].teaID) {
                    createCourse.push(result[i])
                } else {
                    joinCourse.push(result[i])
                }
            }
            res.send({
                code: 200,
                allCourse: allCourse,
                joinCourse: joinCourse,
                createCourse: createCourse
            })

        })
    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//导出路由器
module.exports = r;