<template>
  <div class="box">
    <Row>
      <Col span="11">
        <Card>
          <p slot="title">租房详情</p>
          <Form :model="formItem" :label-width="80">
            <FormItem label="房屋地址">
              <Input v-model="formItem.houseaddress"></Input>
            </FormItem>
            <FormItem label="房屋状态">
              <Input v-model="formItem.housestatus"></Input>
            </FormItem>
            <FormItem label="家具状态">
              <Input v-model="formItem.furniturestatus"></Input>
            </FormItem>
            <FormItem label="租金信息">
              <Input v-model="formItem.rentprice"></Input>
            </FormItem>
            <FormItem label="交租方式">
              <Input v-model="formItem.payways"></Input>
            </FormItem>
            <FormItem label="电费">
              <Input v-model="formItem.electriccharge"></Input>
            </FormItem>
            <FormItem label="水费">
              <Input v-model="formItem.watercharge"></Input>
            </FormItem>
            <FormItem label="房屋大小">
              <Input v-model="formItem.housesize">平方米</Input>
            </FormItem>
          </Form>
        </Card>
      </Col>
      <Col span="11" offset="2">
        <Card dis-hover>
          <p slot="title">用户信息</p>
          <Form :model="renterinfo" :label-width="120">
            <FormItem label="用户姓名">
              <Input v-model="renterinfo.names" value="name" @on-change="handleName"></Input>
            </FormItem>
            <FormItem v-model="renterinfo.identify" label="用户身份证号">
              <Input @on-change="handleId"></Input>
            </FormItem>
            <FormItem label="用户手机号">
              <Input v-model="renterinfo.phone" value="phone" @on-change="handlePhone"></Input>
            </FormItem>
            <FormItem label="用户性别">
              <Input v-model="renterinfo.sex" value="sex" @on-change="handleSex"></Input>
            </FormItem>
            <Button type="primary" @click="addRenterInfo">添加租户信息</Button>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      renterId: "",
      formItem: {},
      renterinfo:{
        names:'',
        identify:'',
        phone:'',
        sex:'',
      },
     
    };
  },
  methods: {
    getRenterInfo() {
      let id = this.$route.query.id;
      this.$reqs
        .get("/house/renterInfo?id=" + id)
        .then(data => {
          this.formItem = data.data.data[0];
          // this.renterinfo=data.data.data[0].renterinfo
        })
        .catch();
    },
    //添加用户信息
    //姓名
    handleName(e) {
     this.renterinfo.names = e.target.value;
    },
    //身份证号
    handleId(e) {
     this.renterinfo.identify=e.target.value;
    },
    //手机号
    handlePhone(e) {
      this.renterinfo.phone=e.target.value;
    },
    //性别
    handleSex(e) {
     this.renterinfo.sex=e.target.value;
    },
    addRenterInfo() {
      
      this.$reqs
      .post("/house/addRenterInfo",{
          id:this.$route.query.id,
          name:this.renterinfo.names,
          identify:this.renterinfo.identify,
          phone:this.renterinfo.phone,
          sex:this.renterinfo.sex
      })
      .then(data=>{
        alert(data.data.info)
        this.$router.push('/home/housingResource')
      })
      .catch()
      
    }
  },
  mounted() {},
  created() {
    this.getRenterInfo();
  }
};
</script>
<style scoped>
</style>