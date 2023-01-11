<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <a-spin :spinning="isLoading">
      <a-form :form="form" @submit="handleSubmit">
        <div>
          <a-form-item label="推广累计达标所需用户数" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
             v-model="num"
            />
            <span class="ml-10">个</span>
            <div class="form-item-help">
              <p class="extra">注：请填写数字0~100，例：1, 则邀请1人达标</p>
              <p class="extra"></p>
            </div>
          </a-form-item>
        </div>
		<a-form-item label="定期发放藏品奖励" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <a-input-number
		    :min="1"
		    :max="1000"
		    v-model="time"
		  />
		  <span class="ml-10">天</span>
		  <div class="form-item-help">
		    <p class="extra">注：天数请填写整数字0~100，例：10，即10天发放一次随机藏品奖励</p>
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
      key: 'points',
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
			time:'',
			num:''
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
		Api.getAir().then(res=>{
			console.log('asd',res)
			this.num = res.data.date.invita
			this.time = res.data.date.fatime
		}).finally(result => {
          this.isLoading = false
        })
      
      // Api.detail(this.key)
      //   .then(result => {
      //     // 当前记录
      //     this.record = result.data.values
      //     // 设置默认值
      //     this.setFieldsValue()
      //   })
      //   .finally(result => {
      //     this.isLoading = false
      //   })
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
		if(this.num == '' || this.time == ''){
			return this.$message.error('请完善信息', 1.5)
		}
		Api.setAir({ invita: this.num, setDay:this.time})
		  .then((result) => {
		    // 显示提示信息
		    this.$message.success(result.message, 1.5)
		  })
		  .finally((result) => {
		    this.isLoading = false
		  })
      // e.preventDefault()
      // // 表单验证
      // const { form: { validateFields } } = this
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
