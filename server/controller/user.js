const userModel = require("../model/user");
const tokenUtils = require("../utils/token")
// 引入加密模块
const crypto = require('crypto');

// 用户注册判断
const userRegister = async (req, res) => {
    let { username, password } = req.body;
    let data = await userModel.userFind({ username });
    if (data) {
        res.json({//response响应数据 传送给前端  JSON格式的数据
            code: 200,
            errMsg: "",
            data: {
                info: "用户名重复",
                status: "success",
                data: data
            }
        })
    } else {
        // 创建加密算法
        const hash = crypto.createHash("sha256");
        // 对数据进行加密
        hash.update(password);

        // 用户登陆状态
        let status = true;
        // 用户注册时间
        let registerTime = new Date().getTime();
        // 用户的随机名称
        let name = Math.random().toString(36).substr(2, 8);
        // 默认用户头像
        let urlPic = "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1578997777&di=513e95c541cfcb3ebbf566cf929a491d&src=http://www.17qq.com/img_qqtouxiang/75876952.jpeg";
        let saveData = await userModel.userSave({ username, password: hash.digest("hex"), status, registerTime, name, urlPic });
        if (saveData) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功",
                    status: 1
                }
            })
        }
    }
}
// 用户修改密码判断

// 用户登陆判断
const userLogin = async (req, res) => {
    // 得到username 和password
    let { username, password } = req.body;
    // 查看用户名是否存在
    let userData = await userModel.userFind({ username });
    if (userData) {//如果存在
        /* 
            进行密码和用户名的校验
            密码在数据库中已经加密，
            所以要将密码进行同样的加密在进行比较

         */
        if (userData.status) {
            // 创建加密算法
            const hash = crypto.createHash("sha256");
            // 对数据进行加密
            hash.update(password);
            // 拿到加密后的数据
            // console.log(hash.digest("hex"),'用户输入加密的密码')
            // 当密码加密以后与数据库密码相同时
            if (userData.password == hash.digest("hex")) {
                // 当登陆成功时候生产token值 并且发送到客户端
                let token = tokenUtils.sendToken({ username });
                res.cookie("token", token)
                // console.log(res.cookie())

                
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "登陆成功",
                        code: 1,
                        data: userData
                    }
                })
            } else {
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "密码错误",
                        code: 2
                    }
                })
            }
        } else {
            res.json({

            })
        }

    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名不存在",
                code: 0
            }
        })
    }
}

//修改密码
const userPassword = async (req, res) => {
    let { id, oldpassword, newpassword } = req.body;
    let data = await userModel.userPass(id);//给model传参
    // console.log(id,oldpassword, newpassword );//验证路由是否走通
    const hash1 = crypto.createHash('sha256');
    // //加密 3、对数据进行加密
    hash1.update(oldpassword);
    // console.log(hash1.digest('hex'),"输入的旧密码")
    // console.log(data.password,'数据库中的密码')
    if (data.password == hash1.digest('hex')) {
        const newhash = crypto.createHash('sha256');
        // //加密 3、对数据进行加密
        newhash.update(newpassword);
        let pass = newhash.digest('hex')
   

        let updatedata = await userModel.updatePass(id, pass);
       console.log(updatedata)
        if (updatedata) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "密码修改成功请重新登录",
                    status: 1,
                    data: data
                }
            })
        } else {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "密码修改失败",
                    status: 0
                }
            })
        }
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "原密码错误",
                status: 1,
            }
        })
    }
}
// 用户头像
const userPic = async (req, res) => {
    let { id, headPic } = req.body;
    console.log(req.body)
    let data = await userModel.UpdatePic(id, headPic);
    if (data.ok = 1) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "修改头像成功",
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "修改失败",
                status: 0
            }
        })
    }
}
// 用户信息管理
const userInter = async (req, res) => {
    let { id } = req.body;
    console.log(id)
    let data = await userModel.userInter(id);
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: data,
                status: 1
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                list: [],
                status: 0
            }
        })
    }
}
//获取数据
const dataAllInfo = async (req, res) => {
    let data = await userModel.dataFind();
    if (data) {
        res.json({//response响应数据 传送给前端  JSON格式的数据
            code: 200,
            errMsg: "",
            data: {
                info: "数据库表中总条数",
                status: "success",
                data: data
            }
        })
    }
}
//分页
const hourDataList=async (req,res)=>{
    //前端传过来的数据
    let {page,limit,startDate,endDate}=req.query;
    // console.log(page,limit,startDate,endDate)
    let data=await userModel.hourDataPage(page,limit);
    let allData=await userModel.allData();
    if (data.length!==0) {
        //查询
        let searchData=await userModel.searchDate(page,limit,startDate,endDate);
        if(searchData){
            res.json({
                code:200,
                errMsg:"",
                searchData:searchData,
                data:data,
                allData:allData
            })
        }else{
            res.json({
                code:200,
                errMsg:"",
                info:"get data failure"
            })
        }
        res.json({//response响应数据 传送给前端  JSON格式的数据
            code: 200,
            errMsg: "",
            data: {
                info: "page",
                status: "success",
                data: data
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"page",
                status:"failure"
            }
        })
    }

}
//日期查询总条数
const searchDateCount=async (req,res)=>{
    let {startDate,endDate}=req.query;
    let count=await userModel.searchDateCount(startDate,endDate);
    if(count){
        res.json({
            code:200,
            errMsg:'',
            count:count
        })
    }
}
module.exports = {
    userRegister,
    userLogin,
    userPassword,
    userPic,
    userInter,
    

    dataAllInfo,
    hourDataList,
    // searchDate,
    searchDateCount
}