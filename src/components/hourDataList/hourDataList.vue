<template>
  <div>
    <Card>
      <Form>
          <!-- <Row>
              <Col :xs="24" :md="16" :lg="8" :xl="8">

              </Col>
              <Col :xs="24" :md="16" :lg="8" :xl="8">
                    
              </Col>
          </Row> -->
        <Row :gutter="20">
          <Col :xs="24" :md="18" :lg="18" :xl="18">
            <DatePicker type="daterange" show-week-numbers placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
          </Col>
          <Col :xs="24" :md="6" :lg="6" :xl="2">
            <!-- <Button type="primary" @click="add">查询</Button> -->
          </Col>
        </Row>
      </Form>
    </Card>
    <!-- <Table :columns="columns1" :data="data1"></Table> -->
    <Table :columns="columns1" :data="hourDataList"></Table>
  </div>
</template>
<script src="./hourDataList.js"></script>
<style scoped>
</style>