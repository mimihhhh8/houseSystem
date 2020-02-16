<template>
  <div class="addHouseBox">
    <Card style="height:100%;padding:10px 150px;">
      <i-form :model="formItem" :label-width="80">
        <FormItem label="房屋地址">
          <Input @on-change="houseAddress"></Input>
        </FormItem>
        <FormItem label="房屋状态">
          <Input @on-change="houseStatus"></Input>
        </FormItem>
        <FormItem label="家具状态">
          <Input @on-change="furnitureStatus"></Input>
        </FormItem>
        <FormItem label="租金信息">
          <Input @on-change="rentPrice"></Input>
        </FormItem>
        <FormItem label="交租方式">
          <Input @on-change="payWays"></Input>
        </FormItem>
        <FormItem label="电费">
          <Input @on-change="electricCharge"></Input>
        </FormItem>
        <FormItem label="水费">
          <Input @on-change="waterCharge"></Input>
        </FormItem>
        <FormItem label="房屋大小">
          <Input @on-change="houseSize">平方米</Input>
        </FormItem>
        <FormItem label="房屋图片">
          <div style="width: 78px;height:78px;line-height: 58px;border:1px dashed skyblue" class="upload">
               <input type="file" @change="handelUploadPic" id="localImg" style="opacity: 0;"/>
               <div class="icon">
                  <Icon type="ios-cloud-upload" size="30"></Icon>
               </div>
          </div>
         <div class="selectedImg">
             <img :src="houseImg">
         </div>
         <Button type="primary" class="btn" @click="addHouseInfo">添加</Button>
        </FormItem>
      </i-form>
    </Card>
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
      houseImg: "",
      urlPic: ""
    };
  },
  mounted() {
      // console.log(Cookies.get('token'))
  },
  methods: {
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

    //图片上传axios实现
    handelUploadPic() {
      let imgFile = document.getElementById("localImg").files[0];
      let formData = new FormData();
      formData.append("file", imgFile);
      this.$reqs
        .post("/upload/urlImage", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(data => {
          this.houseImg = data.data.data.urlImage;
        })
        .catch();
    },
    //添加
    addHouseInfo(){
        this.$reqs
        .post("/house/addHouseInfo",{
            houseaddress:this.houseaddress,
            housestatus:this.housestatus,
            furniturestatus:this.furniturestatus,
            rentprice:this.rentprice,
            payways:this.payways,
            electriccharge:this.electriccharge,
            watercharge:this.watercharge,
            housesize:this.housesize,
            houseImg:this.houseImg
        })
        .then(data=>{
          alert(data.data.data.info)
        })
        .catch()
    }
  }
};
</script>
<style scoped lang="scss">
.addHouseBox {
  padding: 0 100px;
  min-height: 600px;
  overflow-y: auto;
}
.upload{
    float: left;
    position: relative;
    z-index: 3;
}
.icon{
  width: 1px;
  height: 1px;
  position: absolute;
  top:15px;
  left:20px;
  right: 0;
  bottom:0;
  /* margin: auto; */
  z-index: 1;
}
.selectedImg{
    float: left;
    width: 78px;
    height: 78px;
    img{
      width: 78px;
    height: 78px;  
    }
}
.btn{
    margin-top: 25px;
}
</style>