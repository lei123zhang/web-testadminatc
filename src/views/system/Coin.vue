<template>
<div>
  <Card>
		<p slot="title">
        币种管理
			<Button type="primary" size="small" @click="refreshPageManual">
				<Icon type="refresh"></Icon>刷新
			</Button>
		</p>

		<Row class="functionWrapper">
			<div class="btnsWrapper clearfix">
				<Button type="primary" @click="addCoin">添加币种</Button>
			</div>
		</Row>

		<Row>
			<Table 
				:columns="columnsList" 
				:data="userpage" 
				border
				:loading="ifLoading">
			</Table>
		</Row>

		<div class="pageWrapper">
			<Page  
				:total="totalNum" 
				:current="currentPageIdx"   
				@on-change="changePage" 
				show-elevator>
			</Page>
		</div>
  </Card>      

  <Modal
		v-model="showDetailModal"
		width="400"
		title="详细信息">
		<p>最小交易手续费: {{ detailModal.minTxFee}}</p>
		<p>最大交易手续费: {{ detailModal.maxTxFee}}</p>
		<p>最小提币数量: {{ detailModal.minWithdrawAmount}}</p>
		<p>最大提币数量: {{ detailModal.maxWithdrawAmount}}</p>
  </Modal>

  <Modal
		v-model="showUpdateModel"
		title="币种信息修改"
		@on-cancel="cancelSub"
		@on-ok="showNeedCode">
		<Form :model="coinForm" :label-width="80" class='form'>
			<FormItem label="中文名称:">
				<Input v-model="coinForm.nameCn"></Input>
			</FormItem>
			<FormItem label="英文名称:">
				<Input v-model="coinForm.name"></Input>
			</FormItem>
			<FormItem label="币种单位:">
				<Input v-model="coinForm.unit"></Input>
			</FormItem>
			<FormItem label="冷钱包地址:">
				<Input v-model="coinForm.coldWalletAddress"></Input>
			</FormItem>

			<Row>
				<Col span="8">
					<FormItem label="充值">
						<i-switch v-model="coinForm.canRecharge" :true-value="1" :false-value="0" size="large">
							<span slot="open">开放</span>
							<span slot="close">禁止</span>
						</i-switch>
					</FormItem>
				</Col>
				<Col span="8">
					<FormItem label="RPC">
						<i-switch v-model="coinForm.enableRpc" :true-value="1" :false-value="0" size="large">
							<span slot="open">开放</span>
							<span slot="close">禁止</span>
						</i-switch>
					</FormItem>
				</Col>
				<Col span="8">
					<FormItem label="提现">
						<i-switch v-model="coinForm.canWithdraw" :true-value="1" :false-value="0" size="large">
							<span slot="open">启用</span>
							<span slot="close">禁用</span>
						</i-switch>
					</FormItem>
				</Col>
			</Row>

				<Row>
					<Col span="12">
						<FormItem label="最小手续费:">
							<Input  v-model="coinForm.minTxFee" ></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="最大手续费:">
							<Input  v-model="coinForm.maxTxFee" ></Input>
						</FormItem>
					</Col>
				</Row>

				<Row>
					<Col span="12">
						<FormItem label="最小提币量:">
							<Input v-model="coinForm.minWithdrawAmount" ></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="最大提币量:">
							<Input v-model="coinForm.maxWithdrawAmount" ></Input>
						</FormItem>
					</Col>
				</Row>
				
				<Row>
					<Col span="8">
						<FormItem label="自动转账">
							<i-switch v-model="coinForm.canAutoWithdraw" :true-value="1" :false-value="0"  size="large">
								<span slot="open">启用</span>
								<span slot="close">禁用</span>
							</i-switch>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem label="状态">
							<i-switch v-model="coinForm.status" :true-value="0" :false-value="1" size="large">
								<span slot="open">启用</span>
								<span slot="close">禁用</span>
							</i-switch>
						</FormItem>
					</Col>
					<Col span="8">
						<FormItem label="矿工费:">
							<Input v-model="coinForm.minerFee"></Input>
						</FormItem>
					</Col>
				</Row>

				<Row>
					<Col span="12">
						<FormItem label="阀值:">
							<Input v-model="coinForm.withdrawThreshold"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="排序:">
							<Input v-model="coinForm.sort"></Input>
						</FormItem>
					</Col>
				</Row>

				<Row>
					<Col span="12">
						<FormItem label="人民币汇率:">
							<Input v-model="coinForm.cnyRate"></Input>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="美元汇率:">
							<Input v-model="coinForm.usdRate"></Input>
						</FormItem>
					</Col>
				</Row>
		</Form>
  </Modal>

	<Modal
		title="修改币种信息"
		v-model="showPhoneCodeModal"
		width="350"
		@on-ok="confirmSub"
		@on-cancel="cancelSub">
		<Row>
			<p>验证码已发送至：<span style="color: #ed3f14">{{ phoneNum | hidePhoneNumFilter}}</span></p>
		</Row>
		<br>
		<Row>
			<Input placeholder="请输入验证码" v-model="coinForm.code" :class="{appendBtn: count===0}">
				<Button slot="append" v-if="count>0" :disabled="count>0">{{count}}s后重新获取</Button>
				<Button slot="append" v-else-if="count===0" type="success" @click="getCodeTwice('fixedInfo')">获取验证码</Button>
			</Input>
		</Row>
	</Modal>

	<Modal
		title="转入冷钱包"
		v-model="showColdWalletModal"
		width="380"
		>
		<Form :model="coldWalletForm" :label-width="90" :rules="coldWalletRule">
			<FormItem label="币种：">
				<span>{{ coldWalletForm.unit }}</span>
			</FormItem>
			<FormItem label="转入金额：" prop="amount">
				<Input v-model="coldWalletForm.amount"></Input>
				<p class="transferTips">可转入金额：<span>{{ enableTransferCoin }}</span></p>
			</FormItem>

			<FormItem label="手机号：" v-show="needCord">
				<Input placeholder="请输入验证码" :disabled="true" :value="phoneNum | hidePhoneNumFilter" :class="{appendBtn: count===0}">
					<Button slot="append" v-if="count>0" :disabled="count>0">{{count}}s后重新获取</Button>
					<Button slot="append" v-else-if="count===0" type="success" @click="getCodeTwice('coldWallet')">获取验证码</Button>
				</Input>
			</FormItem>

			<FormItem label="验证码：" prop="code" v-show="needCord">
				<Input v-model="coldWalletForm.code"></Input>
			</FormItem>
			
		</Form>
		<Row slot="footer">
			<Col span="11">
				<Button type="info" long @click="confirmSubCodeWallet">转入冷钱包</Button>
			</Col>
			<Col span="11" offset="2">
				<Button long @click="cancelSub">取消</Button>
			</Col>
		</Row>
	</Modal>
