<template>
  <div class="box">
    <Card class="box_card">
      <Row>
        <!-- 根据房屋地址查询 -->
        <i-col :xs="24" :sm="6" :md="6" :lg="8">
          <Form :model="formItem" :label-width="80">
            <FormItem label="地址查询">
              <Input :value.sync="formItem.input" placeholder="请输入" @on-change="handleKeyWords"></Input>
            </FormItem>
          </Form>
        </i-col>
        <!-- 房屋出租状态 -->
        <i-col :xs="24" :sm="12" :md="12" :lg="8">
          <Form :model="formItem" :label-width="80">
            <FormItem label="出租状态">
              <Row>
                <i-col span="16">
                  <i-select :model.sync="model12" filterable multiple @on-change="getRentType">
                    <i-option v-for="item in rentTypeList" :value="item">{{ item}}</i-option>
                  </i-select>
                </i-col>
              </Row>
            </FormItem>
          </Form>
        </i-col>
        <i-col :xs="24" :sm="6" :md="6" :lg="8"></i-col>
      </Row>
    </Card>
    <Table highlight-row ref="currentRowTable" :columns="columns3" :data="houseList"></Table>
    <Card>
      <Page :total="count" size="small" show-elevator show-sizer @on-change="handlePage" />
    </Card>
  </div>
</template>
<script>
import { skyblue } from "color-name";
export default {
  data() {
    return {
      //地址查询
      keyWords: "",
      formItem: {
        input: ""
      },
      //房屋信息渲染
      columns3: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "房屋地址",
          key: "address",
          render: (h, params) => {
            return <span>{params.row.houseaddress}</span>;
          },
          width: 300,
          align: "center"
        },
        {
          title: "房屋状态",
          key: "status",
          render: (h, params) => {
            return <span>{params.row.housestatus}</span>;
          },
          width: 100,
          align: "center"
        },
        {
          title: "家具状态",
          key: "furniture",
          render: (h, params) => {
            return <span>{params.row.furniturestatus}</span>;
          },
          width: 100,
          align: "center"
        },
        {
          title: "租金信息",
          key: "rentprice",
          render: (h, params) => {
            return <span>{params.row.rentprice}/月</span>;
          },
          width: 100,
          align: "center"
        },
        {
          title: "交租方式",
          key: "payways",
          render: (h, params) => {
            return <span>{params.row.payways}</span>;
          },
          width: 100,
          align: "center"
        },
        {
          title: "电费",
          key: "electriccharge",
          render: (h, params) => {
            return <span>{params.row.electriccharge}元/度</span>;
          },
          width: 100,
          align: "center"
        },
        {
          title: "房屋大小",
          key: "housesize",
          render: (h, params) => {
            return <span>{params.row.housesize}平方米</span>;
          },
          width: 120,
          align: "center"
        },
        {
          title: "修改",
          key: "change",

          render: (h, params) => {
            if (this.userstatus == "admin") {
              return h(
                "Button",
                {
                  props: { type: "primary" },
                  on: {
                    click: () => {
                      this.$router.push("/home/business?id=" + params.row._id);
                    }
                  }
                },
                "修改"
              );
            }else{
              return <span>暂无权限</span>
            }
          },
          width: 120,
          align: "center"
        },
        {
          title: "操作",
          key: "handle",
          render: (h, params) => {
            if (this.userstatus == "admin") {
              if (params.row.housestatus == "已租") {
                return h(
                  "Button",
                  {
                    props: {
                      type: "primary"
                    },
                    style: {
                      display: "flex"
                    },
                    on: {
                      click: () => {
                        this.$router.push(
                          "/home/rentHouse?id=" + params.row._id
                        );
                      }
                    }
                  },
                  "租户信息"
                );
              } else {
                return h(
                  "Button",
                  {
                    props: {
                      type: "info"
                    },
                    style: {
                      display: "flex",
                      background: skyblue
                    },
                    on: {
                      click: () => {
                        this.$router.push(
                          "/home/fixPrice?id=" + params.row._id
                        );
                      }
                    }
                  },
                  "添加信息"
                );
              }
            } else {
              return <span>暂无权限</span>;
            }
          },
          width: 120,
          align: "center"
        }
      ],

      //分页
      count: 0,
      page: "",
      limit: 10,
      keyWords: "",
      houseList: [],
      keyWordsCount: 0,
      //房屋出租状态
      rentTypeList: [],
      rentType: "",
      model11: "",
      model12: []
    };
  },
  methods: {
    //分页
    handlePage(value) {
      this.page = value;
      this.getparams();
    },
    //传参..根据房屋地址关键字搜索
    handleKeyWords(e) {
      this.keyWords = e.target.value;
      this.getparams();
    },
    getparams() {
      this.$reqs
        .post("/house/searchAddress", {
          page: this.page,
          limit: this.limit,
          keyWords: this.keyWords,
          rentTypes: this.rentType
        })
        .then(data => {
          this.houseList = data.data.data.dataList;
          let count = data.data.data.count;
          let keyWordsCount = data.data.data.keyWordsCount;
          this.rentTypeList = data.data.data.rentType;
          let rentTypeCount = data.data.data.rentTypeCount;
          let bothCount = data.data.data.bothCount;

          if (keyWordsCount == count && rentTypeCount == 0 && bothCount == 0) {
            this.count = count;
          } else if (rentTypeCount == 0 && bothCount == 0) {
            this.count = keyWordsCount;
          } else if (keyWordsCount == count && bothCount == 0) {
            this.count = rentTypeCount;
          } else {
            this.count = bothCount;
          }
        })
        .catch();
    },
    //房屋出租状态搜索
    getRentType(value) {
      this.rentType = value;
      this.getparams();
    },
    //获取cookie值
    getcookie() {
      var cookieData = this.$cookie.get("userInfo");
      var list = JSON.parse(cookieData);
      this.cookiesList = list;
      console.log(list);
      this.userstatus = list.userstatus;
      // this.randomName=list.name;
    }
  },
  created() {
    this.handlePage(1);
    this.getparams();
    this.getcookie();
  }
};
</script>
<style scoped>
.box {
  height: 100%;
  overflow-y: auto;
}
.ivu-card-body {
  padding: 0;
}
/* .box_card {
  height: 80px;
} */
</style>