<template>
	<div>
    <Card>
      <p slot="title">
        币币委托详情
        <!-- <Button type="primary" size="small" @click="refreshPageManual">
          <Icon type="refresh"></Icon>
          刷新
        </Button> -->
      </p>

			<div class="baseInfo">
				<Row>
					<Col span="6">
						<p>委托单号：<span></span></p>
					</Col>
					<Col span="6">
						<p>状态：<span></span></p>
					</Col>
					<Col span="6">
						<p>委托时间：<span></span></p>
					</Col>
					<Col span="6">
						<p>委托类型：<span></span></p>
					</Col>
				</Row>
				
				<Row>
					<Col span="6">
						<p>委托价格：<span></span></p>
					</Col>
					<Col span="6">
						<p>委托数量：<span></span></p>
					</Col>
					<Col span="6">
						<p>成交数量：<span></span></p>
					</Col>
					<Col span="6">
						<p>成交金额：<span></span></p>
					</Col>
				</Row>
			</div>
      


    </Card>
		<br><br>
		<Card>
			<p slot="title">
        交易记录
      </p>
			<Row>
				<Table 
					:columns="columnsList" 
					:data="userpage" 
					border 
					:loading="ifLoading"
					class='user_center'>
				</Table>
      </Row>

      <Row class="pageWrapper" >
        <Page :total="totalNum" style='margin-top:8px' :current="current"   @on-change="changePage" show-elevator></Page>
      </Row>
		</Card>
  </div>
</template>

<script>
import dtime from 'time-formater'
import { exgOrderDetail  } from '@/service/getData';
import { setStore, getStore, removeStore } from '@/config/storage';


export default {
  data () {
    return {
      currentPageIdx: null,
      totalNum: null,
      ifLoading: true,
      current:1,
      pageIndex:1,
      columnsList: [
        {
          title: '订单号',
          key: 'orderId'
        },
        {
          title: '挂单价格',
          key: 'price'
        },
        {
          title: '挂单量',
          key: 'amount'
        },
        {
          title: '手续费',
          key: 'fee'
        },
        {
          title: '交易时间',
          key: 'time',
          render: (h, obj) => {
            let formatTime = dtime(obj.row.time).format('YYYY-MM-DD HH:mm:ss')
            return h('span',{},formatTime)
          }
        },
      ],
      userpage: []
    }
  },
  methods: {
    refreshPageManual() {
      this.ifLoading = true;
      this.refreshPage({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    changePage(pageIndex) {
      this.ifLoading = true;
      this.currentPageIdx = pageIndex;
      this.refreshPage({ pageNo: pageIndex, pageSize: 10 });
    },
    refreshPage() {
      //无分页字段
      let orderID = getStore('exchangeOrderId');
      
      exgOrderDetail({ id: orderID })
      .then( res => {
        this.userpage = res.data;
        this.totalNum = res.data.length;
        this.ifLoading = false;
      })
    }
  },
  created() {
    this.refreshPage();
  }
}
</script>

<style lang="less" scoped>
  
</style>