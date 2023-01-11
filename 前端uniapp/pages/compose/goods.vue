<template>
	<view class="detail">
		<view class="header">
			<view class="media">
				<view class="media-img-wrapper">
					<image :src="detailList.file_path" mode=""></image>
				</view>
			</view>
			<view class="last">
				<view class="last-img">
				</view>
			</view>
		</view>
		<view class="content">
			<view class="story-title">{{detailList.goods_name}} 合成</view>
			<view class="story-title">合成产品</view>
			<view class="story_box">
				<view class="story_item" :class="item.count != 0 ? 'active':''" v-for="(item,index) in detailList.debris" @click="link(item.goods.goods_id)">
					<view class="name">{{item.goods.goods_name}}</view>
					<view class="type">{{item.count !=0 ? `已拥有${item.count}`:'未拥有'}}</view>
					<view class="img">
						<image class="auto-img" :src="item.goods.images" mode=""></image>
					</view>
				</view>
			</view>
			<view class="last_title">合成简介</view>
			<view class="component-content">
				<rich-text :nodes="detailList.content"></rich-text>
			</view>
		</view>
		<view class="footer-fixed">
			<view class="btn-normal" :class="detailList.num == detailList.debris.length ? 'btn-active':''" @click="synthesis">立即合成</view>
			<view class="compose-progress">当前合成进度 ：{{detailList.num}}/{{detailList.debris.length}}</view>
		</view>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				detailImg: require('../../static/story_03.png'),
				storyImg: require('../../static/story.png'),
				noticeText: '数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
				detailList: {},
				userinfo: ''
			}
		},
		onLoad(data) {
			console.log(data)
			this.getDetailList(data.id)
			this.userinfo = uni.getStorageSync('userinfo')
		},
		methods: {
			link(id){
				uni.navigateTo({
					url: '/pages/index/detail?id=' + id
				})
			},
			synthesis(){
				// if(this.detailList.num < this.detailList.debris.length) return
				this.$request('post', 'goods/compound', {
					goodsId:this.detailList.goods_id
				}).then(res => {
					this.$showToast(res.message)
					setTimeout(()=>{
					uni.switchTab({
						url:'/pages/collection/index'
					})
					},800)
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			getDetailList(id) {
				this.$request('get', 'goods/debrisDetails', {
					goodsId: id
				}).then(res => {
					console.log('res', res)
					res.data.goodsdetails.content = tool.formatRichText(res.data.goodsdetails.content)
					this.detailList = res.data.goodsdetails
					console.log('fadf',	this.detailList)
					let date = new Date(res.data.goodsdetails.startTime.replace(/-/g, '/')).getTime()
					let timestamp = new Date().getTime()
					if (timestamp > date) return this.showIcon = true
					console.log('ppp', date, (date - timestamp))
					// this.timer = setInterval(() => {
					// 	let timestamp = new Date().getTime()
					// 	let countdown = date - timestamp
					// 	this.showIcon = false
					// 	if (countdown - 1 > 1) {
					// 		countdown -= 1
					// 		this.startTime = this.formateSeconds(countdown)
					// 		// console.log('sad',this.startTime)
					// 	} else {
					// 		this.showIcon = true
					// 		clearInterval(this.timer)
					// 	}
					// }, 1000)
				}).catch(err => {
					console.log('err', err)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFF;
	}

	.last_title {
		font-size: 17px;
		color: #101010;
		font-weight: 700;
	}

	.detail {
		width: 100%;
		padding: 0 0 120rpx;
		box-sizing: border-box;

		.header {
			height: 580px;
			// background-image: url('../../static/bg1.png');
			// background-position: top;
			// background-size: cover;
			position: relative;
			background-color: #fff;

			.last {
				width: 632rpx;
				height: 382rpx;
				margin: 0 auto;
				box-sizing: border-box;
				position: absolute;
				bottom: 60rpx;
				left: calc(50% - 310rpx);

				.last-img {
					width: 100%;
					height: 100%;
					background-image: url('../../static/last.png');
					background-position: 50%;
					background-size: cover;
					position: relative;
					padding: 160rpx 20rpx 0;
					box-sizing: border-box;

					.flex-center {
						display: flex;
						justify-content: center;
						align-items: center;

						.flex-fixed {
							width: 36rpx;
							height: 30rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						.title {
							color: #FFF;
							padding: 0 20rpx;
							font-size: 15px;
							font-weight: 700;
						}
					}

					.assets {
						display: flex;
						align-items: center;
						justify-content: center;
						color: #FFF;
						font-size: 13px;
						margin-top: 10rpx;

						text:nth-child(1) {
							color: #999;
							margin-right: 20rpx;
						}
					}
				}
			}

			.media {
				position: absolute;
				top: 30%;
				left: 50%;
				transform: translate(-50%, -50%) !important;
				z-index: 2;

				.media-img-wrapper {
					width: 400rpx;
					height: 400rpx;
					border-radius: 30rpx;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.detail-image {
			width: 100%;
			text-align: center;
			transform: translate3d(0, 0, 0);

			.detail-img {
				width: 70%;
				animation: detail 20s infinite;
				transform: translate3d(0, 0, 2rpx);
			}
		}

		.exhibition {
			width: 100%;
			padding: 100rpx 0 100rpx;
			background: url(../../static/story_02.png) no-repeat;
			background-size: 100% 100%;
			font-size: 45rpx;
			color: #fff;
			text-align: center;

			.titleTop {
				margin-top: 50rpx;
				font-weight: 700;
			}

			.number {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				margin: 20rpx 0;

				.numText {
					display: flex;
					align-items: center;
					border-radius: 5rpx;
					background: #4B4B4C;
					color: #F3E0BC;
					padding-right: 20rpx;
					margin-right: 15rpx;

					.title {
						background: #F3E0BC;
						padding: 5rpx 10rpx;
						color: #000;
						border-radius: 5rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.content {
			position: relative;
			padding: 30rpx 20rpx 140rpx;
			box-sizing: border-box;
			margin-top: -150px;
			background: #FFF;
			border-radius: 40rpx 40rpx 0 0;
			box-shadow: 0 0 5px #eee;
			.story-title {
				font-size: 17px;
				font-weight: 700;
				margin-top: 20rpx;
			}

			.story_box {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-top: 48rpx;

				.story_item {
					margin: 0 32rpx 32rpx 0;
					padding: 30rpx 10rpx 22rpx 24rpx;
					width: 206rpx;
					box-sizing: border-box;
					background: #f5f5f5;
					border-radius: 10rpx;

					.name {
						margin-bottom: 10rpx;
						font-size: 28rpx;
						font-weight: 700;
						color: #333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.type {
						margin-bottom: 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #999;
					}

					.img {
						width: 160rpx;
						height: 160rpx;
						background: #f1f1f1;
						border-radius: 8rpx;
						overflow: hidden;
					}
				}
				.active{
					background-color: #dccdcd;
				}
			}

			.component-content {
				background-color: #f9f9f9;
				margin-top: 44rpx;
				padding: 32rpx;
				border-radius: 32rpx;
				line-height: 33px;
				color: #333;
			}

			.story {
				width: 100%;
				background: #f9f9f9;
				border-radius: 30rpx;
				margin-top: 20rpx;
				color: #333;
				padding: 40rpx 30rpx;
				margin-bottom: 30rpx;
				box-sizing: border-box;


				.story-content-img {
					width: 100%;
				}

				.story-author {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30rpx 20rpx 20rpx;
					color: #A3A3A3;
					font-size: 35rpx;

					.story-author-text {
						color: #fff;
					}
				}
			}

		}
	}

	.footer-fixed {
		display: block;
		box-sizing: border-box;
		padding: 12px 0 19px;
		height: 96px;
		background-color: #fff;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11;
		box-shadow: 0 0 5px #ddd;
		.btn-normal {
			background: #a4a1a1;
			color: #fff;
			cursor: default;
			width: 311px;
			height: 41px;
			border-radius: 20px;
			margin: 0 auto 7px;
			font-size: 16px;
			font-weight: 400;
			line-height: 41px;
			text-align: center;
		}
		.btn-active{
			background-color: #2A67F2;
			color: #FFF;
		}
		.compose-progress{
			font-size: 12px;
			    font-weight: 400;
			    color: #767676;
		}
	}
</style>
