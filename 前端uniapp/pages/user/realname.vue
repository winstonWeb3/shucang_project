<template>
	<view class="realname">
		<view class="real-fail" v-if="!realType">
			<view class="real-item">
				<view class="real-title real-name">姓名 :</view>
				<input focus class="real-input" type="text" v-model="name" placeholder="请输入姓名" />
			</view>
			<view class="real-item">
				<view class="real-title">身份证号码 :</view>
				<input class="real-input" type="text" v-model="id" placeholder="请输入身份证号码" />
			</view>
			<view class="real-submit" @click="submit">立即提交</view>
		</view>
		<view class="real-suc" v-if="realType">
			<icon type="success" class="icon-a" size="70" color="#9CE480"/>
			<view class="real-suc-title">已实名认证</view>
			<view class="real-suc-id">
				<image class="real-suc-id-img" src="../../static/userinfo.png" mode="widthFix"></image>
				<view class="real-suc-id-name">{{realName}}</view>
				<view class="real-suc-id-idNum">{{realID}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data () {
			return {
				name: '',
				id: null,
				realType: false,
				realName: '',
				realID:''
			}
		},
		onLoad(list) {
			
			if(uni.getStorageSync('userinfo').idcar) {
				let userinfo = uni.getStorageSync('userinfo')
				this.realName = userinfo.idname
				this.realID = userinfo.idcar
				this.realType = true
			}
		},
		methods: {
			submit:tool.debounce(function(){
				// if(!tool.checkName(this.name)) return uni.showToast({
				// 	title: '请输入真实姓名',
				// 	icon: 'none'
				// })
				if(!tool.checkIdCard(this.id)) return uni.showToast({
					title: '请输入正确的身份证号码',
					icon: 'none'
				})
				uni.showLoading({
					title: '认证中...'
				})
				let userinfo = uni.getStorageSync('userinfo')
				this.$request('post','User/idcar',{
					idcar_name: this.name,
					idcar: this.id,
					user_id: userinfo.userId
				}).then(res => {
					uni.hideLoading()
					this.realName = this.userCheck(1,this.name)
					this.realID = this.userCheck(2,this.id)
					userinfo.idname = this.realName
					userinfo.idcar = this.realID
					uni.setStorageSync('userinfo',userinfo)
					this.realType = true
				}).catch(err => {
					console.log('err',err)
					this.$showToast(err.message)
				})
			}),
			userCheck(type,data){
				if(type == 1) {
					return '**' + data.substring(data.length - 1, data.length)
				} else if (type == 2) {
					return data.substring(0,1) + '****************' + data.substring(data.length - 1, data.length)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.real-fail{
		padding: 30rpx 20rpx;
		.real-item{
			display: flex;
			align-items: center;
			color: #000;
			font-size: 30rpx;
			background: #FFF;
			border-radius: 20rpx;
			padding: 20rpx 30rpx;
			margin-bottom: 50rpx;
			.real-title{
				width: 27%;
				text-align: center;
			}
			.real-name{
				letter-spacing: 10rpx;
			}
			.real-input{
				margin-left: 20rpx;
			}
		}
		.real-submit{
			width: 80%;
			padding: 20rpx 50rpx;
			text-align: center;
			margin: 100rpx auto 0;
			background: #FFF;
			color: #000;
			border-radius: 50rpx;
			font-size: 36rpx;
			font-weight: 700;
		}
	}
	.real-suc{
		padding: 120rpx 50rpx;
		text-align: center;
		color: #000;
		font-size: 30rpx;
		.real-suc-title{
			font-size: 50rpx;
			margin: 40rpx 0 80rpx;
		}
		.real-suc-id{
			width: 100%;
			position: relative;
			color: #000;
			.real-suc-id-img{
				width: 100%;
			}
			.real-suc-id-name{
				position: absolute;
				top: 100rpx;
				left: 50rpx;
			}
			.real-suc-id-idNum{
				position: absolute;
				top: 250rpx;
				left: 50rpx;
			}
		}
		
	}
</style>
