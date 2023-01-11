<template>
	<a-card :bordered="false">
		<div class="card-title">{{ $route.meta.title }}</div>
		<s-table ref="table" rowKey="log_id" :loading="isLoading" :columns="columns" :data="loadData"
			 :pageSize="15">
			<!-- 会员头像 -->
			<span slot="wallet" slot-scope="text" >
				<div class="avatar">
					<img v-if="text" width="45" height="45" :src="text.path" alt="收款码" />
					<img v-else width="45" height="45" src="~@/assets/img/default-avatar.png" alt="用户头像" />
				</div>
			</span>
			<!-- 余额/积分 -->
			<span slot="mobile" slot-scope="text, item">
				<p>
					<span></span>
					<span class="c-p">{{ item.wallet.mobile }}</span>
				</p>
			</span>
			<span slot="name" slot-scope="text, item" >
				<p>
					<span></span>
					<span class="c-p" v-if="item.wallet.type == 0">{{ item.wallet.name }}</span>
				</p>
			</span>
			<!-- 实际消费金额 -->
			<span slot="price" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<span slot="create_time" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<span slot="bank" slot-scope="text, item">
				<p>
					<span></span>
					<span class="c-p" v-if="item.wallet.type == 2">{{ item.wallet.bank }}</span>
				</p>
			</span>
			<span slot="branch" slot-scope="text, item">
				<p>
					<span></span>
					<span class="c-p" v-if="item.wallet.type == 2">{{ item.wallet.name }}</span>
				</p>
			</span>
			<span slot="real_name" slot-scope="text, item">
				<p>
					<span></span>
					<span class="c-p">{{ item.wallet.real_name }}</span>
				</p>
			</span>
			<span class="actions" slot="action" slot-scope="item">
				<a title="会员充值" v-if="item.status == 0" v-action:recharge @click="handleRecharge(item)">审核</a>
				<a title="会员充值" v-if="item.status == 1" v-action:recharge>已通过</a>
				<a title="会员充值" v-if="item.status == 2" v-action:recharge>已拒绝</a>
			</span>
		</s-table>
		<!-- <GradeForm ref="GradeForm" :gradeList="gradeList" @handleSubmit="handleRefresh" /> -->
		<!-- <RechargeForm ref="RechargeForm" @handleSubmit="handleRefresh" /> -->
		<!-- <EditForm ref="EditForm" :userArr="selectedRowKeys" :categoryList="shopArr" @handleSubmit="handleRefresh" /> -->
		<a-modal :closable="false"
		             centered
		             v-model="confirmShow"
		             class="captcha-modal"
		             width="40%"
		             :cancelButtonProps="{ props: {type: 'link'} }"
		             okType="link"
					 cancelText="关闭">
		      <h4 class="fz-18 text-c">是否通过</h4>
			  
			  <template slot="footer">
			    <a-button @click="handleCancel">取消</a-button>
			    <a-button type="primary" @click="handleReject">拒绝</a-button>
			    <a-button type="primary" @click="handleOk">通过</a-button>
				</template>
		    </a-modal>
	</a-card>
</template>

