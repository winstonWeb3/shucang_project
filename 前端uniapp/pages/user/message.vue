<template>
	<view class="userinfo">
		<view class="userinfo-item" v-for="item in userinfo" @click="change(item.text)">
			<view class="icon-left">
				{{item.title}}
			</view>
			<view class="icon-right">
				<view class="icon-text">{{item.text}}</view>
			</view>
		</view>
		<view class="tip">提示:点击上方号码可复制</view>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				userinfo: [{
						title: '微信',
						text: ''
					},
					{
						title: 'QQ',
						text: ''
					},
				],
			}
		},
		onShow() {
			this.getContent()
		},
		methods: {
			change(txt) {
				// #ifdef H5
				this.$copyText(txt).then(
					res => {
						this.$showToast('复制成功')
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: txt,
					success: () => {
						this.$showToast('复制成功')
					}
				})
				// #endif
			},
			getContent() {
				this.$request('post', '/Setting/chakeAbout', {}).then(res => {
					this.userinfo[0].text = res.data.data[0].wecha
					this.userinfo[1].text = res.data.data[0].qq
					console.log('res', res)
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

	.userinfo {
		padding: 0 20rpx;

		.userinfo-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #000;
			background: #FFF;
			border-radius: 30rpx;
			margin-top: 25rpx;
			padding: 30rpx 50rpx;
		}

		.login_out {
			width: 100%;
			border-radius: 30rpx;
			background: #292B2B;
			color: #C94F58;
			text-align: center;
			padding: 30rpx 0;
			margin-top: 200rpx;
		}

		.icon-left {
			font-size: 35rpx;
		}

		.icon-right {
			display: flex;
			align-items: center;
			color: #A6A7A7;
			font-size: 35rpx;

			.icon-text {
				display: flex;
				align-items: center;

				.icon-a {
					margin-right: 10rpx;
				}
			}
		}
		.tip{
			color: #000;
			margin-top: 20rpx;
			margin-left: 10rpx;
		}
	}
</style>
