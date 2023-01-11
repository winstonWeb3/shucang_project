<template>
	<view class="invite">
		<view class="invite-content">
			<view class="invite-title invite-title-a"></view>
			<view class="invite-list">
				<view class="invite-item" v-for="(item,index) in member">
					<view>{{index + 1}}</view>
					<view class="invite-left">
						<view class="headerInfo">
							<view class="userinfo">
								<view class="name">{{item.nick_name}}</view>
								<view class="phone">ID:{{item.user_id}}</view>
							</view>
						</view>
					</view>
					<view class="invite-right">{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				member:[],  //邀请排行榜
			}
		},
		onLoad() {
			this.getMember()
		},
		methods: {
			getMember(){
				this.$request('post', 'article/invitelist').then(res => {
					console.log('res', res)
					this.member = res.data.list;
				}).catch(err => {
					console.log('err', err)
				})
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
			.invite-title-a{
				margin-top: 0;
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
