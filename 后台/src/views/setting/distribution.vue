<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
		<a-form-item label="一级分销奖励" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="qq" style="width: 200px"/>
		  <span class="ml-10">%</span>
		 <div class="form-item-help">
		    <p class="extra">注：价格请填写数字，例：10，即上级奖励一级消费金额的10%</p>
		  </div>
		</a-form-item>
		<!-- <a-form-item label="二级分销奖励" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="add" style="width: 200px" :min="0.1"
		    :max="100"/>
		  <span class="ml-10">%</span>
		 <div class="form-item-help">
		    <p class="extra">注：价格请填写数字，例：10，即上级奖励二级消费金额的10%</p>
		  </div>
		</a-form-item> -->
		<a-form-item label="二级分销奖励" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="add" style="width: 200px" :min="0.1"
		    :max="100"/>
		  <span class="ml-10">%</span>
		 <div class="form-item-help">
		    <p class="extra">注：价格请填写数字，例：10，即上级奖励二级消费金额的10%</p>
		  </div>
		</a-form-item>
	<!-- 	<a-form-item label="优先购藏品数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number v-model="num" style="width: 200px" :min="1"
		    :max="100"/>
		  <span class="ml-10">件</span>
		 <div class="form-item-help">
		    <p class="extra">注：请填写整数，例：10，即平台有10件优先购藏品可供出售</p>
		  </div>
		</a-form-item> -->
		<!-- <a-button type="primary" style="margin-left:160px;margin-top: 10px;" @click="change">选择商品</a-button>
		<div class="form-item-help" style="margin-left:140px;">
		   <p class="extra">注：请点击选择商品</p>
		 </div>
		 <div style="width: 100%;height: 100%;padding: 20px 30px 60px 120px;display: flex;flex-wrap: wrap;" v-if="arr!=''">
		 	<div style="padding: 20px;">         
		 		<div style="width: 80px;height: 80px;">
		 			<img style="width: 100%;height: 100%;" :src="arr.goods_image"/></div>
		 			<div style="color: #000;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width:76px;text-align: center;">{{arr.goods_name}}</div>
		 			<div style="text-align: center;">ID:{{arr.goods_id}}</div> 
		 	</div>
			</div> -->
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
      key: 'setting',
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
	  shopArr:''
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
    getDetail () {
      this.isLoading = true
	  Api.getList().then(res => {
	  	console.log('llssdfl', res)
	  	this.shopArr = res.data.list
	  })
      Api.getSetting()
        .then(result => {
           console.log('asd',result)
		   this.qq = result.data.values.ratio_one
		   this.add = result.data.values.ratio_two
		   // this.num = result.data.values.num
		   if(result.data.values.goods_images){
			   this.arr = {
				   goods_image:result.data.values.goods_images,
				   goods_name:result.data.values.goods_name,
				   goods_id:result.data.values.goodsId
			   }
		   }
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
   newResult(e){
	   console.log('asdfsd',e)
	   this.arr = e
   },
    /**
     * 确认按钮
     */
    handleSubmit (e) {
        if(this.qq == ''){
			return this.$message.error('请填写一级分销奖励', 1.5)
		}
		if(this.add == ''){
			return this.$message.error('请填写二级分销奖励', 1.5)
		}
		// if(this.num == ''){
		// 	return this.$message.error('请填写优先购藏品数量', 1.5)
		// }
		const newResult = {
			ratio_one:this.qq,
			ratio_two:this.add,
			// num:this.num,
		    // goodsId:this.arr.goods_id
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
