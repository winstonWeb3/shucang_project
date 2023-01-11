<template>
	<view>
		<view class="top">
			<view class="img">
				<img class="auto-img" :src="content.file_path" mode="" />
				</view>
				<view class="name">{{content.goods_name}}</view>
				<view class="flex">
					<view class="num">
						<view class="po">编号</view>
						{{content.score}}
					</view>
				</view>
		</view>
		<view class="other">
			<view class="title">订单单价</view>
			<view class="ipt">
				<input type="text" v-model="money" value="" placeholder="请输入单价"/>
				<view>￥</view>
			</view>
			<view class="flex-space">
				<view>手续费:</view>
				<view>{{charges}}%</view>
			</view>
			<view class="flex-space">
				<view>版权费:</view>
				<view>{{copyright}}%</view>
			</view>
		</view>
		<view class="other">
			<view class="title">转售须知</view>
			<view class="txt">您将获得除支付手续费({{charges}}%),版权费({{copyright}}%)之外的所有售卖收入。</view>
		</view>
		<view class="last">
			<view class="submit" @click="sub">确认转售</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				configs:'',
				content:'',
				charges: '',
				copyright: '',
				money:''
			}
		},
		methods:{
			sub() {
				if (this.price == '') return this.$showToast('请输入转售价格')
				this.$request('get', 'order/sale', {
					'collId': this.content.coll_id,
					'price': this.money
				}).then(res => {
					this.$showToast(res.message)
					// this.moneyShow = false
					setTimeout(() => {
						// #ifdef H5
						const pages = getCurrentPages()
						if (pages.length > 1) {
						uni.navigateBack(1)
						return;
						}
						//使用vue-router返回上一级
						let a = this.$router.go(-1)
						if (a == undefined) {
						//重新定向跳转页面
						
						}
						return;
						// #endif
						uni.navigateBack(1)
					}, 600)
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
		},
		onLoad(options){
			this.configs = this.$config.ImgUrl
			console.log('asdasd',options)
			let str = decodeURIComponent(options.obj)
			this.content = JSON.parse(str)
			// this.content = decodeURIComponent(JSON.parse(options.obj))
			console.log('asdasd',this.content)
			this.$request('get', 'order/config', {}).then(res => {
							this.charges = res.data.charges
							this.copyright = res.data.copyright
							// return this.moneyShow = true
						}).catch(err => {
							console.log('err', err)
							this.$showToast(err.message)
						})
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F0EFF4;
		padding: 20rpx;
	}
	.top{
		padding: 30rpx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFF;
		border-radius: 20rpx;
		text-align: center;
		.img{
			width: 180rpx;
			height: 180rpx;
			margin: 0 auto;
			border-radius: 20rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
		}
		.name{
			font-weight: 600;
		}
		.flex{
			display: flex;
			justify-content: center;
			margin-top: 20rpx;
			.num{
				padding-left: 90rpx;
				padding-right: 10rpx;
				background-color: #8C511D;
				color: #FFF;
				position: relative;
				font-size: 14px;
				.po{
					position: absolute;
					top: -14rpx;
					left: -10rpx;
					width: 100rpx;
					text-align: center;
					height: 60rpx;
					line-height: 58rpx;
					font-size: 14px;
					color: #9B6422;
					background-image: url(../../static/bhleft.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}
		}
	}
	.other{
		padding: 30rpx 20rpx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFF;
		border-radius: 20rpx;
		margin-top: 20rpx;
		.title{
			font-weight: 600;
		}
		.ipt{
			display: flex;
			padding: 10rpx 20rpx;
			margin-top: 20rpx;
			justify-content: space-between;
			align-items: center;
			border: 2rpx solid #EDEDED;
			border-radius: 10rpx;
			color: #545454;
		}
		.flex-space{
			display: flex;
			justify-content: space-between;
			color:#808080;
			margin-top: 20rpx;
		}
		.txt{
			color: #B9BABC;
			margin-top: 20rpx;
		}
	}
	.last{
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFF;
		.submit{
			padding: 16rpx 30rpx;
			font-size: 15px;
			background-color: #EFCA3E;
			color: #000;
			border-radius: 30rpx;
		}
	}
</style>
