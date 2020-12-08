const express = require('express');
//引入连接池的模块
const pool = require('../tool/pool.js');

//创建路由器对象
const  r = express.Router();

//添加路由

//login登录
r.post('/login', (req, res) => {
    let obj = req.body;
    console.log(obj);
    //验证数据是否为空

    if(!obj.password){
        res.send({code:401,msg:'password required'})
        return;
    }

    if(!obj.email){
        res.send({code:402,msg:'email required'})
        return;
    }
    console.log("ok!")
    res.send({code:200,msg:'login seccess'})
    //到数据库中查询是否有用户名和密码同时匹配的数据
    // pool.query('SELECT * FROM user WHERE email=? AND password=?',[obj.email,obj.password],(err,result)=>{
    //     if(err) throw err;
    //     //返回空数组，长度为0 ，说明登录失败
    //     if(result.length===0){
    //         res.send({code:403,msg:'login err'})
    //     }else{//查询到匹配的用户  登录成功
    //         req.session.userInfo = {
    //             name: result[0].name,
    //             email: result[0].email,
    //             imgUrl: result[0].imgUrl
    //         }
    //         res.send({code:200,msg:'login seccess'})
    //     }
    //     console.log('登录查询结果：',result);
    // })
})

//register页面
r.post('/register', (req, res) => {
    let obj = req.body;
    console.log(obj)
    //2.验证数据是否为空
    if(!obj.name){
        res.send({code:401,msg:'name required'});
        return;
    }
    if(!obj.password){
        res.send({code:402,msg:'password required'});
        return;
    }
    if(!obj.email){
        res.send({code:403,msg:'email required'});
        return;
    } else {
        pool.query('SELECT * FROM user WHERE email=?',[obj.email],(err,result)=>{
            if(err) throw err;
            if(result.length===0){
                //执行sql命令  将数据添加到数据库
                pool.query('INSERT INTO user SET ?',[obj],(err,result)=>{
                    if(err) throw err;
                    //注册成功
                    res.send({code:200,msg:'register success'})
                    console.log('注册查询结果：', result);
                })
            }else{
                res.send({code:404, msg:'the account has existed'})
            }
            console.log('注册查询结果：',result);
        })
    }


})

//个人信息
r.post('/perInfo',(req,res)=>{
    let userInfo = req.session.userInfo;
    //检查是否登录
    if(userInfo) {
        pool.query('SELECT * FROM user WHERE email=?',[userInfo.email],(err,result)=>{
            console.log('查询结果：',result);
            if(err) throw err;
            if(result.length===0){
                res.send({code:402, msg:'查询出错'})
            }else{
                res.send({
                    code:200,
                    perInfo: {
                        name:result[0].name,
                        email:result[0].email,
                        imgUrl:result[0].imgUrl
                    }
                })
            }

        })
    } else {
        res.send({code:401, msg:'请先登录'})
    }
})

//导出路由器
module.exports = r;