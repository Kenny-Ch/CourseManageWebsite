const fs = require('fs'); //引入fs，fs 是node中一个文件操作模块，包括文件创建，删除，查询，读取，写入。

const fileTool = new Object()


fileTool.uploadFile = function (tempFilepath, desDirPath, desFileName) {
    return new Promise((resolve, reject) => {
        console.log(tempFilepath, desDirPath, desFileName)

        fs.exists(desDirPath, function (exists) {
            if (exists) {
                fs.readFile(tempFilepath, function (err, data) {
                    fs.writeFile(desDirPath + "/" + desFileName, data, function (err) {
                        if (err) {
                            reject({
                                code: 401,
                                msg: err
                            })
                        } else {
                            resolve({
                                code: 200
                            })
                        }
                    });
                });
            } else {
                fs.mkdir(desDirPath, function (err) {
                    if (err) {
                        reject({
                            code: 401,
                            msg: err
                        })
                    } else {
                        fs.readFile(tempFilepath, function (err, data) {  // 异步读取文件内容
                            fs.writeFile(desDirPath + "/" + desFileName, data, function (err) { // des_file是文件名，data，文件数据，异步写入到文件
                                if (err) {
                                    reject({
                                        code: 401,
                                        msg: err
                                    })
                                } else {
                                    resolve({
                                        code: 200
                                    })
                                }
                            });
                        });
                    }
                })
            }
        })
    })
}

fileTool.downloadFile = function (response, path) {
    return new Promise((resolve, reject) => {
        response.download(path, function (err){
            if(err) {
                reject({
                    code:401,
                    msg:err
                })
            } else {
                resolve({
                    code:200,
                    msg:'success download'
                })
            }
        })
    })

}

fileTool.deleteFile = function (path) {
    console.log(path)
    return new Promise((resolve, reject) => {
        fs.unlinkSync(path,function (err) {
            if (err) {
                reject({
                    code: 401,
                    msg: err
                })
            } else {
                resolve({
                    code: 200
                })
            }
        });
    })

}

module.exports = fileTool

