<template>
  <a-modal
    class="noborder"
    :title="title"
    :width="520"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
	<div v-if="inviteList.length == 0">
		<span class="invite-item">无邀请信息</span>
	</div>
	<div class="invite-item invite-title" v-if="inviteList.length != 0">
		邀请总人数: {{inviteList.length}}
	</div>
	<div class="invite-item" v-if="inviteList.length != 0">
		<span class="id">ID</span>
		<span class="phone">手机号</span>
		<span class="phone">时间</span>
	</div>
	<div class="invite-list">
		<div v-if="inviteList.length != 0" class="invite-item" v-for="item in inviteList">
			<span class="id">{{item.user_id}}</span>
			<span class="phone">{{item.mobile}}</span>
			<span class="phone">{{item.create_time}}</span>
		</div>
	</div>
  </a-modal>
</template>

<script>
// import pick from 'lodash.pick'
import * as Api from '@/api/user'

// 充值类型枚举: 余额
const RECHARGE_TYPE_BALANCE = 'balance'

// 充值类型枚举: 积分
const RECHARGE_TYPE_POINTS = 'points'

export default {
  components: {
  },
  data () {
    return {
      // 对话框标题
      title: '邀请列表',
      // 标签布局属性
      labelCol: { span: 7 },
      // 输入框布局属性
      wrapperCol: { span: 13 },
      // modal(对话框)是否可见
      visible: false,
      // modal(对话框)确定按钮 loading
      confirmLoading: false,
      // 当前表单元素
      form: this.$form.createForm(this),
      // 当前tab索引
      activeKey: RECHARGE_TYPE_POINTS,
      // 充值类型
      RECHARGE_TYPE_BALANCE,
      RECHARGE_TYPE_POINTS,
      // 当前记录
	inviteList: []
    }
  },
  methods: {
    // 显示对话框
    handle (record) {
      // 显示窗口
      this.visible = true
      // 当前记录
      this.inviteList = record
    },

    // 切换tabs事件
    onChangeTabs (activeKey) {
      this.activeKey = activeKey
    },

    /**
     * 确认按钮
     */
    handleSubmit (e) {
		this.visible = false
		this.form.resetFields()
      // e.preventDefault()
      // // 表单验证
      // const { form: { validateFields } } = this
      // validateFields((errors, values) => {
      //   // 提交到后端api
      //   !errors && this.onFormSubmit(values)
      // })
    },

    /**
     * 关闭对话框事件
     */
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      const { record, activeKey } = this
      this.confirmLoading = true
      Api.recharge({ userId: record.user_id, target: activeKey, form: values })
        .then((result) => {
          // 显示成功
          this.$message.success(result.message, 1.5)
          // 关闭对话框事件
          this.handleCancel()
          // 通知父端组件提交完成了
          this.$emit('handleSubmit', values)
        })
        .finally(() => {
          this.confirmLoading = false
        })
    }

  }
}
</script>
<style lang="less" scoped>
.ant-modal-body {
  padding-top: 0 !important;
}
.ant-form-item {
  margin-bottom: 15px;
}
.ant-tabs-nav .ant-tabs-tab {
  padding: 10px 16px;
}
.invite-item{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	text-align: center;
}
.invite-item .id{
	width: 20%;
}
.invite-item .phone{
	width: 40%;
}
.invite-title{
	margin: 20px 0;
}
.invite-list{
	height: 300px;
	overflow: auto;
}
</style>
