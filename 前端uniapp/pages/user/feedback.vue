<template>
	<view>
		<view class="title">您的意见或建议:</view>
		<view class="txt">
			<textarea class="inp" value="" placeholder="请输入您的意见" v-model="txt"/>
		</view>
		<view class="sub" @click="submit">提交</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				txt:''
			}
		},
		methods:{
			submit(){
				if(this.txt == ''){
					this.$showToast('请输入您的意见')
				}else{
					let userinfo = uni.getStorageSync('userinfo')
					this.$request('post','User/feedback',{
						userid: userinfo.userId,
						textend:this.txt
					}).then(res => {
						console.log(';;',res)
						this.txt = ''
						this.$showToast(res.message)
					}).catch(err => {
						console.log('err',err)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F2F2F2;
	}
	.title{
		padding: 20rpx 0 0 20rpx;
		color: #000;
	}
	.txt{
		padding: 20rpx;
		.inp{
			width: 100%;
			background-color: #FFFFFF;
			min-height: 260rpx;
			padding:10rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
		}
	}
	.sub{
		width: 88%;
		height: 70rpx;
		border-radius: 40rpx;
		color: #FFF;
		line-height: 70rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		text-align: center;
		background-color: #007aff;
	}
</style>
