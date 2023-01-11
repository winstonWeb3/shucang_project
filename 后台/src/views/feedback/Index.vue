<template>
  <a-card :bordered="false">
    <div class="card-title">{{ $route.meta.title }}</div>
    <div class="table-operator">
      <!-- 搜索板块 -->
     <!-- <a-row class="row-item-search">
        <a-form class="search-form" :form="searchForm" layout="inline" @submit="handleSearch"> -->
         <!-- <a-form-item label="昵称/手机号">
            <a-input v-decorator="['search']" placeholder="请输入昵称/手机号" />
          </a-form-item> -->
          <!-- <a-form-item label="会员等级">
            <a-select v-decorator="['gradeId', { initialValue: 0 }]">
              <a-select-option :value="0">全部</a-select-option>
              <a-select-option
                v-for="(item, index) in gradeList"
                :key="index"
                :value="item.grade_id"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-item> -->
          <!-- <a-form-item label="注册时间">
            <a-range-picker format="YYYY-MM-DD" v-decorator="['betweenTime']" />
          </a-form-item> -->
          <!-- <a-form-item class="search-btn">
            <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
          </a-form-item>
        </a-form> -->
      <!-- </a-row> -->
    </div>
    <s-table
      ref="table"
      rowKey="num"
      :loading="isLoading"
      :columns="columns"
      :data="loadData"
      :pageSize="15"
    >
      <!-- 会员头像 -->
      <span slot="avatar_url" slot-scope="text">
        <div class="avatar">
          <img v-if="text" width="45" height="45" :src="text" alt="用户头像" />
          <img v-else width="45" height="45" src="~@/assets/img/default-avatar.png" alt="用户头像" />
        </div>
      </span>
      <span slot="main_info" slot-scope="item">
        <p>{{ item.nick_name }}</p>
        <p class="c-p">{{ item.mobile }}</p>
      </span>
      <!-- 会员等级 -->
    <!--  <span slot="grade" slot-scope="text">
        <a-tag v-if="text">{{ text.name }}</a-tag>
        <span v-else>--</span>
      </span> -->
      <!-- 余额/积分 -->
      <span slot="balance" slot-scope="text, item">
      <!--  <p>
          <span>余额：</span>
          <span class="c-p">{{ text }}</span>
        </p> -->
        <p>
          <!-- <span>积分：</span> -->
          <span class="c-p">{{ item.points }}</span>
        </p>
      </span>
      <!-- 实际消费金额 -->
      <span slot="expend_money" slot-scope="text">
        <span class="c-p">{{ text }}</span>
      </span>
      <!-- 注册来源 -->
      <span slot="platform" class="platform" slot-scope="text">
        <p v-if="PlatformIcons[text]">
          <a-tooltip>
            <template slot="title">{{ PlatformName[text] }}</template>
            <a-icon class="icon" :class="[text]" :component="PlatformIcons[text]" />
          </a-tooltip>
        </p>
      </span>
      <!-- 操作 -->
      <span class="actions" slot="action" slot-scope="item">
        <!-- <a title="会员充值" v-action:recharge @click="handleRecharge(item)">充值</a> -->
        <!-- <a title="会员等级" v-action:grade @click="handleGrade(item)">等级</a> -->
        <a v-action:delete @click="handleDelete(item)">删除</a>
      </span>
    </s-table>
    <GradeForm ref="GradeForm" :gradeList="gradeList" @handleSubmit="handleRefresh" />
    <RechargeForm ref="RechargeForm" @handleSubmit="handleRefresh" />
  </a-card>
</template>

<script>
import * as Api from '@/api/user'
import * as GradeApi from '@/api/user/grade'
import { STable } from '@/components'
import { GradeForm, RechargeForm } from './modules'
import { mpweixin, h5, app } from '@/core/icons'

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
    GradeForm,
    RechargeForm
  },
  data () {
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
      // 表头
      columns: [
		  {
		    title: '序号',
		    dataIndex: 'num'
		  },
        {
          title: '会员ID',
          dataIndex: 'user_id'
        },
        {
          title: '会员头像',
          dataIndex: 'avatar_url',
          scopedSlots: { customRender: 'avatar_url' }
        },
        {
          title: '昵称/手机号',
          scopedSlots: { customRender: 'main_info' }
        },
        // {
        //   title: '会员等级',
        //   dataIndex: 'grade',
        //   scopedSlots: { customRender: 'grade' }
        // },
        {
          title: '反馈内容',
          dataIndex: 'textend',
          scopedSlots: { customRender: 'textend' }
        },
        // {
        //   title: '实际消费金额',
        //   dataIndex: 'expend_money',
        //   scopedSlots: { customRender: 'expend_money' }
        // },
        // {
        //   title: '注册来源',
        //   dataIndex: 'platform',
        //   scopedSlots: { customRender: 'platform' }
        // },
        {
          title: '反馈时间',
          dataIndex: 'addtime'
        },
        // {
        //   title: '操作',
        //   // dataIndex: 'action',
        //   width: '180px',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: param => {
        return Api.back({ ...param, ...this.queryParam })
          .then(response => {
			  response.data.list = JSON.parse(JSON.stringify(response.data))
			  response.data.list.data.forEach((item,index)=>{
			  				  item.num = index + 1
							  item.addtime = this.utilTime(item.addtime)
			  				  // console.log('d',index)
			  })
			  console.log('new',response)
            return response.data.list
          })
      },
      // 会员等级列表
      gradeList: []
    }
  },
  created () {
    // 获取会员等级列表
    this.getGradeList()
  },
  methods: {
   utilTime(num){
     // 时间戳转换成 “yyyy-MM-dd hh:mm:ss”格式
     let date = new Date(num * 1000);
     //时间戳为10位需*1000，时间戳为13位的话不需乘1000
     //年
     let year = date.getFullYear();
     // 月
     let month = date.getMonth() + 1;
     month = month < 10 ? ('0' + month) : month; //月补0
     //日
     let day = date.getDate();
     day = day < 10 ? ('0' + day) : day; //天补0
     //时
     let hours = date.getHours();
     hours = hours < 10 ? ('0' + hours) : hours; //小时补0
     // 分
     let minutes = date.getMinutes();
     minutes = minutes < 10 ? ('0' + minutes) : minutes; //分钟补0
     // 秒
     let seconds = date.getSeconds();
     seconds = seconds < 10 ? ('0' + seconds) : seconds; //秒补0
     // 星期
     const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
     let weekDay = weekArr[date.getDay()];
     let weekNum = date.getDay();
     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
   },
    // 获取会员等级列表
    getGradeList () {
      GradeApi.all().then(result => {
		  console.log('ppp',result)
        this.gradeList = result.data.list
      })
    },

    // 修改会员等级
    handleGrade (item) {
      this.$refs.GradeForm.handle(item)
    },

    // 会员充值
    handleRecharge (item) {
      this.$refs.RechargeForm.handle(item)
    },

    /**
     * 删除记录
     */
    handleDelete (item) {
      const app = this
      const modal = this.$confirm({
        title: '您确定要删除该记录吗?',
        content: '删除后不可恢复',
        onOk () {
          return Api.deleted({ userId: item.user_id })
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
    handleSearch (e) {
      e.preventDefault()
      this.searchForm.validateFields((error, values) => {
        if (!error) {
          this.queryParam = { ...this.queryParam, ...values }
          this.handleRefresh(true)
        }
      })
    },

    /**
     * 刷新列表
     * @param Boolean bool 强制刷新到第一页
     */
    handleRefresh (bool = false) {
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
