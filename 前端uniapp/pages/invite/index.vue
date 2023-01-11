<template>
	<view class="invite">
		<view class="invite-content">
			<view class="poster" @click="poster">去生成海报</view>
			<!-- <view class="invite-image">
				<image :src="viteImg" class="invite-image" @click="previewImage"></image>
			</view> -->
			<view class="invite-title">邀请明细</view>
			<view class="invite-list">
				<view class="invite-item" v-for="item in myExtenMan">
					<view class="invite-left">
						<view class="headerInfo">
							<image class="header-img" :src="configs + item.head_path"
								mode=""></image>
							<view class="userinfo">
								<view class="name">{{item.nick_name}}</view>
								<view class="phone">ID:{{item.user_id}}</view>
							</view>
						</view>
					</view>
					<view class="invite-right">{{utilTime(item.create_time)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: [{
					image: require('../../static/user.jpeg'),
					name: '藏家_001',
					phone: '10086'
				}, {
					image: require('../../static/user.jpeg'),
					name: '藏家_001',
					phone: '10086'
				}, {
					image: require('../../static/user.jpeg'),
					name: '藏家_001',
					phone: '10086'
				}],
				viteImg: '',
				myExtenMan: [],
				configs:''
			}
		},
		onLoad() {
			this.getVite()
			this.configs = this.$config.ImgUrl
		},
		methods: {
			getVite() {
				this.$request('post', 'Checkout/myExten', {
					userid: uni.getStorageSync('userinfo').userId,
				}).then(res => {
					console.log('res', res)
					this.viteImg = res.data.myExtenImg.extensionImg
					res.data.myExtenMan.forEach(item=>{
						item.nick_name = item.nick_name.replace(/.{4}$/g,"***")
					})
					this.myExtenMan = res.data.myExtenMan
				}).catch(err => {
					console.log('err', err)
				})
			},
			poster(){
				uni.navigateTo({
					url:'/pages/invite/invitePoster'
				})
			},
			previewImage() {
				uni.previewImage({
					current: 0,
					urls: [this.viteImg] //必须是网址路径，否则加载不出来，如：http：或https：
				});
			},
			utilTime(num) {
				return this.$utilDate(num)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.invite {
		.invite-content {
			background: #FFF;
			border-radius: 20rpx;
			margin: 20rpx 20rpx 0;
			padding: 20rpx 40rpx 30rpx;

			.poster {
				width: 100%;
				background-color: #f2f2f2;
				color: #000;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 16rpx;
				text-align: center;
				-moz-box-shadow: -1px 0px 5px #FFFFFF;
				-webkit-box-shadow: -1px 0px 5px #FFFFFF;
				box-shadow: -1px 0px 5px #FFFFFF;
				margin-top: 20rpx;
			}

			.invite-image {
				width: 320rpx;
				height: 320rpx;
				margin: 0 auto;
			}

			.invite-title {
				font-size: 40rpx;
				color: #000;
				margin: 80rpx 0 30rpx;
				border-bottom: 2rpx solid #6c6969;
				padding-bottom: 6rpx;
				
			}

			.invite-list {
				.invite-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 35rpx;
					margin-bottom: 30rpx;
					color: #000;

					.headerInfo {
						display: flex;
						align-items: center;

						.header-img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 100%;
							margin-right: 25rpx;
						}

						.userinfo {
							font-size: 25rpx;
							color: #999;

							.name {
								color: #000;
								font-size: 35rpx;
								margin-bottom: 10rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
