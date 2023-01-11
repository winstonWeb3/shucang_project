<template>
	<view>
		<!-- <view class="dis_flex" @click="compose">
			<view class="left">
				<view class="img"><image src="../../static/compose.png" mode=""></image></view>
				<view class="">
					<view class="compose_title">合成藏品</view>
					<view class="tip_title">集齐藏品合成限定藏品</view>
				</view>
			</view>
			<view class="right">去合成</view>
		</view> -->
		<view class="top_img">
			<image class="auto-img" src="../../static/top11.png" mode=""></image>
		</view>
		<view class="tab-list">
			<view class="tab" v-for="(item,index) in arr" :key="index" :class="changeIndex == index?'active':''"
				@click="switchIndex(index)">
				<view class="img">
					<image :src="item.img" class="auto-img" mode=""></image>
				</view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="limi">
			<view class="item" @click="limiChange(index)" :class="limiIndex == index?'active':''"
				v-for="(item,index) in limiBox" :key="index">{{item.name}}</view>
		</view>
		<view class="none_box" v-if="box.length == 0">
			<view class="none">
				<image src="../../static/assets_empty.jpg" mode=""></image>
			</view>
			<view class="txt" v-if="changeIndex != 2">亲，您还没有藏品哦</view>
			<view class="txt" v-else>亲，您还没有盲盒哦</view>
		</view>
		<!-- <view class="collect" v-if="changeIndex == 0">
			<view class="item" v-for="(item,index) in box" :key="index" @click="link(item.goods_id,item.coll_id)" >
				<view class="shop_img">
					<image :src="configs + item.file_path" mode=""></image>
				</view>
				<view class="detail_box">
					<view class="name">编号:{{item.coll_id}}</view>
					<view class="name">{{item.goods_name}}</view>
					<view>{{utTime(item.addtime)}}</view>
					<view class="away_box">
						<view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view>
						<view class="sell" @click.stop="sell(item.coll_id,item.status)"><text
								v-if="item.status == 0">挂售</text><text v-else>下架</text></view>
					</view>
				</view>
				
			</view>
		</view> -->
		<view class="collect" v-if="changeIndex == 0 && limiIndex != 2">
			<template v-for="(item,index) in box" v-if="limiIndex == 0">
				<view class="item" :key="index" @click="link(item.goods_id,item.coll_id,item.coll_no,item.status)"
					v-if="limiIndex == 0 && item.status != 1 && item.is_box != 1">
					<!-- <template v-if="limiIndex == 0 && item.status != 1"> -->
					<view class="shop_img">
						<image :src="configs + item.file_path" mode=""></image>
					</view>
					<view class="detail_box">
						<view class="name">编号:{{item.coll_no}}</view>
						<view class="name">{{item.goods_name}}</view>
						<view>{{utTime(item.addtime)}}</view>
						<view class="away_box">
							<view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view>
							
						</view>
					</view>
					
				</view>
			</template>
			<template v-for="(item,index) in box" v-if="limiIndex == 1">
				<view class="item" :key="index"
					@click="link(item.goods_id,item.coll_id,item.coll_no,item.status)" v-if="item.is_box != 1 && item.status == 1">
						<view class="shop_img">
							<image :src="configs + item.file_path" mode=""></image>
						</view>
						<view class="detail_box">
							<view class="name">编号:{{item.score}}</view>
							<view class="name">{{item.goods_name}}</view>
							<view>{{utTime(item.addtime)}}</view>
							<view class="away_box">
								<!-- <view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view> -->
								<!-- <view class="sell" @click.stop="sell(item.coll_id,item.status)"><text
									v-if="item.status == 0">转售</text><text v-else>下架</text></view> -->
							</view>
						</view>
				</view>
			</template>
		</view>
		<view class="collect" v-if="changeIndex == 0 && limiIndex == 2">
			<view class="item" v-for="(item,index) in limiArr" :key="index" v-if="item.is_box != 1">
				<view class="shop_img">
					<image :src="configs + item.file_path" mode=""></image>
				</view>
				<view class="detail_box">
					<view class="name">编号:{{item.score}}</view>
					<view class="name">{{item.goods_name}}</view>
					<view>{{utTime(item.addtime)}}</view>
					<!-- <view class="away_box">
						<view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view>
						<view class="sell" @click.stop="sell(item)"><text
								v-if="item.status == 0">转售</text><text v-else>下架</text></view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="collect" v-if="changeIndex == 1 && limiIndex != 2">
			<template v-for="(item,index) in box" v-if="limiIndex == 0" >
				<view class="item" :key="index" @click="link(item.goods_id,item.coll_id,item.coll_no,item.status)"
					v-if="limiIndex == 0 && item.status != 1 && item.is_box == 1">
					<!-- <template v-if="limiIndex == 0 && item.status != 1"> -->
					<view class="shop_img">
						<image :src="configs + item.file_path" mode=""></image>
					</view>
					<view class="detail_box">
						<view class="name">编号:{{item.score}}</view>
						<view class="name">{{item.goods_name}}</view>
						<view>{{utTime(item.addtime)}}</view>
						<view class="away_box">
							<view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view>
							
						</view>
					</view>
					
				</view>
			</template>
			<template v-for="(item,index) in box" v-if="limiIndex == 1">
				<view class="item" :key="index"
					@click="link(item.goods_id,item.coll_id,item.coll_no,item.status)" v-if="item.is_box == 1 && item.status == 1">
						<view class="shop_img">
							<image :src="configs + item.file_path" mode=""></image>
						</view>
						<view class="detail_box">
							<view class="name">编号:{{item.score}}</view>
							<view class="name">{{item.goods_name}}</view>
							<view>{{utTime(item.addtime)}}</view>
							<view class="away_box">
								<!-- <view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view> -->
								<!-- <view class="sell" @click.stop="sell(item.coll_id,item.status)"><text
									v-if="item.status == 0">转售</text><text v-else>下架</text></view> -->
							</view>
						</view>
				</view>
			</template>
		</view>
		<view class="collect" v-if="changeIndex == 1 && limiIndex == 2">
			<view class="item" v-for="(item,index) in limiArr" :key="index" v-if="item.is_box == 1">
				<view class="shop_img">
					<image :src="configs + item.file_path" mode=""></image>
				</view>
				<view class="detail_box">
					<view class="name">编号:{{item.score}}</view>
					<view class="name">{{item.goods_name}}</view>
					<view>{{utTime(item.addtime)}}</view>
					<!-- <view class="away_box">
						<view class="away" v-if="item.giveType == 1" @click.stop="open(item.coll_id)">转赠</view>
						<view class="sell" @click.stop="sell(item)"><text
								v-if="item.status == 0">转售</text><text v-else>下架</text></view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="back" @click="payType = false" v-if="payType">
			<view class="change" @click.stop>
				<view class="title">填写转赠人手机号</view>
				<view class="ipt">
					<input type="text" value="" placeholder="请输入转赠手机号" v-model="giveId" />
				</view>
				<view class="yes" @click="give">确定</view>
			</view>
		</view>
		<view class="back" @click="moneyShow = false" v-if="moneyShow">
			<view class="change" @click.stop>
				<view class="title">填写转售价格</view>
				<view class="ipt">
					<input type="number" value="" placeholder="请输入转售价格" v-model="price" />
				</view>
				<view style="margin-top: 10rpx;margin-left: 20rpx;color:#808080;">手续费:{{charges}}%</view>
				<view style="margin-top: 10rpx;margin-left: 20rpx;color:#808080;">版权费:{{copyright}}%</view>
				<view class="yes" @click="sub">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [{
					name: '藏品',
					img: '../../static/cp1.png'
				}, {
					name: '盲盒',
					img: '../../static/mh1.png'
				}],
				limiBox: [{
						name: '收藏中'
					},
					{
						name: '转售中'
					},
					{
						name: '已转售'
					}
				],
				changeIndex: 0,
				limiIndex: 0,
				box: '',
				changeId: '',
				payType: false,
				moneyShow: false,
				giveId: '',
				configs: '',
				price: '',
				id: '',
				nowHave: '',
				charges: '',
				copyright: '',
				limiArr: []
			}
		},
		methods: {
			switchIndex(index) {
				this.changeIndex = index
				this.getList()
			},
			limiChange(index) {
				this.limiIndex = index
				if (this.limiIndex == 2) {
					this.$request('post', 'order/sold', {
						userid: uni.getStorageSync('userinfo').userId
					}).then(res => {
						console.log('asdasd', res)
						this.limiArr = res.data.list
					}).catch(err => {
						console.log('err', err)
						this.$showToast(err.message)
					})
				}
			},
			open(id) {
				this.changeId = id
				console.log('asd', id)
				this.payType = true
			},
			sell(item) {
				let that = this
				item.file_path = this.$config.ImgUrl + item.file_path
				uni.navigateTo({
					url: "/pages/collection/sale?obj=" + JSON.stringify(item)
				})
				that.id = id
				// 		if (status == 0) {
				// 			this.$request('get', 'order/config', {}).then(res => {
				// 				that.charges = res.data.charges
				// 				that.copyright = res.data.copyright
				// 				return that.moneyShow = true
				// 			}).catch(err => {
				// 				console.log('err', err)
				// 				that.$showToast(err.message)
				// 			})
				// 		} else {
				// 			uni.showModal({
				// 				title: '提示',
				// 				content: '是否确认下架',
				// 				success: function(res) {
				// 					if (res.confirm) {
				// 						that.$request('get', 'order/unsale', {
				// 							'collId': id
				// 						}).then(res => {
				// 							that.$showToast(res.data.message)
				// 							that.getList()
				// 						}).catch(err => {
				// 							console.log('err', err)
				// 							that.$showToast(err.message)
				// 						})

				// 					} else if (res.cancel) {
				// 						console.log('用户点击取消');
				// 					}
				// 				}
				// 			});
				// 		}
			},
			sub() {
				if (this.price == '') return this.$showToast('请输入转售价格')
				this.$request('get', 'order/sale', {
					'collId': this.id,
					'price': this.price
				}).then(res => {
					this.$showToast(res.message)
					this.moneyShow = false
					setTimeout(() => {
						uni.switchTab({
							url: '../blindBox/index'
						})
					}, 600)
				}).catch(err => {
					console.log('err', err)
					that.$showToast(err.message)
				})
			},
			compose() {
				uni.navigateTo({
					url: '/pages/compose/index'
				})
			},
			getList() {
				this.$request('post', 'order/myColl', {
					userid: uni.getStorageSync('userinfo').userId
				}).then(res => {
					this.box = res.data
					let num = 0
					// if (this.changeIndex == 0) return this.nowHave = this.box.length
					if (this.changeIndex == 0 && this.arr) {
						this.box.forEach(item => {
							if (item.is_box == 0) {
								num += 1
							}
						})
						this.nowHave = num
					} else if (this.changeIndex == 1 && this.arr) {
						this.box.forEach(item => {
							if (item.is_box == 1) {
								num += 1
							}
						})
						this.nowHave = num
					}
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			give(id) {
				if (this.giveId == '') {
					return this.$showToast('请输入转赠人手机号')
				}
				this.$request('post', 'order/giveGoods', {
					collId: this.changeId,
					heuserid: this.giveId
				}).then(res => {
					this.payType = false
					this.$showToast(res.message)
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			link(id, collid, score, status) {
				uni.navigateTo({
					url: `/pages/collection/detail?id=${id}&type=1&collId=${collid}&score=${score}&status=${status}`
				})
			},
			utTime(num) {
				return this.$utilTime(num)
			}
		},
		onShow() {
			this.getList()
			this.configs = this.$config.ImgUrl
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F6F7FB !important;
	}

	.top_img {
		width: 100%;
		height: 420rpx;
	}

	.dis_flex {
		height: 150rpx;
		width: 90%;
		margin: 10rpx auto;
		background: linear-gradient(-64deg, #97461a, #f9dda8 0, #ffd392 56%, #f9dda8);
		border-radius: 20rpx;
		padding: 0 32rpx 0 40rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			align-items: center;

			.img {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.compose-title {
				color: #1c1c1c;
				font-size: 15px;
				font-weight: 700;
			}

			.tip_title {
				color: #333;
				margin-top: 10rpx;
				font-size: 14px;
			}
		}

		.right {
			width: 140rpx;
			height: 42rpx;
			background: hsla(0, 0%, 100%, .9);
			border-radius: 28rpx;
			text-align: center;
			line-height: 42rpx;
			font-size: 28rpx;
			color: #d7b059;
		}
	}

	.tab-list {
		height: 80rpx;
		display: flex;
		padding-left: 8rpx;
		box-shadow: 0px 3px 6px #F1F2F5;
		background-color: #FFF;

		.tab {
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #A8A8A8;
			height: 100%;
			line-height: 86rpx;
			font-size: 15px;
			font-weight: 700;

			.img {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
				display: flex;
			}
		}

		.active {
			// border-bottom: 6rpx solid #1989FA;
			color: #232323;
			font-weight: 700;
			position: relative;
		}

		.active:after {
			content: '';
			position: absolute;
			width: 16%;
			bottom: 0;
			left: 42%;
			height: 6rpx;
			border-radius: 6rpx;
			background-color: #F8DE3D;
		}
	}

	.limi {
		width: 100%;
		padding: 30rpx 50rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.item {
			padding: 6rpx 20rpx;
			color: #191606;
			background-color: #E9EAEC;
			border-radius: 30rpx;
		}

		.active {
			background-color: #F2CF3D;
		}
	}

	.none_box {
		padding-top: 200rpx;
		padding: 140rpx 100rpx;
		text-align: center;

		.none {
			width: 200rpx;
			height: 160rpx;
			margin: 0 auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.txt {
			margin-top: 80rpx;
			color: #bcbcbc;
		}
	}

	.collect {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 20rpx;
		flex-wrap: wrap;

		.item {
			width: 48%;
			border-radius: 30rpx;
			margin-bottom: 20rpx;
			background-color: #FFF;
			box-shadow: 0px 3px 6px #F1F2F5;
			// border-radius: 0 0 30rpx 30rpx;
			overflow: hidden;

			.shop_img {
				width: 100%;
				height: 320rpx;
				border-radius: 30rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.detail_box {
				background-color: #FFF;
				border-radius: 0 0 30rpx 30rpx;
				padding: 40rpx 20rpx 20rpx;
				box-sizing: border-box;
				color: #4A4A4A;
				margin-top: -20rpx;

				.name {
					margin-bottom: 12rpx;
				}

				.away_box {
					display: flex;
					justify-content: space-between;

					.away {
						background-color: #F3E0BC;
						color: #000;
						padding: 6rpx 16rpx;
						border-radius: 8rpx;
						font-size: 15px;
						margin-top: 10rpx;
						display: flex;
					}

					.sell {
						background-color: #E5004D;
						color: #FFF;
						padding: 6rpx 16rpx;
						border-radius: 8rpx;
						font-size: 15px;
						margin-top: 10rpx;
						display: flex;
						margin-left: auto;
					}
				}
			}

		}
	}

	.back {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;

		.change {
			width: 86%;
			padding: 30rpx;
			background-color: #FFF;
			border-radius: 30rpx;
			box-sizing: border-box;

			.title {
				text-align: center;
			}

			.ipt {
				margin: 0 auto;
				margin-top: 30rpx;
				width: 90%;
				height: 70rpx;
				line-height: 70rpx;
				border: 4rpx dashed #F3E0BC;
				padding-left: 8rpx;

				input {
					width: 100%;
					height: 100%;
				}
			}
		}

		.yes {
			width: 80%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #F3E0BC;
			color: #000;
			margin: 0 auto;
			margin-top: 40rpx;
			border-radius: 34rpx;
		}
	}
</style>
