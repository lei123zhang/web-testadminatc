<style lang="less">
@import "./home.less";
</style>
<template>
	<div class="home-main">
		<Row :gutter="10">
			<Row :gutter="10">
					<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
							<infor-card
									id-name="user_created_count"
									:end-val=parseInt(count.createUser)
									iconType="android-person-add"
									color="#2d8cf0"
									intro-text="新增客户"
							></infor-card>
					</Col>
					<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
							<infor-card
									id-name="visit_count"
									:end-val=parseInt(count.visit)
									iconType="ios-eye"
									color="#64d572"
									:iconSize="50"
									intro-text="新增浏览"
							></infor-card>
					</Col>
					<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
							<infor-card
									id-name="collection_count"
									:end-val=parseInt(count.collection)
									iconType="upload"
									color="#ffd572"
									intro-text="新增订单"
							></infor-card>
					</Col>
					<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
							<infor-card
									id-name="transfer_count"
									:end-val=parseInt(count.transfer)
									iconType="shuffle"
									color="#f25e43"
									intro-text="成交订单"
							></infor-card>
					</Col>
			</Row>
			<!-- <Col :md="24" :lg="8 " style='display:none'>
				<Row class-name="home-page-row1" :gutter="10">
					<Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
						<Card>
							<Row type="flex" class="user-infor">
									<Col span="8">
											<Row class-name="made-child-con-middle" type="flex" align="middle">
													<img class="avator-img" :src="avatorPath" />
											</Row>
									</Col>
									<Col span="16" style="padding-left:6px;">
											<Row class-name="made-child-con-middle" type="flex" align="middle">
													<div>
															<b class="card-user-infor-name">Admin</b>
															<p>super admin</p>
													</div>
											</Row>
									</Col>
							</Row>
							<div class="line-gray"></div>
							<Row class="margin-top-8" >
								<Col span="8"><p class="notwrap">上次登录时间:</p></Col>
								<Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
							</Row>
							<Row class="margin-top-8">
								<Col span="8"><p class="notwrap">上次登录地点:</p></Col>
								<Col span="16" class="padding-left-8">北京</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Col> -->
		</Row>
		<Card style="margin-bottom:10px;">
				<p slot="title">
					<Icon type="email-unread"></Icon>
					待处理事务
				</p>
				
				<Row span="24" class='clthing'>
					<Col span="9" offset="1" class="od_bottom" >
            <div @click="goOtcRouter(0)">
              <span style='padding-left:10px'>已取消订单</span> 
              <span class='fir_span'>(<span class='od_right'>{{ orderData.cancelNum }}</span>)</span>
            </div>
          </Col>
					<Col span="9" offset="4" class="od_bottom">
            <div @click="goMemberCheck">
              <span style='padding-left:10px'>实名会员审核</span>  
              <span class='fir_span'>(<span class='od_right'>{{ memberCheck }}</span>)</span>
            </div>
          </Col>
				</Row>
				<Row span="24" class='clthing'>
					<Col span="9" offset="1" class="od_bottom">
            <div @click="goOtcRouter(1)">
              <span style='padding-left:10px'>未付款订单</span>  
              <span class='fir_span'>(<span class='od_right'>{{ orderData.noPayNum }}</span>)</span>
            </div>
          </Col>

          <Col span="9" offset="4" class="od_bottom">
            <div @click="goBusinessCheck">
              <span style='padding-left:10px'>商家认证审核</span>  
              <span class='fir_span'>(<span class='od_right'>{{ businessCheck }}</span>)</span>
            </div>
          </Col>
				</Row>
         <Row span="24" class='clthing' >
					<Col span="9" offset="1" class="od_bottom">
            <div @click="goOtcRouter(2)">
              <span style='padding-left:10px'>已付款订单</span> 
              <span class='fir_span'>(<span class='od_right'>{{ orderData.finishedNum }}</span>)</span>
            </div>
          </Col>
					<Col span="9" offset="4" class="od_bottom">
            <div @click="goOtcRouter(4)">
              <span style='padding-left:10px'>申诉中订单</span>  
              <span class='fir_span'>(<span class='od_right'>{{ orderData.appealNum }}</span>)</span>
            </div>
          </Col>
				</Row>
				<Row span="24" class='clthing clthings' >
					<Col span="9" offset="1" class="od_bottoms">
            <div @click="goOtcRouter(3)">
              <span style='padding-left:10px'>已完成订单</span> 
              <span class='fir_span'>(<span class='od_right'>{{ orderData.paidNum }}</span>)</span>
            </div>
          </Col>
					
				</Row>
       
		</Card>
		<!-- <Card style="margin-bottom:10px;">
				<p slot="title">
						<Icon type="paper-airplane"></Icon>
						快捷操作入口
				</p>
				<Row class='ho_in'>
						<Col span="2" v-for="val in rukouname" :key="val.id">
								<div>
								<Row type="flex" justify="center" class="code-row-bg">
										<Col span="18" class='ho_inimg'><img src="../../images/letin.png"/></Col>
										<Col span="18" style='font-size:15px'>{{val.rname}}</Col>
								</Row>
								</div>
						</Col>
				</Row>
		</Card> -->
