<template>
  <a-card :bordered="false">
	  <a-form :form="form" @submit="handleSubmit" :selfUpdate="true">
    <div class="card-title">{{ $route.meta.title }}</div>
   <div class="tabs-content">
	   <a-form-item label="盲盒图片" :labelCol="labelCol" :wrapperCol="wrapperCol"
	   	extra="最多上传1张">
	   	<SelectImage multiple :maxNum="1"
		:defaultList="imagesIds"
	   		v-decorator="['imagesIds', {rules: [{required: true, message: '请至少上传1张盲盒图片'}]}]" />
	   </a-form-item>
   </div>	   
   <a-form-item class="mt-20" :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }">
   	<a-button type="primary" html-type="submit" :loading="isBtnLoading">提交</a-button>
   </a-form-item>
   </a-form>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import * as Api from '@/api/setting/store'
import { InputNumberGroup } from '@/components'
import {
		SelectImage
	} from '@/components'

export default {
  components: {
    InputNumberGroup,
	SelectImage
  },
  data () {
    return {
      // 当前设置项的key
      key: 'box_bg',
      // 标签布局属性
      labelCol: { span: 4 },
      // 输入框布局属性
      wrapperCol: { span: 10 },
	  form: this.$form.createForm(this),
	  isBtnLoading: false,
      // loading状态
      isLoading: false,
	  imagesIds:'',
      // 当前表单元素
      form: this.$form.createForm(this),
      // 当前记录详情
      record: {},
	  labelCol: {
	  	span: 3
	  },
	  // 输入框布局属性
	  wrapperCol: {
	  	span: 10
	  },
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
      Api.blind()
        .then(result => {
          
		   this.imagesIds = [{'file_id':result.data.values.file_id,
		   'external_url':"https://h5.rtosd.net/uploads/10001/20220528/5496ccedc63e20d71b01528fc3e430aa.png",
		   'file_path':'10001/20220528/5496ccedc63e20d71b01528fc3e430aa.png','preview_url':result.data.values.file_path}]
		   this.form.imagesIds = [result.data.values.file_id]
		    console.log('asd',[result.data.values.file_id], this.imagesIds)
        })
        .finally(result => {
          this.isLoading = false
        })
    },

    /**
     * 确认按钮
     */
    handleSubmit (e) {
		console.log('lss',this.imagesIds)
  //       if(this.qq == ''){
		// 	return this.$message.error('请填写盲盒价格', 1.5)
		// }
		// Api.setBlind({boxMoney:this.qq})
		//   .then((result) => {
		//     // 显示提示信息
		//     this.$message.success(result.message, 1.5)
		//   })
		//   .finally((result) => {
		//     this.isLoading = false
		//   })
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
		console.log('asdsd',values.imagesIds[0])
		const newImg = {file_id:values.imagesIds[0]}
      this.isLoading = true
      Api.update(this.key, { form: newImg })
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
