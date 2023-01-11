<template>
	<view>
		<view class="fix_title">
			<view :class="[changeIndex == index? 'fix_item' :'no_change']" v-for="(item,index) in changeArr" :key="index"
				@click="change(index)">
				<view class="">{{item.name}}</view>
			</view>
		</view>
		<view class="item" v-for="(item,index) in arr" :key="index">
			<view>
				<view style="margin-bottom: 8rpx;">{{item.describe}}</view>
				<view>{{item.create_time}}</view>
			</view>
			<view>{{item.money}}</view>
		</view>
		<view class="noMore" v-if="arr.length == 0">
			<view class="img"><image class="auto-img" src="../../../static/noWallet.png" mode=""></image></view>
			<view>亲，暂无相关提现记录哦</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				changeArr:[{
					name: '全部'
				}, {
					name: '待审核'
				}, {
					name: '已打款'
				}],
				changeIndex:0,
				arr:''
			}
		},
		onShow(){
			this.util()
		},
		methods:{
			util(){
				this.$request('get', 'user/tixian', {
					status:this.changeIndex
				}).then(res => {
					console.log('asd',res)
					this.arr = res.data.list
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			// otherPu(){
			// 	this.$request('get', 'user/tixian', {
			// 		status:this.changeIndex - 1
			// 	}).then(res => {
			// 		console.log('asd',res)
			// 		this.arr = res.data.balanceLog
			// 	}).catch(err => {
			// 		console.log('err', err)
			// 		this.$showToast(err.message)
			// 	})
			// },
			change(index){
				this.changeIndex = index
				this.util()
				// if(index == 0){
				// 	this.util()
				// }else{
				// 	this.otherPu()
				// }
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFF;
	}
	.fix_title {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 160rpx 20rpx 30rpx;
		border-bottom: 1px solid #eee;
	
		.no_change {
			color: #666;
		}
	
		.fix_item {
			color: #0072e3;
			border-bottom: 4rpx solid #0072e3;
			padding-bottom: 8rpx;
		}
	}
	.item{
		    width: 96%;
			margin: 0 auto;
		    font-size: 13px;
		    color: #000;
		    background-color: #fff;
			box-shadow: 0 0 10rpx #ddd;
		    padding: 14px 17px;
		    border-radius: 8px;
		    margin-top: 20rpx;
		    box-sizing: border-box;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
	}
	.noMore{
		padding-top: 140rpx;
		    color: #999;
			font-size: 16px;
			text-align: center;
		.img{
			width: 260rpx;
			height: 160rpx;
			margin: 0 auto;
			margin-bottom: 20rpx;
		}
	}
</style>