<!-- 		
		<Row class="margin-top-10" >
				<Card>
						<p slot="title" class="card-title">
								<Icon type="ios-shuffle-strong"></Icon>
								上周每日服务调用量(万)
						</p>
						<div class="line-chart-con">
								<service-requests></service-requests>
						</div>
				</Card>
		</Row> -->
	</div>
</template>

<script>
import cityData from "./map-data/get-city-value.js";
import homeMap from "./components/map.vue";
import dataSourcePie from "./components/dataSourcePie.vue";
import visiteVolume from "./components/visiteVolume.vue";
import serviceRequests from "./components/serviceRequests.vue";
import userFlow from "./components/userFlow.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";
import mapDataTable from "./components/mapDataTable.vue";
import toDoListItem from "./components/toDoListItem.vue";

import { dashBoardInfo, signIn, MemberRealNameList, memberManage } from "@/service/getData";
import { setStore, getStore, removeStore } from "@/config/storage";
import { otherRouter, appRouter } from "@/router/router.js";

import Main from "@/views/Main.vue";

import { orderNum } from "@/service/getData";

export default {
  name: "home",
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      businessCheck: '',
      memberCheck: '',
      orderData: {},
      count: {
        createUser: "",
        visit: "",
        collection: "",
        transfer: ""
      },

      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: "",
      rukouname: [
        { imgs: "../images/tianjia.png", rname: "会员管理", rrouter: "" },
        { imgs: "./images/letin.png", rname: "角色管理", rrouter: "" },
        { imgs: "/images/letin.png", rname: "用户管理", rrouter: "" },
        { imgs: "images/letin.png", rname: "系统日志", rrouter: "" },
        { imgs: "../../../images/letin.png", rname: "图片管理", rrouter: "" },
        { imgs: "../../images/letin.png", rname: "文章管理", rrouter: "" },
        { imgs: "../../images/letin.png", rname: "帮助管理", rrouter: "" },
        { imgs: "../../images/letin.png", rname: "帮助管理", rrouter: "" }
      ]
    };
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath;
    }
  },
  methods: {
    goBusinessCheck() {
      this.$router.push({ path: '/otc/businessaudit', query: { status: 1 }});

    },
    goMemberCheck() {
      this.$router.push({ path: '/member/memberaudit', query: { status: 0 }});
      
    },
    goRouter() {
      // alert(12132)
    },
    goOtcRouter(status) {
      // router.push({ path: 'register', query: { plan: 'private' }})
      // this.$router.push({ path: '/otc/orderManage'});
      this.$router.push({ path: '/otc/orderManage', query: { status: status }});
      
    },
    addNewToDoItem() {
      this.showAddNewTodo = true;
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        });
        setTimeout(() => {
          this.newToDoItemValue = "";
        }, 200);
        this.showAddNewTodo = false;
      } else {
        this.$Message.error("请输入待办事项内容");
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false;
      this.newToDoItemValue = "";
    }
  },
  beforeCreate() {
    //初始化侧边栏
  },
  created() {
    memberManage({status: 1})
    .then( res => {
      if(!res.code) {
        
       this.businessCheck = res.data.totalElements;
        
      }else this.$Message.error(res.message);
    } )
    .catch( err => console.log(err))
    

    MemberRealNameList({ auditStatus: 0 })
    .then( res => {
      if(!res.code) {
       this.memberCheck = res.data.totalElements;
        
      }else this.$Message.error(res.message);
    } )
    .catch( err => console.log(err))


    orderNum()
      .then(res => {
        if (!res.code) {
          this.orderData = res.data;
        } else this.$Message.error(res.message);
        console.log();
      })
      .catch(err => console.log(err));

    dashBoardInfo()
      .then(res => {
        // console.log(res);
        this.count.createUser = parseInt(res.data.regMember);
        this.count.visit = parseInt(res.data.completedOrderNum);
        this.count.collection = parseInt(res.data.appealOrderNum);
        this.count.transfer = parseInt(res.data.orderNum);
      })
      .catch(err => console.log(err));
  }
};
  
</script>

<style>
.ho_header {
  background: #ddd;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.clthing {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 10px 10px;
  background: #fff;
}
.clthings {
  border-bottom: 1px solid #ccc;
}
.od_bottom {
  border-bottom: 2px solid #ccc;
  padding: 10px 0px;
  font-size: 15px;
  font-weight: 500;
}
.od_bottoms {
  padding: 10px 0px;
  font-size: 15px;
  font-weight: 500;
}
.od_right {
  color: red;
}
.fir_span {
  float: right;
  padding-right: 10px;
}
.ho_in {
  text-align: center;
  padding: 20px 0px 0px 10px;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
}
.ho_inimg {
  height: 55px;
}
.ho_inimg img {
  width: 60%;
  height: 75%;
}
.od_bottom:hover, .od_bottoms:hover{
  cursor: pointer;
  background-color: #ebf7ff;
}
</style>
