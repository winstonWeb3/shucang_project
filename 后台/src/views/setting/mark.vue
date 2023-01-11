<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
       <a-form-item label="市场状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
       	<a-radio-group v-decorator="['is_enable', {initialValue: 0, rules: [{ required: true }]}]">
       		<a-radio :value="1">打开</a-radio>
       		<a-radio :value="0">关闭</a-radio>
       	</a-radio-group>
       </a-form-item>
        <a-form-item style="margin-top:100px;" :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
	<EditForm ref="EditForm" :userArr="selectedRowKeys" @result="newResult" :categoryList="shopArr" @handleSubmit="handleRefresh" />
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import * as Api from '@/api/setting/store'
import EditForm from './modules/EditForm'
import { InputNumberGroup } from '@/components'

export default {
  components: {
    InputNumberGroup,
	EditForm
  },
  data () {
    return {
      // 当前设置项的key
      key: 'market',
      // 标签布局属性
      labelCol: { span: 4 },
      // 输入框布局属性
      wrapperCol: { span: 10 },
      // loading状态
      isLoading: false,
      // 当前表单元素
      form: this.$form.createForm(this),
      // 当前记录详情
      record: {},
	  arr:'',
	  qq:'',
	  add:'',
	  num:'',
	  selectedRowKeys: [],
	  shopArr:'',
	  is_enable:''
    }
  },
  // 初始化数据
  created () {
    // 获取当前详情记录
    this.getDetail()
  },
  methods: {
    change(){
		this.$refs.EditForm.edit(this.shopArr)
	},
    // 获取当前详情记录
    // 获取当前详情记录
    getDetail () {
      this.isLoading = true
      Api.detail(this.key)
        .then(result => {
			this.is_enable = result.data.values.is_enable
			console.log('asda',result)
          // 当前记录
          this.record = result.data.values
          // 设置默认值
          this.setFieldsValue()
        })
        .finally(result => {
          this.isLoading = false
        })
    },

    /**
     * 设置默认值
     */
    setFieldsValue () {
      const { record, $nextTick, form: { setFieldsValue } } = this
      $nextTick(() => {
        setFieldsValue(pick(record, [
          'points_name', 'describe',
          'is_shopping_gift', 'gift_ratio',
          'is_shopping_discount', 'discount',
		  'intergral','is_enable'
        ]))
      })
    },
   newResult(e){
	   console.log('asdfsd',e)
	   this.arr = e
   },
    /**
     * 确认按钮
     */
    handleSubmit (e) {
      e.preventDefault()
      // 表单验证
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        // 提交到后端api
        !errors && this.onFormSubmit(values)
      })
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      this.isLoading = true
	  // values.points_name = '积分'
	  // values.describe = "a) 积分不可兑现、不可转让,仅可在本平台使用;"
      Api.update(this.key, { form: values })
        .then((result) => {
          // 显示提示信息
          this.$message.success(result.message, 1.5)
        })
        .finally((result) => {
          this.isLoading = false
        })
    }

  }
}
</script>
<style lang="less" scoped>
.ant-form-item {
  .ant-form-item {
    margin-bottom: 0;
  }
}

/deep/.ant-form-item-control {
  padding-left: 10px;
  .ant-form-item-control {
    padding-left: 0;
  }
}
</style>
