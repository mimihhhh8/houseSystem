import Mock from "mockjs";
const url = require("url");
const data = Mock.mock({
    "data|20": [
        {
            "id|+1": 1,
            "hour": /^(\d)|(1\d)|(2[0-3])$/,
            "date": /^((2019)-(0?[12]|1[02])-(0?[1-2]|[12]\d|3[01]))$/,
            "data_type":/^(incomes)|(oncomes)|(offcomes)$/,
            "date_status":/^(1)|(2)$/
        }
    ]
})


/*
    参数1：请求的地址  注意是正则表达式
    参数2：请求的方式
    参数3：回调

*/


// Mock.mock(/\/users\/list/,"get",(options)=>{
//     const {page,limit} = url.parse(options.url,true).query;

//     var obj = {
//         code:200,
//         errMsg:"",
//         data:{
//             list:[]
//         }
//     }


//     for(var i=(page-1)*limit;i<Math.min(page*limit,data.data.length);i++){
//         obj.data.list.push(data.data[i]);
//     }


//     return obj;

// })




Mock.mock(/\/users\/list/, "post", (options) => {
    let { page, limit } = JSON.parse(options.body);

    var obj = {
        code: 200,
        errMsg: "",
        data: {
            list: []
        }
    }

    for (var i = (page - 1) * limit; i < Math.min(page * limit, data.data.length); i++) {
        obj.data.list.push(data.data[i]);
    }


    return obj;


})

