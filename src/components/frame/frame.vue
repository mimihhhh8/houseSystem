<template>
  <div class="home">
    <div class="layout">
      <Layout style="height:calc(100vh-64px)">
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">房屋租赁系统</div>
            <div class="layout-nav">
              <MenuItem name="3" class="userInfo">
                <UserInfo />
              </MenuItem>
            </div>
          </Menu>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>租前管理
                </template>
                <!-- <router-link to="/home/hourDataList">
                  <MenuItem name="1-1">房源管理</MenuItem>
                </router-link>-->
                <!-- <router-link to="/home/date">
                  <MenuItem name="1-4">date</MenuItem>
                </router-link>-->
                <router-link to="/home/houseList">
                  <MenuItem name="1-2">房源列表</MenuItem>
                </router-link>
                <router-link to="/home/addHouse">
                <!-- v-if="userstatus=='unadmin'" -->
                  <MenuItem name="1-1" >添加房源</MenuItem>
                </router-link>
                <router-link to="/home/housingResource">
                  <MenuItem name="1-3">房源管理</MenuItem>
                </router-link>
                <router-link to="/home/fixPrice">
                  <MenuItem name="1-4">添加租户信息</MenuItem>
                </router-link>
                <router-link to="/home/business">
                  <MenuItem name="1-5">商机管理</MenuItem>
                </router-link>
                <router-link to="/home/orderLookHouse">
                  <MenuItem name="1-6">预约看房</MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>租中管理
                </template>
                <router-link to="/home/rentHouse">
                  <MenuItem name="2-1">租户信息</MenuItem>
                </router-link>
                <router-link to="/home/contract">
                  <MenuItem name="2-2">合同管理</MenuItem>
                </router-link>
                <router-link to="/home/cost">
                  <MenuItem name="2-3">费用管理</MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>租后服务
                </template>
                <MenuItem name="3-1">装修管理</MenuItem>
                <MenuItem name="3-2">住户管理</MenuItem>
                <MenuItem name="3-3">出入管理</MenuItem>
                <MenuItem name="3-4">维修管理</MenuItem>
                <MenuItem name="3-5">客户关系管理</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}"></Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import UserInfo from "../userInfo/userInfo.vue";
export default {
  name: "home",
  components: {
    UserInfo
  },
  data() {
    return {
      userstatus:''
    };
  },
  methods: {
    getcookie() {
      var cookieData = this.$cookie.get("userInfo");
      var list = JSON.parse(cookieData);
      this.cookiesList = list;
      // console.log(list);
      this.userstatus = list.userstatus;
      // this.randomName=list.name;
    }
  },
  created() {
    this.getcookie();
  }
};
</script>
<style scoped>
.ivu-layout-sider-children,
.ivu-layout {
  min-height: 700px;
  overflow-y: auto;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 200px;
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  color: #ffffff;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.userInfo {
  margin-left: 100px;
}
</style>
