<template>
  <div class="box">
    <Row>
      <Col span="11">
        <Card>
          <p slot="title">租房详情</p>
          <Form :model="formItem" :label-width="80">
            <FormItem label="房屋地址">
              <Input v-model="formItem.houseaddress" @on-change="houseAddress"></Input>
            </FormItem>
            <FormItem label="房屋状态">
              <Input v-model="formItem.housestatus" @on-change="houseStatus"></Input>
            </FormItem>
            <FormItem label="家具状态">
              <Input v-model="formItem.furniturestatus" @on-change="furnitureStatus"></Input>
            </FormItem>
            <FormItem label="租金信息">
              <Input v-model="formItem.rentprice" @on-change="rentPrice"></Input>
            </FormItem>
            <FormItem label="交租方式">
              <Input v-model="formItem.payways" @on-change="payWays"></Input>
            </FormItem>
            <FormItem label="电费">
              <Input v-model="formItem.electriccharge" @on-change="electricCharge"></Input>
            </FormItem>
            <FormItem label="水费">
              <Input v-model="formItem.watercharge" @on-change="waterCharge"></Input>
            </FormItem>
            <FormItem label="房屋大小">
              <Input v-model="formItem.housesize" @on-change="houseSize">平方米</Input>
            </FormItem>
          </Form>
          <Button type="primary" @click="handleChangeInfo">修改</Button>
        </Card>
      </Col>
      <!-- <Col span="11" offset="2">
        <Card dis-hover>
          <p slot="title">用户信息</p>
          <Form :model="renterinfo" :label-width="120">
            <FormItem label="用户姓名">
              <Input v-model="renterinfo.name" @on-change="handleName"></Input>
            </FormItem>
            <FormItem label="用户身份证号">
              <Input v-model="renterinfo.identify" @on-change="handleIdentify"></Input>
            </FormItem>
            <FormItem label="用户手机号">
              <Input v-model="renterinfo.phone" @on-change="handlePhone"></Input>
            </FormItem>
            <FormItem label="用户性别">
              <Input v-model="renterinfo.sex" @on-change="handleSex"></Input>
            </FormItem>
            <Button type="primary" @click="handleChangeInfo">修改</Button>
          </Form>
        </Card>
      </Col>-->
     
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {

      renterId: "",
      formItem: {},
      houseaddress: "",
      housestatus: "",
      furniturestatus: "",
      rentprice: "",
      payways: "",
      publicclean: "",
      electriccharge: "",
      watercharge: "",
      housesize: "",
      renterinfo: {},
      names: "",
      identify: "",
      phone: "",
      sex: "",
      //用户权限
      userstatus:""
    };
  },
  methods: {
    getRenterInfo() {
      //点击列表中的修改时 this.$router.push("/home/business?id="+params.row._id)跳转到本页面所携带的id值用his.$route.query.id接收
      let id = this.$route.query.id;
      this.$reqs
        .get("/house/renterInfo?id=" + id)
        .then(data => {
          this.formItem = data.data.data[0];
          this.renterinfo = data.data.data[0].renterinfo;
        })
        .catch();
    },
     //获取cookie值
    getcookie() {
      var cookieData = this.$cookie.get("userInfo");
      var list = JSON.parse(cookieData);
      this.cookiesList = list;
      console.log(list);
      this.userstatus = list.userstatus;
      // this.randomName=list.name;
    },
    houseAddress(e) {
      this.houseaddress = e.target.value;
    },
    houseStatus(e) {
      this.housestatus = e.target.value;
    },
    furnitureStatus(e) {
      this.furniturestatus = e.target.value;
    },
    rentPrice(e) {
      this.rentprice = e.target.value;
    },
    payWays(e) {
      this.payways = e.target.value;
    },
    electricCharge(e) {
      this.electriccharge = e.target.value;
    },
    waterCharge(e) {
      this.watercharge = e.target.value;
    },
    houseSize(e) {
      this.housesize = e.target.value;
    },
    //用户信息
    handleName(e) {},
    handleIdentify(e) {},
    handlePhone(e) {},
    handleSex(e) {},
    //修改
    handleChangeInfo() {
      this.$reqs
        .post("/house/changeInfo", {
          id: this.$route.query.id,
          houseaddress: this.houseaddress,
          housestatus: this.housestatus,
          furniturestatus: this.furniturestatus,
          rentprice: this.rentprice,
          payways: this.payways,
          publicclean: this.publicclean,
          electriccharge: this.electriccharge,
          watercharge: this.watercharge,
          housesize: this.housesize
        })
        .then(data => {})
        .catch();
      this.getRenterInfo();
    },
  
  },
  mounted() {},
  created() {
    this.getRenterInfo();
    this.getcookie();
  }
};
</script>
<style scoped>
</style>