<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
		<a-form-item label="盲盒价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="qq" style="width: 200px"/>
		  <span class="ml-10">元</span>
		 <div class="form-item-help">
		    <p class="extra">注：价格请填写数字，例：10，即盲盒产品售价为10</p>
		  </div>
		</a-form-item>
		<a-form-item label="盲盒限购数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="add" style="width: 200px" :min="0.1"
		    :max="100"/>
		  <span class="ml-10">个</span>
		 <div class="form-item-help">
		    <p class="extra">注：价格请填写数字，例：1，即盲盒限购数量为1件</p>
		  </div>
		</a-form-item>
        <a-form-item :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import * as Api from '@/api/setting/store'
import { InputNumberGroup } from '@/components'

export default {
  components: {
    InputNumberGroup
  },
  data () {
    return {
      // 当前设置项的key
      key: 'box',
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
	  qq:'',
	  add:''
    }
  },
  // 初始化数据
  created () {
    // 获取当前详情记录
    this.getDetail()
  },
  methods: {

    // 获取当前详情记录
    getDetail () {
      this.isLoading = true
      Api.getBox()
        .then(result => {
           console.log('asd',result)
		   this.qq = result.data.values.price
		   this.add = result.data.values.limited
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
		  'intergral'
        ]))
      })
    },

    /**
     * 确认按钮
     */
    handleSubmit (e) {
        if(this.qq == ''){
			return this.$message.error('请填写盲盒价格', 1.5)
		}
		// if(this.add == ''){
		// 	return this.$message.error('请填写产品挂售涨幅', 1.5)
		// }
		const newResult = {
			price:this.qq,
			limited:this.add
			// Increase:this.add
		}
		Api.update(this.key, { form: newResult })
		  .then((result) => {
		    // 显示提示信息
		    this.$message.success(result.message, 1.5)
		  })
		  .finally((result) => {
		    this.isLoading = false
		  })
      e.preventDefault()
      // 表单验证
      const { form: { validateFields } } = this
      // validateFields((errors, values) => {
      //   // 提交到后端api
      //   !errors && this.onFormSubmit(values)
      // })
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      this.isLoading = true
	  values.points_name = '积分'
	  values.describe = "a) 积分不可兑现、不可转让,仅可在本平台使用;"
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