<script>
	import * as Api from '@/api/user'
	import * as GradeApi from '@/api/user/grade'
	// import EditForm from './modules/EditForm'
	import {
		STable
	} from '@/components'
	import {
		RechargeForm
	} from './modules/RechargeForm.vue'
	import {
		mpweixin,
		h5,
		app
	} from '@/core/icons'

	// 注册来源名称
	const PlatformName = {
		'MP-WEIXIN': '微信小程序',
		'H5': 'H5',
		'APP': 'APP'
	}

	// 注册来源图标
	const PlatformIcons = {
		'MP-WEIXIN': mpweixin,
		'H5': h5,
		'APP': app
	}

	export default {
		name: 'Index',
		components: {
			STable,
			// GradeForm,
			RechargeForm,
			// EditForm
		},
		data() {
			return {
				// 注册来源名称
				PlatformName,
				confirmShow: false,
				// 注册来源图标
				PlatformIcons,
				// 当前表单元素
				searchForm: this.$form.createForm(this),
				// 查询参数
				queryParam: {},
				log_id:'',
				// 正在加载
				isLoading: false,
				selectedRowKeys: [],
				// 表头
				columns: [{
						title: '申请人ID',
						dataIndex: 'user_id'
					},
					{
						title: '用户行为',
						dataIndex: 'remark',
						scopedSlots: {
							customRender: 'remark'
						}
					},
					{
						title: '收款码',
						dataIndex: 'wallet',
						scopedSlots: {
							customRender: 'wallet'
						}
					},
					{
						title: '支付宝账号',
						dataIndex: 'name',
						scopedSlots: {
							customRender: 'name'
						}
					},
					{
						title: '手机号',
						scopedSlots: {
							customRender: 'mobile'
						}
					},
					
					{
						title: '实际金额',
						dataIndex: 'money',
						scopedSlots: {
							customRender: 'money'
						}
					},
					
					{
						title: '申请时间',
						dataIndex: 'create_time'
					},
					{
						title: '开户银行',
						dataIndex: 'bank',
						scopedSlots: {
							customRender: 'bank'
						}
						// dataIndex: 'bank'
					},
					{
						title: '银行卡号',
						dataIndex: 'branch',
						scopedSlots: {
							customRender: 'branch'
						}
						// dataIndex: 'branch'
					},
					{
						title: '名称',
						dataIndex: 'real_name',
						scopedSlots: {
							customRender: 'real_name'
						}
						// dataIndex: 'real_name'
					},
					{
						title: '操作',
						// dataIndex: 'action',
						width: '180px',
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				// 加载数据方法 必须为 Promise 对象
				loadData: param => {
					return Api.balance({
							...param,
							...this.queryParam
						})
						.then(response => {
							return response.data.list
						})
				},
				// 会员等级列表
				gradeList: []
			}
		},
		computed: {
			rowSelection() {
				return {
					selectedRowKeys: this.selectedRowKeys,
					onChange: this.onSelectChange
				}
			}
		},
		created() {
			// 获取会员等级列表
			this.getGradeList()
		},
		methods: {
				  handleCancel(){
					 this.confirmShow = false; 
				  },
				  handleReject(){ // 拒绝
					  Api.examine({
						  logId:this.log_id,
						  status:2
					  }).then(result => {
						  this.confirmShow = false;
						   this.handleRefresh(true)
					console.log('lll', result)
				}).catch(ret=>{
						  this.confirmShow = false;
						  this.handleRefresh(true)
					  })
				  },
				  handleOk(){
					  Api.examine({
						  logId:this.log_id,
						  status:1
						  }).then(result => {
							this.confirmShow = false; 
							this.handleRefresh(true)
					  	console.log('lll', result)
					  }).catch(ret=>{
						  this.confirmShow = false;
						  this.handleRefresh(true)
					  })
				  },
			handleUpdateStatus(item){
				this.$refs.EditForm.edit(this.shopArr)
			},
			/**
			 * 选中项发生变化时的回调
			 */
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys
				console.log('asd',this.selectedRowKeys)
			},
			// 获取会员等级列表
			getGradeList() {
				GradeApi.all().then(result => {
					console.log('lll', result)
					this.gradeList = result.data.list
				})
				GradeApi.getPl().then(res => {
					console.log('llssdfl', res)
					this.shopArr = res.data.list
				})
			},

			// 修改会员等级
			handleGrade(item) {
				this.$refs.GradeForm.handle(item)
			},

			// 会员充值
			handleRecharge(item) {
				console.log('sd',item.log_id)
				this.log_id = item.log_id
				// this.$refs.RechargeForm.handle(item)
				this.confirmShow = true
				this.handleRefresh(true)
			},

			/**
			 * 删除记录
			 */
			handleDelete(item) {
				const app = this
				const modal = this.$confirm({
					title: '您确定要删除该记录吗?',
					content: '删除后不可恢复',
					onOk() {
						return Api.deleted({
								userId: item.user_id
							})
							.then((result) => {
								app.$message.success(result.message, 1.5)
								app.handleRefresh()
							})
							.finally(result => {
								modal.destroy()
							})
					}
				})
			},

			// 确认搜索
			handleSearch(e) {
				e.preventDefault()
				this.searchForm.validateFields((error, values) => {
					if (!error) {
						this.queryParam = {
							...this.queryParam,
							...values
						}
						this.handleRefresh(true)
					}
				})
			},

			/**
			 * 刷新列表
			 * @param Boolean bool 强制刷新到第一页
			 */
			handleRefresh(bool = false) {
				this.$refs.table.refresh(bool)
			}

		}
	}
</script>

<style lang="less" scoped>
	.ant-card-body {
		padding: 22px 29px 25px;
	}

	.platform {
		.icon {
			font-size: 17px;
		}

		.MP-WEIXIN {
			color: #04be02;
		}

		.H5 {
			color: #e44c27;
		}
	}
</style>
