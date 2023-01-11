<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
        <!-- <a-form-item label="商城名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['store_name', {rules: [{required: true, min: 2, message: '请输入至少2个字符'}]}]"
          />
        </a-form-item> -->
        <a-form-item label="关于我们" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-model="text_us" />
        </a-form-item>
       <!-- <a-form-item
          label="商城Logo"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          extra="建议尺寸: 300*300"
        >
          <SelectImage
            :defaultList="record.logoImage ? [record.logoImage] : []"
            v-decorator="['logo_image_id']"
          />
        </a-form-item> -->
        <a-form-item :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
				<!-- <a-form-item label="隐私政策" :labelCol="labelCol" :wrapperCol="wrapperCol">
				  <a-textarea v-model="text_one" />
				</a-form-item>
				<a-form-item label="使用条款" :labelCol="labelCol" :wrapperCol="wrapperCol">
				  <a-textarea v-model="text_two" />
				</a-form-item>
				<a-form-item :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
				  <a-button type="primary" @click="submitText">提交</a-button>
				</a-form-item> -->
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import * as Api from '@/api/store'
import { SelectImage } from '@/components'

export default {
  components: {
    SelectImage
  },
  data () {
    return {
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
	  text_us:'',
		text_one: '',
		text_two: ''
    }
  },
  // 初始化数据
  created () {
    // 获取当前详情记录
    this.getDetail()
	// this.getColl()
  },
  methods: {
	// 修改条款
	submitText(){
		this.isLoading = true
		Api.upTextColl({
			text1: this.text_one,
			text2: this.text_two
		})
		  .then(result => {
		    // 当前记录
		    console.log(result)
		    // 设置默认值
		    // this.setFieldsValue()
		  })
		  .finally(result => {
		    this.isLoading = false
		  })
	},
	// 获取条款
	getColl(){
		this.isLoading = true
		Api.chekTextColl()
		  .then(result => {
		    // 当前记录
		    console.log(result)
			this.text_one = result.data.text1
			this.text_two = result.data.text2
		    // 设置默认值
		    // this.setFieldsValue()
		  })
		  .finally(result => {
		    this.isLoading = false
		  })
	},
    // 获取当前详情记录
    getDetail () {
      this.isLoading = true
      Api.coll()
        .then(result => {
          // 当前记录
          this.text_us = result.data[0].text_us
          // 设置默认值
          // this.setFieldsValue()
        })
        .finally(result => {
          this.isLoading = false
        })
    },

    /**
     * 设置默认值
     */
    setFieldsValue () {
      const { record, form: { setFieldsValue } } = this
      // 表单内容
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['store_name', 'text_us', 'logo_image_id']))
      })
    },

    /**
     * 确认按钮
     */
    handleSubmit (e) {
     this.onFormSubmit(this.text_us)
    },

    /**
    * 提交到后端api
    */
    onFormSubmit (values) {
      this.isLoading = true
      Api.update({ textend: values })
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
/deep/.ant-form-item-control {
  padding-left: 10px;
  .ant-form-item-control {
    padding-left: 0;
  }
}
</style>