</div>
</template>

<script>
import Cookies from 'js-cookie'
import { getStore, setStore, removeStore } from '@/config/storage'
import { addCoinWallet, ifExistWallet, tansTimeout, transferColdWallet, getColdWalletCode, setPlatformCoin, coinReviseSys, employeeDetail, querySysCoin, addSysCoin, updateSysCoin, sysCoinDetail } from '@/service/getData'

export default {
  data() {
    return {
			needCord: true,
			enableTransferCoin: 0,
			coldWalletForm: {
				unit: '',
				amount: '',
				code: ''
			},
			coldWalletRule: {
				amount: [
					{ required: true, message: '请输入转出数量', trigger: 'blur' }
				],
				code: [
					{ required: true, message: '请输入验证码', trigger: 'blur' }
				]
			},
			phoneNum: '',
			count: 0,
			timer: '',
			showPhoneCodeModal: false,
			showColdWalletModal: false,
			ifCreate: true,
			userpage: [],
			filterSearch: {
				pageNo: 1,
				pageSize: 10,
				property: [],
				direction: []
			},
      totalNum: null,
      ifLoading: true,
      currentPageIdx: 1,
      showDetailModal: false,
      showUpdateModel: false,
			detailModal: {},
      coinForm: { //可优化 不建议定义好字段
				code: '',
				name: '',
				nameCn: '',
				unit: '',
				canWithdraw: 0,
				canRecharge: 0,
				sort: '',
				status: '',
				minTxFee: '',
				cnyRate: '',
				usdRate: '',
				maxTxFee: '',
				minerFee: '',
				enableRpc: 0,
				canAutoWithdraw: 0,
				withdrawThreshold: '',
				maxWithdrawAmount: '',
				minWithdrawAmount: '',
				coldWalletAddress: ''
			},
      columnsList: [
        {
          title: "中文名",
          key: "nameCn"
        },
        {
          title: "名称(英文)",
          key: "name"
        },
        {
          title: "币种缩写",
          key: "unit"
        },
        {
          title: "支持提现",
          key: "canWithdraw",
          render: (h, obj) => {
            const row = obj.row;
            const canWithdraw = row.canWithdraw !== 0 ? "是" : "否";
            return h("span", {}, canWithdraw);
          }
        },
        {
          title: "支持充值",
          key: "canRecharge",
          render: (h, obj) => {
						const row = obj.row;
            const canRecharge = row.canRecharge !== 0 ? "是" : "否";
            return h("span", {}, canRecharge);
          }
				},
        {
          title: "会员总余额",
					key: "allBalance",
					render: (h, obj) => {
						let num = obj.row.allBalance;

						if(num<1 && num!==null) {
							num = num.toFixed(8);
						}
						return h('span', {}, num)
					}
        },
        {
          title: "钱包余额",
          key: "hotAllBalance"
        },
        {
          title: "冷钱包地址",
          key: "coldWalletAddress"
        },
				{
          title: "添加钱包",
					key: "addWallet",
					render: (h, ctx) => {
						let isDisabel = false;
						return h('Button', {
							props: {
								type: 'info',
								size: 'small',
							},
							on: {
								click: () => {
									ifExistWallet({coinName: ctx.row.name})
									.then(res => {
										if(res.data) {
											addCoinWallet({coinName: ctx.row.name})
											.then(res => {
												if(!res.code) {
													this.$Message.success('添加成功！');
												}else this.$Message.error('添加失败！');
											})
										}else {
											this.$Message.info('该币种已存在钱包地址！');
										}
									})
								}
							}
						}, '添加')
					}
        },
        {
          title: "状态",
          key: "status",
          render: (h, obj) => {
            const row = obj.row;
            const status = row.status === 0 ? "启用" : "禁用";
            return h(
              "Tag",
              {
                props: {
                  color: row.status === 0 ? "green" : "red"
                }
              },
              status
            );
          }
        },
        {
          title: "操作",
          width: 160,
          render: (h, obj) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
									},
                  style: {
										color: '#2d8cf0',
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
											this.detailModal = obj.row;
                      this.showDetailModal = true;
                    }
                  }
                },
                "详情"
              ),
              h("Dropdown",{
								props: {
									transfer: true
								},
									on: {
										'on-click': (name) => {
											if(name==='change') {
												sysCoinDetail({name: obj.row.name })
												.then(res => {
													if(!res.code) {
														for( let key in this.coinForm) {
															this.coinForm[key] = res.data[key];
														}
														this.ifCreate = false;
														this.showUpdateModel = true;
													}else this.$Message.error(res.message)
												})
												.catch(err => console.log(err));
											}else if(name === 'coldWallet') {
												this.coldWalletForm.unit = obj.row.unit;
												this.enableTransferCoin = obj.row.hotAllBalance;
												let mobilePhone = JSON.parse(Cookies.get('userPhone')).mobilePhone;
												
												tansTimeout({phone: mobilePhone })
												.then(res => {
													if(!res.code) {
														this.needCord = false;
													}else{
														this.needCord = true;
													}
												})
												this.showColdWalletModal = true;
											}else if(name === 'transformDetail') {
												this.$router.push({ path: '/system/coin/transferdetail', query: {unit: obj.row.unit}});
											}
										}
									}
							},[
								h("DropdownMenu",{
									slot: 'list'
								},[
										h("DropdownItem",{
											props: {
												name: 'change'
											}
										},'修改'),
										h("DropdownItem",{
											props: {
												name: 'coldWallet'
											}
										},'转入冷钱包'),
										h("DropdownItem",{
											props: {
												name: 'transformDetail'
											}
										},'转入明细')
								]),
								h("Button",{
									props: {
                    type: "text",
                    size: "small"
									},
                  style: {
										color: '#2d8cf0',
                    marginRight: "5px"
                  },
								},"更多")
							]
              )
            ]);
          }
        }
      ],
    };
  },
  methods: {
		confirmSubCodeWallet() {
			if(this.needCord) {
				for (let key in this.coldWalletForm)  {
					if(this.coldWalletForm[key].trim()==='') {
						this.$Message.warning('请完善信息！')
						return;
					}
				}
			}else{
				if(this.coldWalletForm.unit.trim()==='' || this.coldWalletForm.amount.trim()==='') {
					this.$Message.warning('请完善信息！')
					return;
				}
			}
			transferColdWallet(this.coldWalletForm)
			.then( res => {
				if(!res.code) {
					this.$Message.success(res.message);
				} else this.$Message.error(res.message);
				this.showColdWalletModal = false;
				this.enableTransferCoin = 0;
				this.count = 0;
			})
			.catch(err => console.log(err))

		},
		getCode(str) {
			let fn = '';
			if(str==='fixedInfo') {
				fn = coinReviseSys;
			}else if(str==='coldWallet'){
				fn = getColdWalletCode;
			}
			fn({ phone: this.phoneNum })
			.then(res => {
				this.$Notice.info({
					title: res.message,
					desc: ''
				});
			})	
			.catch(err => {console.log(err)})
		},
		getCodeTwice(str) {
			this.count = 60;
			this.getCode(str);
		},
		showNeedCode() {
			this.showPhoneCodeModal = true;
			this.count--;
			this.getCode('fixedInfo');
		},
		cancelSub() {
			for(let key in this.coinForm) {
				this.coinForm[key] = '';
			}
			for(let key in this.coldWalletForm) {
				this.coldWalletForm[key] = '';
			}
			this.enableTransferCoin = 0;
			this.coinForm.status = this.coinForm.canWithdraw = this.coinForm.canRecharge
			 = this.coinForm.enableRpc = this.coinForm.canAutoWithdraw = 0;
			 this.showColdWalletModal = false;
		},
    confirmSub() {
			let fn = '';
			if(this.ifCreate) fn = addSysCoin
			else fn = updateSysCoin
			fn(this.coinForm)
			.then(res => {
				if(!res.code) {
					this.$Message.success(res.message)
				}else this.$Message.error(res.message)
				this.refreshPage();
			})
			.catch(err => console.log(err));
    },
    addCoin() {
			this.cancelSub();
			this.ifCreate = true;
      this.showUpdateModel = true;
    },
    refreshPage(obj={}) {
			this.ifLoading = true;
			querySysCoin(obj)
			.then(res => {
				if(!res.code) {
					this.userpage = res.data.content;
					this.totalNum = res.data.totalElements;
				}else this.$Message.error(res.message)
					this.ifLoading = false;
			})
			.catch(err => console.log(err))

    },
    changePage(pageIndex) {
			this.currentPageIdx = pageIndex;
			this.filterSearch.pageNo = pageIndex;
      this.refreshPage(this.filterSearch);
    },
    refreshPageManual() {
      this.refreshPage(this.filterSearch);
    }
  },
  created() {
		this.phoneNum = JSON.parse(Cookies.get('userInfo')).mobilePhone;
		this.refreshPage();
	},
	filters: {
		hidePhoneNumFilter(val) {
			return val.split('').fill('*',3,7).join('');
		}
	},
	watch: {
		count(newVal, oldVal) {
			if(newVal>0){
				this.timer = setTimeout(()=> {
					this.count--;
				}, 1000)
			}else{
				clearTimeout(this.timer)
			}
		}
	}
};

</script>

<style lang="less" scoped>
	.transferTips{
		position: absolute;
    bottom: -24px;
		color: #999;
		line-height: 23px;
	}
</style>
