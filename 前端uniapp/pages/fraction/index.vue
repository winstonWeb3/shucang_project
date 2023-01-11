<template>
	<view class="fraction">
		<view class="frac-top">
			<view style="font-size: 28px;font-weight: 600;">{{integralAll}}</view>
			<view style="font-size: 18px;margin-top: 16rpx;">总积分</view>
		</view>
		<view class="tip">满足xxx积分可以参与盲盒抽奖一次</view>
		<view class="frac-content">
			<view class="frac-title">积分明细</view>
			<view class="frac-list">
				<view class="frac-item" v-for="(item,index) in integralDetails" :key="index">
					<view class="frac-left">
						<view class="frac-left-title">{{item.describe}}</view>
						<view class="frac-left-time">{{utilTime(item.create_time)}}</view>
					</view>
					<view class="frac-right">+{{item.value}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				integralAll:'',
				integralDetails:[],
				
			}
		},
		onLoad(){
			this.getIntergral()
		},
		methods:{
			getIntergral(){
				this.$request('post', 'Checkout/myIntegral', {
					userid: uni.getStorageSync('userinfo').userId,
				}).then(res => {
					console.log('res', res)
					this.integralAll = res.data.integralAll
					this.integralDetails = res.data.integralDetails
				}).catch(err => {
					console.log('err', err)
				})
			},
			utilTime(time){
				return this.$utilTime(time)
			}
		}
	}
</script>

<style lang="scss">
	page {
	background: #33383A;
	}
	.fraction{
		.frac-top{
			margin: 0 20rpx;
			margin-top: 20rpx;
			background: #181919;
			border-radius: 20rpx;
			color: #fff;
			padding: 40rpx 40rpx;
			box-sizing: border-box;
			font-size: 40rpx;
			text-align: center;
		}
		.tip{
			margin-left: 26rpx;
			margin-top: 20rpx;
			color: #FCC186;
			font-size: 13px;
		}
		.frac-content{
			background: #181919;
			border-radius: 20rpx;
			margin: 20rpx 20rpx 0;
			padding: 20rpx 40rpx;
			.frac-title{
				font-size: 40rpx;
				color: #fff;
				margin-bottom: 20rpx;
			}
			.frac-list{
				.frac-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 35rpx;
					color: #fff;
					padding-bottom: 6rpx;
					border-bottom: 2rpx solid #6c6969;
					margin-top: 10rpx;
				}
				.frac-left-title{
					font-size: 32rpx;
					margin-bottom: 10rpx;
				}
				.frac-left-time{
					color: #999;
					font-size:27rpx;
				}
			}
		}
	}
</style>
