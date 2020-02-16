<template>
  <div class="box">
    <div class="login_box">
      <div class="logo">
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3744878180,3958432434&fm=26&gp=0.jpg"
          alt
        />
      </div>
      <div class="user_login">
        <div class="form-group">
          <label for="login_username">用户名:</label>
          <input
            type="text"
            class="form-control"
            id="login_username"
            placeholder="请输入用户名"
            v-model="userName"
          />
        </div>
        <div class="form-group">
          <label for="login_password">密码:</label>
          <input
            type="password"
            class="form-control"
            id="login_password"
            placeholder="请输入密码"
            v-model="userPass"
          />
        </div>
        <router-link to="/login">
          <p class="bg-info">已有账号,立即登录</p>
        </router-link>
        <i-button type="primary" class="btn btn-primary user_btn" @click="registerUserInfo">立即注册</i-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      userPass: ""
    };
  },
  methods: {
    registerUserInfo() {
      this.getRequest();
    },
    getRequest() {
      var userName = this.userName;
      var password = this.userPass;
      this.$reqs
        .post("/users/register", {
          username: userName,
          password: password
        })
        .then(data => {
          alert(data.data.data.info)
        })
        .catch();
    }
  },
  created() {
    // this.getRequest();
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  /* background: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3544467282,3771364011&fm=26&gp=0.jpg") no-repeat; */
  background: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 360px;
  height: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
}
.logo {
  width: 100%;
  height: 100px;
  img {
    width: 100%;
    height: 100px;
    border: none;
  }
}
.user_login {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
.form-group {
  height: 50px;
  line-height: 50px;
  padding: 10px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 200px;
    height: 30px;
    border: 1px solid #ccc;
    margin-left: 30px;
  }
}
.bg-info {
  line-height: 30px;
  cursor: pointer;
  margin-top: 15px;
}
.user_container {
  width: 364px;
  height: 400px;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
}
.user_btn {
  width: 200px;
  height: 35px;
  margin-top: 20px;
}
</style>