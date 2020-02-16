<template>
  <div class="orderBox">
    
          <Card class="orderHouse">
        <i-form :model="formItem" :label-width="80">
          <Form-item label="用户名">
            <i-input :value.sync="formItem.input" placeholder="请输入" @on-change="handleUserName"></i-input>
          </Form-item>
          <Form-item label="电话">
            <i-input :value.sync="formItem.input" placeholder="请输入" @on-change="handlePhone"></i-input>
          </Form-item>
          <Form-item label="日期控件">
            <Row>
              <i-col span="11">
                <Date-picker type="date" placeholder="选择日期" :value.sync="formItem.date" @on-change="handleDate"></Date-picker>
              </i-col>
              <i-col span="2" style="text-align: center">-</i-col>
              <i-col span="11">
                <Time-picker type="time" placeholder="选择时间" :value.sync="formItem.time" @on-change="handleTime"></Time-picker>
              </i-col>
            </Row>
          </Form-item>
          <Form-item label="备注">
            <i-input
              :value.sync="formItem.textarea"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入..."
              @on-change="handleRemark"
            ></i-input>
          </Form-item>
          <Form-item>
            <i-button type="primary" @click="handleSubmit">提交</i-button>
            <!-- <i-button type="ghost" style="margin-left:8px">取消</i-button> -->
          </Form-item>
        </i-form>
         </Card>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        date: "",
        time: "",
        textarea: ""
      },
      //用户信息
      username: "",
      phone: 0,
      date:0,
      time:0,
      remark:''
    };
  },
  methods: {
    handleUserName(e) {
      this.username = e.target.value;
      console.log(this.username);
    },
    handlePhone(e) {
      this.phone = e.target.value;
      console.log(this.phone);
    },
    //日期
    handleDate(value){
        this.date=this.$moment(value).format("YYYYMMDD");
        console.log(this.date)
    },
    //时间
    handleTime(value){
        this.time=this.$moment(value).format("hhmmss");
        
        console.log(this.time)
    },
    //备注
    handleRemark(value){
        this.remark=value.data;
        console.log(this.remark)
    },
    saveInfo(){
        this.$reqs
        .post("/order/orderSave",{
            username:this.username,
            phone:this.phone,
            date:this.data,
            time:this.target,
            remark:this.remark
        })
        .then()
        .catch()
    },
     handleSubmit(){
        this.saveInfo();
    },
  },
 
};
</script>
<style scoped>
.orderHouse {
  /* padding: 80px 300px; */
  width: 400px;
  height: 400px;
}
.orderBox{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>