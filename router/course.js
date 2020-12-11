const express = require('express');
const fs = require('fs'); //引入fs，fs 是node中一个文件操作模块，包括文件创建，删除，查询，读取，写入。
const multer = require('multer'); //multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

//引入连接池的模块
const pool = require('../tool/pool.js');
const fileTool = require('../tool/fileTool.js');

//创建路由器对象
const r = express.Router();
r.use(multer({dest: "./tempFiles"}).array("file", 1));

//添加路由

//已加入课程相关
//作业列表
r.get('/homeworkList', (req, res) => {

    //1.获取post 请求数据
    let obj = req.query;
    console.log(obj)
    let courseID = obj.courseID
    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (courseID) {
            pool.query('SELECT * FROM user_homeworklist WHERE userEmail=? and courseID=? order by ddl desc', [userInfo.email, courseID], (err, result) => {
                console.log('作业列表查询结果：', result);
                if (err) throw err;

                res.send({
                    code: 200,
                    homeworkList: result
                })
            })
        } else {
            res.send({code: 402, msg: 'courseID未提供'})
        }

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//作业详情
r.get('/homeworkDetail', (req, res) => {
    let obj = req.query;
    console.log(obj);
    let homeworkID = obj.homeworkID

    let userInfo = req.session.userInfo;
    if (userInfo) {
        if (homeworkID) {
            pool.query('SELECT * FROM course_homework_tea WHERE ID=? ', [homeworkID], (err, result) => {
                console.log('作业详情查询结果：', result);
                if (err) throw err;

                res.send({
                    code: 200,
                    homeworkDetail: result[0] ? result[0] : null
                })
            })
        } else {
            res.send({code: 402, msg: 'homeworkID未提供'})
        }

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//作业公告列表
r.get('/announcementList', (req, res) => {

    //1.获取post 请求数据
    let obj = req.query;
    console.log(obj)
    let courseID = obj.courseID
    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (courseID) {
            pool.query('SELECT * FROM course_announcement WHERE courseID=? order by announceTime desc', [courseID], (err, result) => {
                console.log('作业公告列表查询结果：', result);
                if (err) throw err;

                res.send({
                    code: 200,
                    homeworkList: result
                })
            })
        } else {
            res.send({code: 402, msg: 'courseID未提供'})
        }

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})


//作业公告详情
r.get('/announcementDetail', (req, res) => {
    let obj = req.query;
    console.log(obj);
    let announcementID = obj.announcementID

    let userInfo = req.session.userInfo;
    if (userInfo) {
        if (announcementID) {
            pool.query('SELECT * FROM course_announcement WHERE ID=? ', [announcementID], (err, result) => {
                console.log('作业公告详情查询结果：', result);
                if (err) throw err;

                //公告观看次数+1
                if (result[0]) {
                    pool.query('UPDATE course_announcement  SET viewTimes=? WHERE ID=?', [result[0].viewTimes + 1, announcementID], (err, updateresult) => {
                        if (err) throw err;

                        console.log('更新结果', updateresult);
                        if (updateresult.affectedRows === 0) {
                            res.send({
                                code: 201,
                                msg: 'update view times fail',
                                announcementDetail: result[0]
                            })
                        } else {
                            res.send({
                                code: 200,
                                announcementDetail: result[0]
                            })
                        }
                    })
                } else {
                    res.send({
                        code: 200,
                        announcementDetail: null
                    })
                }
            })
        } else {
            res.send({code: 402, msg: 'annoucementID未提供'})
        }

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})


//作业资源列表
r.get('/resourceList', (req, res) => {

    //1.获取get 请求数据
    let obj = req.query;
    console.log(obj)
    let courseID = obj.courseID
    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (courseID) {
            pool.query('SELECT * FROM course_resource WHERE courseID=? order by uploadTime desc', [courseID], (err, result) => {
                console.log('作业资源列表查询结果：', result);
                if (err) throw err;

                res.send({
                    code: 200,
                    resourceList: result
                })
            })
        } else {
            res.send({code: 402, msg: 'courseID未提供'})
        }

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})


//创建课程相关
//创建课程
r.post('/createCourse', (req, res) => {
    //1.获取post 请求数据
    let obj = req.body;
    console.log("创建课程请求参数：", obj)

    //2.获取session个人信息
    let userInfo = req.session.userInfo;

    //3.获取文件信息
    var fileInfo = req.files[0]

    //检查是否登录
    if (userInfo) {
        if (!obj.cname) {
            res.send({code: 402, msg: 'uname required'});
            //阻止往后执行
            return;
        }
        if (!fileInfo) {
            res.send({code: 403, msg: 'image required'})
            return;
        }
        obj.creator = userInfo.name


        pool.query('INSERT INTO course SET ?', [obj], (err, result) => {
            if (err) {
                fileTool.deleteFile(fileInfo.path)
                res.send({code: 405, msg: 'query fail'})
                throw err;
            }
            let courseID = result.insertId
            let desDirPath = "uploadFiles/" + courseID
            let fileUrl = desDirPath + "/" + fileInfo.originalname

            // 上传文件
            fileTool.uploadFile(fileInfo.path, desDirPath, fileInfo.originalname)
                .then(function (fileRes) {
                    if (fileRes.code === 200) {//上传成功
                        //执行sql命令  将数据添加到数据库
                        pool.query('UPDATE course  SET cImgUrl=? WHERE courseID=?', [fileUrl, courseID], (err, updateresult) => {
                            if (err) {
                                fileTool.deleteFile(fileInfo.path)
                                fileTool.deleteFile(fileUrl)
                                res.send({
                                    code: 405,
                                    msg: 'query fail'
                                })
                                throw err;
                            }

                            console.log('更新结果', updateresult);
                            if (updateresult.affectedRows === 0) {
                                fileTool.deleteFile(fileInfo.path)
                                fileTool.deleteFile(fileUrl)
                                res.send({
                                    code: 406,
                                    msg: 'updatequery fail',
                                })
                            } else {
                                res.send({
                                    code: 200,
                                    msg: 'create success'
                                })
                            }
                        })
                    } else {//上传失败
                        fileTool.deleteFile(fileInfo.path)
                        res.send({code: 404, msg: 'upload file fail'})
                    }
                }).catch(function (err) {
                fileTool.deleteFile(fileInfo.path)
                res.send({code: 404, msg: 'upload file fail'})
            })
        })
    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//创建公告
r.post('/publishAnnouncement', (req, res) => {
    //1.获取post 请求数据
    let obj = req.body;
    console.log("创建公告请求参数：", obj)

    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (!obj.courseID) {
            res.send({code: 402, msg: 'courseID required'});
            //阻止往后执行
            return;
        }
        if (!obj.context) {
            res.send({code: 403, msg: 'context required'});
            //阻止往后执行
            return;
        }
        if (!obj.title) {
            res.send({code: 404, msg: 'title required'});
            //阻止往后执行
            return;
        }

        obj.announceTime = new Date()
        //执行sql命令  将数据添加到数据库
        pool.query('INSERT INTO course_announcement SET ?', [obj], (err, result) => {
            if (err) throw err;
            console.log(result);
            //注册成功
            res.send({code: 200, msg: 'publish success'})
        })

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//上传资源
r.post('/uploadResource', (req, res) => {
    //1.获取post 请求数据
    let obj = req.body;
    console.log("上传资源请求参数：", obj)

    //2.获取session个人信息
    let userInfo = req.session.userInfo;

    //3.获取文件信息
    let fileInfo = req.files[0]

    //检查是否登录
    if (userInfo) {
        if (!fileInfo) {
            res.send({code: 402, msg: 'file required'});
            //阻止往后执行
            return;
        }
        if (!obj.courseID) {
            fileTool.deleteFile(fileInfo.path)
            res.send({code: 403, msg: 'courseID required'});
            //阻止往后执行
            return;
        }


        var desDirPath = "uploadFiles/" + obj.courseID
        obj.fileUrl = obj.courseID + "/" + fileInfo.originalname
        obj.fileName = fileInfo.originalname
        obj.uploadTime = new Date()

        // 上传文件
        fileTool.uploadFile(fileInfo.path, desDirPath, obj.fileName)
            .then(function (fileRes) {
                if (fileRes.code === 200) {//上传成功
                    //执行sql命令  将数据添加到数据库
                    pool.query('INSERT INTO course_resource SET ?', [obj], (err, result) => {
                        if (err) {
                            fileTool.deleteFile(fileInfo.path)
                            fileTool.deleteFile(desDirPath + "/" + fileInfo.originalname)
                            res.send({code: 405, msg: 'query fail'})
                            throw err;
                        }
                        fileTool.deleteFile(fileInfo.path)
                        console.log(result);
                        //注册成功
                        res.send({code: 200, msg: 'upload success'})
                    })
                } else {//上传失败
                    fileTool.deleteFile(fileInfo.path)
                    res.send({code: 404, msg: 'upload file fail'})
                }
            }).catch(function (err) {
            fileTool.deleteFile(fileInfo.path)
            res.send({code: 404, msg: 'upload file fail'})
        })
    } else {
        fileTool.deleteFile(fileInfo.path)
        res.send({code: 401, msg: '请先登录'})
    }
})

//上传作业要求
r.post('/assignHomework', (req, res) => {
    //1.获取post 请求数据
    let obj = req.body;
    console.log("布置作业请求参数：", obj)

    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (!obj.courseID) {
            res.send({code: 402, msg: 'courseID required'});
            //阻止往后执行
            return;
        }
        if (!obj.title) {
            res.send({code: 403, msg: 'title required'});
            //阻止往后执行
            return;
        }
        if (!obj.context) {
            res.send({code: 404, msg: 'context required'});
            //阻止往后执行
            return;
        }
        if (!obj.ddl) {
            res.send({code: 405, msg: 'ddl required'});
            //阻止往后执行
            return;
        }

        obj.teaID = userInfo.email
        //执行sql命令  将数据添加到数据库
        pool.query('INSERT INTO course_homework SET ?', [obj], (err, result) => {
            if (err) throw err;
            console.log(result);
            //注册成功
            res.send({code: 200, msg: 'assign success'})
        })

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//上传作业
r.post('/submitHomework', (req, res) => {
    //1.获取post 请求数据
    let obj = req.body;
    console.log("布置作业请求参数：", obj)

    let fileInfo = req.files[0]

    //2.获取session个人信息
    let userInfo = req.session.userInfo;
    //检查是否登录
    if (userInfo) {
        if (!fileInfo) {
            res.send({code: 402, msg: 'file required'});
            //阻止往后执行
            return;
        }
        if (!obj.homeworkID) {
            res.send({code: 403, msg: 'homeworkID required'});
            //阻止往后执行
            return;
        }

        let desDirPath = "uploadFiles/user" + userInfo.email
        let fileName = fileInfo.originalname

        obj.userID = userInfo.email
        obj.status = '已完成'
        obj.finishTime = new Date()
        obj.homeworkUrl = "user" + userInfo.email + "/" + fileName

            // 上传文件
        fileTool.uploadFile(fileInfo.path, desDirPath, fileName)
            .then(function (fileRes) {
                if (fileRes.code === 200) {//上传成功
                    //执行sql命令  将数据添加到数据库

                    pool.query('SELECT * FROM user_coursehomework WHERE userEmail=? and homeworkID=?', [userInfo.email, obj.homeworkID], (err, qresult) => {

                        if (err) throw err;

                        if(qresult.length >0) {
                            pool.query('UPDATE user_coursehomework  SET status=?,finishTime=?,homeworkUrl=? WHERE userEmail=? and homeworkID=?'
                                , ['已完成', new Date(), "user" + userInfo.email +"/"+fileName ,userInfo.email, obj.homeworkID], (err, result) => {
                                    if (err) {
                                        fileTool.deleteFile(fileInfo.path)
                                        fileTool.deleteFile(desDirPath + "/" + fileInfo.originalname)
                                        res.send({code: 405, msg: 'update fail'})
                                        throw err;
                                    }
                                    fileTool.deleteFile(fileInfo.path)
                                    console.log(result);
                                    res.send({code: 200, msg: 'submit success'})
                                })
                        } else {
                            pool.query('INSERT INTO user_coursehomework SET ?', [obj], (err, result) => {
                                if (err) {
                                    fileTool.deleteFile(fileInfo.path)
                                    fileTool.deleteFile(desDirPath + "/" + fileInfo.originalname)
                                    res.send({code: 405, msg: 'insert fail'})
                                    throw err;
                                }
                                console.log(result);
                                //注册成功
                                res.send({code: 200, msg: 'submit success'})
                            })
                        }
                    })


                } else {//上传失败
                    fileTool.deleteFile(fileInfo.path)
                    res.send({code: 404, msg: 'upload file fail'})
                }
            }).catch(function (err) {
            fileTool.deleteFile(fileInfo.path)
            res.send({code: 404, msg: 'upload file fail'})
        })

    } else {
        res.send({code: 401, msg: '请先登录'})
    }
})

//下载资源
r.get('/downloadResource', (req, res) => {
    // let obj = req.body
    // let path = obj.path
    // console.log(path);path = 'uploadFiles/7/img.png'
    // res.sendFile(__dirname + '/../' + path);
    // fileTool.downloadFile(res, path).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     res.send(err)
    // })
})


//导出路由器
module.exports = r;