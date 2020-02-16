<template>
  <div>
    <div class="userInformation">
      <Dropdown>
        <a href="javascript:void(0)" class="user_a">
          用户个人信息
          <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item>
            <Button type="primary" @click="modal1 = true">修改密码</Button>
            <Modal v-model="modal1" title="修改个人密码" @on-ok="ok" @on-cancel="cancel">
              <Card dis-hover>
                <Form :label-width="120">
                  <FormItem label="旧密码">
                    <Input type="password" @on-change="handleOldPass"></Input>
                  </FormItem>
                  <FormItem label="新密码">
                    <Input type="password" @on-change="handleNewPass"></Input>
                  </FormItem>
                  <FormItem label="重复新密码">
                    <Input type="password" @on-change="handleRepeatPass"></Input>
                  </FormItem>
                </Form>
              </Card>
            </Modal>
          </Dropdown-item>
          <Dropdown-item>
            <Button type="primary" @click="modal2=true">修改头像</Button>
            <Modal
              v-model="modal2"
              title="修改个人头像"
              @on-ok="handleHeadPicOk"
              @on-cancel="handleHeadPicCancel"
            >
              <!-- form表单模拟图片上传 -->
              <input type="file" @change="handelUploadPic" id="localImg" />
              <!-- <img :src="headPic"> -->
            </Modal>
          </Dropdown-item>
          <Dropdown-item disabled>
            <Button type="primary" @click="logOut">退出登录</Button>
          </Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
    <div class="headPhoto">
      <img :src="urlPic" />
    </div>
    <div class="resetPass">
      <div
        class="modal fade bs-example-modal-sm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
      >
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">...</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme1: "light",
      list: [],
      //修改密码
      modal1: false,
      modal2: false,
      modal3: false,
      oldPass: "",
      newPass: "",
      repeatPass: "",
      //上传图片
      headPic: "",
      //修改头像
      urlPic: "",
      id: "",
      randomName:"",
      cookiesList:{}
    };
  },
  methods: {
    getcookie() {
      var cookieData = this.$cookie.get("userInfo");
      var list = JSON.parse(cookieData);
      this.cookiesList=list;
      console.log(list)
      this.urlPic = list.urlPic;
      this.id = list._id;
      // this.randomName=list.name;
    },
    //修改密码得到模态框输入的值
    handleOldPass(e) {
      this.oldPass = e.target.value;
    },
    handleNewPass(e) {
      this.newPass = e.target.value;
    },
    handleRepeatPass(e) {
      this.repeatPass = e.target.value;
    },
    //修改密码走接口
    ok() {
      this.$reqs
        .post("/users/password", {
          id: this.id,
          oldpassword: this.oldPass,
          newpassword: this.newPass
        })
        .then(data => {
          if (this.newPass != this.repeatPass) {
            alert("两次密码不一致");
          } else {
            if (data.data.data.info == "密码修改成功请重新登录") {
              // this.$cookies.remove('userInfo');
              alert(data.data.data.info);
              this.$router.push("/login");
            } else {
              alert(data.data.data.info);
            }
          }
        })
        .catch();
    },
    cancel() {},
    //头像上传
    handleHeadPicOk() {
      let id=this.id;
      let headPic=this.urlPic;
      this.$reqs
      .post("/users/urlPic",{
        id:id,
        headPic:headPic
      })
      .then(data=>{
        if(data.data.data.info=="修改头像成功"){
          alert(data.data.data.info)
          this.cookiesList.urlPic=this.urlPic;
         this.$cookie.set("userInfo",JSON.stringify(this.cookiesList));
        }
        
          
      })
      .catch()
    },
    handleHeadPicCancel() {},

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
          this.urlPic = data.data.data.urlImage;
        })
        .catch();
    },
    //退出登录
    logOut(){
      // this.$cookie.remove("userInfo",{path:'/'})
    }
  },
  created() {
    this.getcookie();
  }
};
</script>
<style scoped lang="scss">
/* .title{
    float: left;
} */
.userInformation {
  float: left;
  margin-right: 70px;
}
.headPhoto {
  float: right;
  width: 64px;
  height: 64px;
  background: red;
  overflow: hidden;
  /* padding: 10px; */
  border-radius: 64px;
  img {
    width: 100%;
    height: 100%;
  }
}
.user_a {
  text-decoration: none;
}
//模态框
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>