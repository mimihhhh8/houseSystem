<template>
  <div class="box">
    <Card>
      <Form :label-width="120">
        <Row :gutter="30">
          <Col :xs="24" :md="8" :lg="8" :xl="12">
            <FormItem label="选择日期" prop="onDutyDate">
              <DatePicker
                type="daterange"
                show-week-numbers
                placement="bottom-end"
                placeholder="Select date"
                style="width: 200px"
                @on-change="getDate"
              ></DatePicker>
              <!-- <Date-picker type="date" :options="options4" @on-change="getDate" placeholder="选择日期" style="width: 200px"></Date-picker> -->
              <!-- </i-col> -->
            </FormItem>
          </Col>
          <Col :xs="24" :md="8" :lg="8" :xl="8">
            <FormItem label="选择数据类型">
              <Row>
                <i-col span="14">
                  <Select v-model="model12" filterable multiple  @on-change="getType">
                    <Option v-for="(item,index) in typeList" :value="item" :key="index">{{ item }}</Option>
                  </Select>
                </i-col>
              </Row>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table :columns="columns1" :data="hourDataList"></Table>
    <Card>
      <!-- <Page :total="total" @on-change="handlePage" :current="page" size="small" show-elevator show-sizer></Page> -->
      <Page :total="total" size="small" show-elevator show-sizer @on-change="handlePage" />
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hourDataList: [],
      columns1: [
        {
          title: "时间",
          key: "a",
          render: (h, params) => {
            return <span>{params.row.hour}</span>;
          },
          width: 180
        },
        {
          title: "日期",
          key: "b",
          render: (h, params) => {
            // return <span>{params.row.date}</span>;
            return h("div", this.$moment(params.row.date).format("YYYY-MM-DD"));
          },
          width: 180
        },
        {
          title: "数据类型",
          key: "d",
          render: (h, params) => {
            return <span>{params.row.date_type}</span>;
          },
          width: 180
        },
        {
          title: "数据状态",
          key: "e",
          render: (h, params) => {
            if (params.row.date_status == 2) {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "md-heart"
                  },
                  style: {
                    color: "#e54847",
                    fontSize: "18px"
                  }
                })
              ]);
            } else {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "md-heart"
                  },
                  style: {
                    color: "#2d5231",
                    fontSize: "18px"
                  }
                })
              ]);
            }
          }
        }
      ],
      total: 1,
      //所要传的参数
      page: 1,
      limit: 10,
      startDate: "",
      endDate: "",
      typeDate:'',

      typeList: [],
      model12: [],
    };
  },
  methods: {
    handlePage(value) {
      this.page = value;
      this.getParams();
    },
    getParams() {
      this.$reqs
        .post("/dateInfo/date", {
          page: this.page,
          limit: this.limit,
          startDate: this.startDate,
          endDate: this.endDate,
          typeDate:this.typeDate
        })
        .then(data => {
          this.hourDataList = data.data.data.dataList;
          let numtotal = data.data.data.dataTotal;
          let datetotal = data.data.data.searchDate;
          let typeDateTotal = data.data.data.typeDateTotal;
         this.typeList=data.data.data.dateType;
          if(datetotal==0&&typeDateTotal==0){
              this.total=numtotal;
          }else if(typeDateTotal==0){
              this.total=datetotal;
          }else{
            this.total=typeDateTotal;
          }
        })
        .catch();
    },
    //日期查询
    getDate(value) {
      var date = value;
      //将传过来的日期组件中的日期2020-02-12转换为20200212格式的，方便传入数据库进行查询
      this.startDate = this.$moment(date[0]).format("YYYYMMDD");
      this.endDate = this.$moment(date[1]).format("YYYYMMDD");
      this.getParams();
    },
    //类型查询
    getType(value){
      this.typeDate=value;
        this.getParams();
    }
  },
  created() {},
  mounted() {
    this.getParams();
    this.handlePage(1);
  }
};
</script>
<style scoped lang="scss">
.box {
  height: 100%;
  overflow-y: auto;
}
.ivu-form-item {
  margin-bottom: 0;
}
.ivu-card-body {
  padding: 0;
}
</style>