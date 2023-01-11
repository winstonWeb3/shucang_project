<template>
  <a-modal
    :title="title"
    :width="720"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="等级名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          extra="例如：大众会员、黄金会员、铂金会员、钻石会员"
        >
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入等级名称'}]}]" />
        </a-form-item>
       <!-- <a-form-item
          label="等级权重"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          extra="会员等级的权重，数字越大 等级越高"
        >
          <a-select v-decorator="['weight', {rules: [{required: true, message: '请选择等级权重'}]}]">
            <a-select-option
              v-for="(value, index) in weights"
              :key="index"
              :value="value"
            >{{ value }}</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="奖励条件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <InputNumberGroup
            addonBefore="邀请好友满"
            addonAfter="人"
            :inputProps="{ min: 1 }"
            v-decorator="['upgrade', { rules: [{ required: true, message: '邀请条件不能为空' }] }]"
          />
          <!-- <div class="form-item-help">
            <p class="extra">用户的实际消费金额满足后，自动升级</p>
          </div> -->
        </a-form-item>
		<a-form-item label="奖励藏品分类(请选择一个)" :labelCol="labelCol" :wrapperCol="wrapperCol">
			<a-tree-select placeholder="请选择奖励藏品分类"
				:dropdownStyle="{ maxHeight: '500px', overflow: 'auto' }"
				:treeData="formData.categoryList" treeCheckable treeCheckStrictly allowClear
				v-decorator="['categorys', {rules: [{required: true, message: '请选择1个奖励藏品分类'}]}]">
			</a-tree-select>
			<div class="form-item-help">
			  <p class="extra">选择奖励藏品分类，随机获取藏品分类中一个奖励</p>
			</div>
		</a-form-item>
       <!-- <a-form-item label="等级权益" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <InputNumberGroup
            addonBefore="折扣率"
            addonAfter="折"
            :inputProps="{ min: 0, max: 9.9 }"
            v-decorator="['equity.discount', { rules: [{ required: true, message: '等级权益不能为空' }] }]"
          />
          <div class="form-item-help">
            <p class="extra">折扣率范围0.0-9.9，例如: 9.8代表98折，0代表不折扣</p>
          </div>
        </a-form-item> -->
       <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group v-decorator="['status', {initialValue: 1, rules: [{required: true}]}]">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
       <!-- <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol" extra="数字越小越靠前">
          <a-input-number
            :min="0"
            v-decorator="['sort', {initialValue: 100, rules: [{required: true, message: '请输入排序值'}]}]"
          />
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import * as Api from '@/api/user/grade'
import { InputNumberGroup } from '@/components'
import GoodsModel from '@/common/model/goods/Index'

// 生成等级权重
const weights = []
for (let i = 1; i <= 20; i++) {
  weights.push(i)
}

export default {
  components: {
    InputNumberGroup
  },
  data () {
    return {
      // 对话框标题
      title: '编辑会员等级',
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
      // 等级权重
      weights,
      // 当前记录
      record: {},
	  // 表单数据
	  formData: GoodsModel.formData
    }
  },
  created () {
    GoodsModel.getFromData()
				.then(() => {
					this.isLoading = false
				})
  },
  methods: {

    /**
     * 显示对话框
     */
    edit (record) {
      // 显示窗口
      this.visible = true
      // 当前记录
      this.record = record
      // 设置默认值
      this.setFieldsValue()
    },

    /**
     * 设置默认值
     */
    setFieldsValue () {
      const { record, form: { setFieldsValue } } = this
      record.cascader = [
        record.province_id,
        record.city_id,
        record.region_id
      ]
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['name', 'weight', 'upgrade', 'equity', 'status', 'sort']))
      })
    },

    /**
     * 确认按钮
     */
    handleSubmit (e) {
      e.preventDefault()
      // 表单验证
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
		  values.category_id = values.categorys[0].value
        // 提交到后端api
        !errors && this.onFormSubmit(values)
      })
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
      this.confirmLoading = true
      Api.rewEdit({ gradeId: this.record.grade_id, form: values })
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
