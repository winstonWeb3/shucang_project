<template>
	<view class="contain">
		<view class="list" v-for="(item,index) in arr" :key="index">
			<view class="active-status">进行中</view>
			<view class="img">
				<image class="auto-img" :src="item.goods_image" mode=""></image>
			</view>
			<view class="assets_info">
				<view class="assets_name">{{item.goods_name}}</view>
				<view class="btn_open" @click="goCompose(item.goods_id)">去合成 ></view>
			</view>
			<view class="booth-top"></view>
			<view class="booth-bottom"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
             arr:''
			}
		},
		onShow(){
			this.getList()
		},
		methods: {
			goCompose(id) {
				uni.navigateTo({
					url: '/pages/compose/goods?id=' + id
				})
			},
			getList(){
				this.$request('get', 'goods/rareList', {
							}).then(res => {
								console.log('asd',res)
								this.arr = res.data.data
							}).catch(err => {
								console.log('err', err)
								that.$showToast(err.message)
							})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff !important;
	}

	.contain {
		padding: 26rpx 20rpx 0;

		.list {
			position: relative;
			margin-bottom: 40rpx;
			height: 320rpx;
			-webkit-box-shadow: 0 0 8rpx 0 #bbb;
			box-shadow: 0 0 8rpx 0 #bbb;
			border-radius: 10rpx;
			box-sizing: border-box;

			.active-status {
				position: absolute;
				left: -6px;
				top: 30px;
				width: 66px;
				height: 30px;
				line-height: 29px;
				text-align: center;
				font-size: 11px;
				background: #d7b059;
				background-size: 100% auto;
				border-top-right-radius: 13px;
				border-bottom-right-radius: 13px;
				opacity: .8;
				color: #fff;
			}

			.img {
				width: 180rpx;
				height: 180rpx;
				position: absolute;
				left: 32%;
				bottom: 32%;
				transform: translateX(-50%);
				margin: auto;
			}

			.assets_info {
				width: 296rpx;
				padding-top: 40rpx;
				position: absolute;
				top: 0;
				right: 52rpx;
				z-index: 3;

				.assets_name {
					display: -webkit-box;
					word-break: break-all;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					color: #000;
				}

				.btn_open {
					width: 140rpx;
					height: 52rpx;
					line-height: 52rpx;
					text-align: center;
					border-radius: 6rpx;
					box-shadow: 0 0 8rpx #ddd inset;
					margin-top: 60rpx;
					font-size: 14px;
					color: #555;
				}
			}

			.booth-top {
				width: 320rpx;
				height: 118rpx;
				background-image: url('../../static/booth_top.png');
				background-size: cover;
				background-position: 50%;
				position: absolute;
				bottom: -5px;
				left: 33px;
				z-index: 2;
			}

			.booth-bottom {
				width: 620rpx;
				height: 80rpx;
				background-image: url('../../static/booth_bottom.png');
				background-size: cover;
				background-position: 50%;
				position: absolute;
				bottom: 5px;
				left: 50%;
				-webkit-transform: translateX(-50%);
				transform: translateX(-50%);
				z-index: 1;
			}
		}
	}
</style>
