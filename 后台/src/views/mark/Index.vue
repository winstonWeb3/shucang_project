<template>
	<a-card :bordered="false">
		<div class="card-title">{{ $route.meta.title }}</div>
		<div class="table-operator">
			<!-- 搜索板块 -->
			<a-row class="row-item-search">
				<a-form class="search-form" :form="searchForm" layout="inline" @submit="handleSearch">
				  <a-form-item label="类型查询">
				    <a-input style="width: 342px" placeholder="请输入关键词" v-decorator="['searchValue']">
				      <a-select
				        slot="addonBefore"
				        v-decorator="['searchType', { initialValue: 10 }]"
				        style="width: 100px"
				      >
				        <a-select-option
				          v-for="(item, index) in SearchTypeEnum"
				          :key="index"
				          :value="item.value"
				        >{{ item.name }}</a-select-option>
				      </a-select>
				    </a-input>
				  </a-form-item>
				  <a-form-item label="状态查询">
				    <a-select v-decorator="['orderSource', { initialValue: -1 }]">
				      <a-select-option :value="-1">全部</a-select-option>
				      <a-select-option
				        v-for="(item, index) in OrderSourceEnum"
				        :key="index"
				        :value="item.value"
				      >{{ item.name }}</a-select-option>
				    </a-select>
				  </a-form-item>
				  <a-form-item class="search-btn">
				    <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
				  </a-form-item>
				  <a-form-item class="search-btn">
				    <a-button @click="handleReset">重置</a-button>
				  </a-form-item>
				</a-form>
			</a-row>
		</div>
		<s-table ref="table" rowKey="id" :loading="isLoading" :columns="columns" :data="loadData"
			 :pageSize="15">
			<!-- 会员头像 -->
			<span slot="goods" slot-scope="text">
				<div class="avatar">
					<img v-if="text" width="45" height="45" :src="text.images" alt="用户头像" />
					<img v-else width="45" height="45" src="~@/assets/img/default-avatar.png" alt="用户头像" />
				</div>
			</span>
			<!-- <span slot="main_info" slot-scope="item">
				<p>{{ item.nick_name }}</p>
				<p class="c-p">{{ item.mobile }}</p>
			</span> -->
			<!-- 会员等级 -->
			<!--  <span slot="grade" slot-scope="text">
        <a-tag v-if="text">{{ text.name }}</a-tag>
        <span v-else>--</span>
      </span> -->
			<!-- 余额/积分 -->
			<span slot="name" slot-scope="text, item">
				<!--  <p>
          <span>余额：</span>
          <span class="c-p">{{ text }}</span>
        </p> -->
				<p>
					<span></span>
					<span class="c-p">{{ item.name }}</span>
				</p>
			</span>
			<!-- 实际消费金额 -->
			<span slot="price" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<span slot="createtime" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<span slot="buyer_id" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<span slot="buy_username" slot-scope="text">
				<span class="c-p">{{ text }}</span>
			</span>
			<!-- 注册来源 -->
			<!-- <span slot="platform" class="platform" slot-scope="text">
				<p v-if="PlatformIcons[text]">
					<a-tooltip>
						<template slot="title">{{ PlatformName[text] }}</template>
						<a-icon class="icon" :class="[text]" :component="PlatformIcons[text]" />
					</a-tooltip>
				</p>
			</span> -->
			<!-- 操作 -->
			<!-- <span class="actions" slot="action" slot-scope="item">
				<a title="会员充值" v-action:recharge @click="handleRecharge(item)">充值</a>
				<!-- <a title="会员等级" v-action:grade @click="handleGrade(item)">等级</a> -->
				<a v-action:delete @click="handleDelete(item)">删除</a>
			</span> -->
		</s-table>
		<!-- <GradeForm ref="GradeForm" :gradeList="gradeList" @handleSubmit="handleRefresh" /> -->
		<!-- <RechargeForm ref="RechargeForm" @handleSubmit="handleRefresh" /> -->
		 <!-- <EditForm ref="EditForm" :userArr="selectedRowKeys" :categoryList="shopArr" @handleSubmit="handleRefresh" /> -->
	</a-card>
</template>

<script>
	import * as Api from '@/api/user'
	import * as GradeApi from '@/api/user/grade'
	import { assignment } from '@/utils/util'
	// import EditForm from './modules/EditForm'
	import {
		STable
	} from '@/components'
	// import {
	// 	GradeForm,
	// 	RechargeForm
	// } from './modules'
	import {
		mpweixin,
		h5,
		app
	} from '@/core/icons'
    
	// 搜索关键词类型枚举
	const SearchTypeEnum = [
	  { name: '卖家', value: 10 },
	  { name: '买家', value: 20 },
	  { name: '商品名称', value: 30 },
	  { name: '订单', value: 40 }
	]
	// 搜索类型枚举
	const OrderSourceEnum = [
	  { name: '已售', value: 10 },
	  { name: '未售', value: 20 }
	]
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
			// RechargeForm,
			// EditForm
		},
		data() {
			return {
				// 注册来源名称
				PlatformName,
				// 注册来源图标
				PlatformIcons,
				// 当前表单元素
				searchForm: this.$form.createForm(this),
				// 查询参数
				queryParam: {},
				// 正在加载
				isLoading: false,
				selectedRowKeys: [],
				// 表头
				columns: [{
						title: '卖家ID',
						dataIndex: 'user_id'
					},
					{
						title: '卖家名称',
						dataIndex: 'sell_username',
						scopedSlots: {
							customRender: 'sell_username'
						}
					},
					{
						title: '商品图片',
						dataIndex: 'goods',
						scopedSlots: {
							customRender: 'goods'
						}
					},
					{
						title: '商品名称',
						scopedSlots: {
							customRender: 'name'
						}
					},
					// {
					//   title: '会员等级',
					//   dataIndex: 'grade',
					//   scopedSlots: { customRender: 'grade' }
					// },
					// {
					// 	title: '积分',
					// 	dataIndex: 'balance',
					// 	scopedSlots: {
					// 		customRender: 'balance'
					// 	}
					// },
					{
						title: '实际金额',
						dataIndex: 'price',
						scopedSlots: {
							customRender: 'price'
						}
					},
					// {
					// 	title: '注册来源',
					// 	dataIndex: 'platform',
					// 	scopedSlots: {
					// 		customRender: 'platform'
					// 	}
					// },
					{
						title: '上架时间',
						dataIndex: 'createtime'
					},
					{
						title: '买家ID',
						dataIndex: 'buyer_id'
					},
					{
						title: '买家名称',
						dataIndex: 'buy_username'
					},
					// {
					// 	title: '操作',
					// 	// dataIndex: 'action',
					// 	width: '180px',
					// 	scopedSlots: {
					// 		customRender: 'action'
					// 	}
					// }
				],
				// 加载数据方法 必须为 Promise 对象
				loadData: param => {
					return Api.mark({
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
		beforeCreate () {
		  // 批量给当前实例赋值
		  assignment(this, {
		    SearchTypeEnum,
			OrderSourceEnum
		  })
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
				this.$refs.RechargeForm.handle(item)
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
