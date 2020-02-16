const orderModel=require("../model/order");

const orderSave=async (req,res)=>{
    let {username,phone,date,time,remark}=req.body;
    let data=await orderModel.submitInfo({username,phone,date,time,remark})
    console.log(data)
}
module.exports={
    orderSave
}