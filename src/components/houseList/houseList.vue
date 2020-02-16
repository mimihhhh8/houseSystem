<template>
  <div class="listBox">
    <Card>
      <i-table highlight-row :columns="columns3" :data="houseLists"></i-table>

      <Page :total="total" size="small" show-elevator @on-change="handleHousePage"></Page>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //用户权限
      userstatus: "",
      columns3: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "房屋图片",
          key: "picture",
          align: "center",
          width: 260,
          render: (h, params) => {
            return h("img", {
              domProps: {
                src: params.row.houseImg
              },
              style: {
                width: "150px",
                height: "100px",
                marginTop: "10px",
                marginBottom: "10px"
              }
            });
          }
        },
        {
          title: "房屋地址",
          key: "address",
          align: "center",
          width: 400,
          render: (h, params) => {
            return <span>{params.row.houseaddress}</span>;
          }
        },
        {
          title: "房屋价格",
          key: "price",
          align: "center",
          width: 180,
          render: (h, params) => {
            return <span>{params.row.rentprice}/月</span>;
          }
        },
        {
          title: "房屋状态",
          key: "status",
          align: "center",
          width: 100,
          render: (h, params) => {
            return <span>{params.row.housestatus}</span>;
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
          render: (h, params) => {
            if (this.userstatus == "admin") {
              return h(
                "Button",
                {
                  props: { type: "primary" },
                  on: {
                    click: () => {
                      // this.$router.push("/home/business?id=" + params.row._id);
                      this.$reqs
                        .post("/house/deleteInfo", {
                          id: params.row._id
                        })
                        .then(data => {
                          alert(data.data.info);
                          this.getHouseList();
                        })
                        .catch();
                    }
                  }
                },
                "删除"
              );
            }else{
                if(params.row.housestatus=='空置'){
                  return h("Button",{
                    props:{type:"primary"}
                  },"预约看房")
                }
            }
          }
        }
      ],
      houseLists: [],
      //分页
      total: 0,
      page: 1,
      limit: 10,
      
    };
  },
  methods: {
    getHouseList() {
      this.$reqs
        .post("/house/addHouseList", {
          page: this.page,
          limit: 10
        })
        .then(data => {
          this.houseLists = data.data.data.data;
          this.total = data.data.data.total;
        })
        .catch();
    },
    handleHousePage(value) {
      this.page = value;
      this.getHouseList();
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
    //删除
  },
  created() {
    this.getHouseList();
    this.getcookie();
  }
};
</script>
<style scoped>
.listBox {
  min-height: 700px;
  overflow-y: auto;
}
</style>