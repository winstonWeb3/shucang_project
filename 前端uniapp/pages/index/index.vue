<template>
 	<view class="content">
 		<view class="index_login" v-if="loginType">
 			<view class="index_text">立即登录，开启你的数字藏品之旅</view>
 			<view class="index-right">
 				<view @click="loginBtn" class="index-btn">登录</view>
 				<image @click="loginClose" src="../../static/close.png" mode="widthFix" class="index-close"></image>
 			</view>
 		</view>
		<view class="nav_title">
			<view class="nav_name">绿谷</view>
			<view>图表</view>
		</view>
 		<view class="banner">
 			<swiper :current="swiperCur" :indicator-dots="true" :autoplay="true" :circular="true" :interval="7000" :duration="1000"
 				indicator-active-color="#fff" @change="swiperChange">
 				<swiper-item v-for="(item,index) in bannerImg" @click="linkTo(index)">
 					<view class="swiper-item">
 						<image class="banner-image" :src="item.imgUrl" ></image>
 					</view>
 				</swiper-item>
 			</swiper>
 		</view>
 		<!-- <view class="dots_box">
 			<view class="item" :class="index == swiperCur?'active':'nochange' " v-for="(item, index) in bannerImg"
 				:key="index">
 			</view>
 		</view> -->
		<view class="tab-list">
			<view class="tab-item" :class="[index == changeIndex ? 'active':'']" v-for="(item,index) in changeArr"
				:key="index" @click="change(index)">{{item.name}}</view>
		</view>
		
<!-- 	<view class="notice_box">
 			<view class="notice_img"><image class="auto-img" src="../../static/notice.png" mode=""></image></view>
			<view class="notice_txt">
				<view>最新公告</view>
				<view>NEW DEAL</view>
				<view class="tip">
					<view class="right"><image class="auto-img" src="../../static/rightfill.png" mode=""></image></view>
					<view>藏品显示问题通知</view>
				</view> 
				<view class="Notice">
					<swiper :vertical="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
						<swiper-item v-for="item in arr" @click="linkText(item.params.text)">
							<view class="swiper-item">
								<uni-notice-bar
									showIcon 
									single
									scrollable
									background-color="#6085F3"
									color="#FFFFFF"
									:text="item.params.text">
								</uni-notice-bar>
							</view>
						</swiper-item>
					</swiper>
				</view>	
			</view>
		</view> -->
		
 		<view class="picture" v-if="changeIndex == 0">
 			<view class="pic-item" v-for="item in picList" @click="link(item.goods_id)">
 				<image :src="item.file_path" class="pic-img"></image>
 				<view class="pic-text">
 					<view class="titleTop">{{item.goods_name}}</view>
 					<view class="number">
 						<view class="numText">
 							<view class="title">全球限量</view>{{item.stock_total}}份
 						</view>
 					</view>
 					<view class="toast">{{item.author}}</view>
 					<view class="detail">￥{{item.goods_price_min}}</view>
 				</view>
 			</view>
 		</view>
 		<view class="yoshop-notcont" v-if="changeIndex == 1">
 			<view class="none" v-if="calendar.length == 0">
 				<image src="../../static/none.png" mode=""></image>
 			</view>
 			<view class="cont" v-if="calendar.length == 0">暂无数据</view>
			<view class="contain">
				<view class="goods-list" v-for="(item,index) in calendar" :key="index">
					<view class="calendar-item">
						<view class="date">{{item[0].day}}</view>
						<view class="time">{{item[0].his}}</view>
						<view class="goods-item" v-for="(tem,idx) in item" :key="idx">
							<view class="goods-cover"><image :src="config.ImgUrl + tem.file_path" mode=""></image></view>
							<view class="goods-info">
								<view class="goods-title">{{tem.goods_name}}</view>
								<view class="global-limit-box">
									<view class="global-limit">全球限量</view>
									<view class="global-limit-count">{{tem.stock_total}}份</view>
								</view>
								<view class="goods-price">￥ {{tem.goods_price}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
 		</view>
 		<view class="container" v-if="changeIndex == 2">
 			<view class="goods-list" v-for="(item,index) in list" @click="detail(item.article_id)">
 				<view class="article-item">
 					<view class="article-cover">
 						<image :src="item.image_url" mode=""></image>
 					</view>
 					<view class="article-info">
 						<view class="article-title">{{item.title}}</view>
 					</view>
 				</view>
 			</view>
 		</view>
 	</view>
 </template>

 <script>
	 import config from '@/common/config.js'
 	export default {
 		data() {
 			return {
 				bannerImg: [],
 				scrollNum: 1,
 				loginType: false,
 				picList: [],
 				arr: [],
 				swiperCur: 0,
 				changeArr: [{
 					name: '数字藏品'
 				}, {
 					name: '发售日历'
 				}, {
 					name: '内容精选'
 				}],
 				changeIndex: 0,
				list:[],
				calendar:[],
				config: config
 			}
 		},
 		onLoad() {
 			if (uni.getStorageSync('token')) {
 				this.loginType = false
 			} else {
 				console.log('asd')
 				// uni.navigateTo({
 				// 	url: '/pages/login/index'
 				// })
 			}
 			this.getList()
 		},
 		onShow() {
 			if (uni.getStorageSync('login') == 1) {
 				this.loginType = false
 			} else {
 				this.loginType = true
 			}
 		},
 		methods: {
			linkText(text){
				uni.navigateTo({
					url:'./notice?text=' + text
				})
			},
			getInput(e) {
				if (e.detail.value.length >= 11) {
					this.subType = false
				} else {
					this.subType = true
				}
			},
 			getList() {
 				this.$request('get', 'page/detail').then(res => {
 					console.log('res-banner', res)
 					this.bannerImg = res.data.pageData.items[0].data
 					res.data.pageData.items.forEach((item) => {
 						if (item.type == 'notice') {
 							this.arr.push(item)
 						}
 					})
 				}).catch(err => {
 					console.log('err', err)
 				})
 				this.$request('get', 'Goods/lista').then(res => {
 					console.log('res', res)
 					res.data.headList.forEach(item => {
 						item.file_path = this.$config.ImgUrl + item.file_path
 					})
 					this.picList = res.data.headList
 				}).catch(err => {
 					console.log('err', err)
 				})
				this.$request('get', 'article/list').then(res => {
					console.log('rtt', res.data.list.data)
					this.list = res.data.list.data
				}).catch(err => {
					console.log('err', err)
				})
 			},
			linkTo(index) {
				console.log('asd', this.bannerImg[index].link)
				// uni.navigateTo({
				// 	url: '/pages/artice/index'
				// })
				// return
				if (this.bannerImg[index].link.title == '资讯详情页') {
					uni.navigateTo({
						url: '/pages/artice/index?id=' + this.bannerImg[index].link.param.query.articleId
					})
				} else if (this.bannerImg[index].link.title == '商品详情页') {
					uni.navigateTo({
						url: '/pages/index/detail?id=' + this.bannerImg[index].link.param.query.goodsId
					})
				}
			},
 			change(index) {
 				this.changeIndex = index
				if(index == 1){
					this.$request('get', 'Goods/notSale').then(res => {
						console.log('rtt', res.data)
						this.calendar = res.data
					}).catch(err => {
						console.log('err', err)
					})
				}
 			},
 			// swiper
 			swiperChange(e) {
 				// this.swiperCur = e.detail.current
 				let {
 					current,
 					source
 				} = e.detail;
 				if (source === 'autoplay' || source === 'touch') {
 					//根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
 					this.swiperCur = e.detail.current;
 				}
 			},
 			link(id) {
 				uni.navigateTo({
 					url: './detail?id=' + id
 				})
 			},
			detail(id){
				uni.navigateTo({
					url:'/pages/artice/index?id=' + id
				})
			},
 			loginClose() {
 				uni.setStorageSync('login', 1)
 				this.loginType = false
 			},
 			loginBtn() {
 				uni.navigateTo({
 					url: '../login/index'
 				})
 			}
 		}
 	}
 </script>

 <style lang="scss">
 	// page {
 	// 	background: #FFF !important;
		
		.nav_title{
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding-bottom: 30rpx;
			.nav_name{
				font-size: 40rpx;
				background-image: linear-gradient(#81FBB8, #28C76F);
				 color: transparent;
				 -webkit-background-clip: text;

			}
		}

 	.dots_box {
 		display: flex;
 		justify-content: center;
 		margin-top: 20rpx;

 		.item {
 			width: 15rpx;
 			border-radius: 50%;
 			height: 15rpx;
 			margin-right: 11rpx;
 		}

 		.active {
 			background-color: #fff;
 		}

 		.nochange {
 			// border: 2rpx solid #848484;
 			background-color: #A2A2A2;
 		}
 	}

 	.content {
 		width: 100%;
 		display: flex;
 		flex-direction: column;
 		align-items: center;
 		justify-content: center;
 		padding: 50rpx 30rpx 0;
 		-webkit-box-sizing: border-box;
 		-moz-box-sizing: border-box;
 		box-sizing: border-box;

 		.index_login {
 			width: 85%;
 			z-index: 9;
 			position: fixed;
 			bottom: 110rpx;
 			left: 50%;
 			transform: translateX(-50%);
 			background: #191919;
 			border-radius: 20rpx;
 			padding: 20rpx 30rpx;
 			display: flex;
 			justify-content: space-between;
 			align-items: center;
 			color: #fff;
 			font-size: 28rpx;

 			.index-right {
 				display: flex;
 				align-items: center;

 				.index-btn {
 					background: #F3E0BC;
 					border-radius: 25rpx;
 					padding: 10rpx 25rpx;
 					text-align: center;
 					color: #000;
 					margin-right: 15rpx;
 				}

 				.index-close {
 					width: 30rpx;
 				}
 			}
 		}

 		.banner {
 			width: 100%;
 			min-height: 290rpx;

 			uni-swiper {
 				width: 100%;
 				height: 350rpx;
 			}

 			.swiper-item {
				width: 100%;
				height: 100%;
 				border-radius: 40rpx;
 				overflow: hidden;
 			}

 			.banner-image {
 				width: 100%;
 				height: 100%;
				// object-fit: cover;
				// background-size:100%;
				// background-size: contain;
 			}
 		}
		.notice_box{
			padding: 20rpx;
			background-color: #F6F9FF;
			width: 100%;
			border-radius: 12rpx;
			margin-top: 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.notice_img{
				width: 220rpx;
				height: 220rpx;
			}
			.notice_txt{
				width: 70%;
				view:nth-child(1){
					color: #6187F3;
					font-weight: 700;
					font-size: 15px;
				}
				view:nth-child(2){
					color: #B2B2B2;
					font-size: 13px;
				}
				.tip{
					display: flex;
					align-items: center;
					color: #6D6D6D;
					margin-top: 10rpx;
					.right{
						width: 28rpx;
						height: 28rpx;
						margin-right: 6rpx;
					}
				}
				.Notice{
					width: 100%;
					border-radius: 14rpx;
					overflow: hidden;
					margin-top: 10rpx;
					uni-swiper{
						width: 100%;
						height: 70rpx;
						
					}
				}
			}
		}
 		.tab-list {
 			box-sizing: border-box;
 			display: flex;
 			width: 100%;
 			align-items: center;
 			// padding: 20px;
			padding: 30rpx 30rpx 30rpx 0rpx;
 			.tab-item {
				padding-left: 30rpx;
 				font-size: 15px;
 				color: #999;
 			}

 			.active {
				font-size: 40rpx;
				background-image: linear-gradient(#81FBB8, #28C76F);
				 color: transparent;
				 -webkit-background-clip: text;
 			}

 			// .active:after {
 			// 	content: '';
 			// 	position: absolute;
 			// 	bottom: 14rpx;
 			// 	width: 40rpx;
 			// 	height: 6rpx;
 			// 	border-radius: 10rpx;
 			// 	background-color: #557BF8;
 			// 	left: 40%;
 			// }
 		}

 		.picture {
 			width: 100%;
 			// margin-top: 38rpx;

 			.pic-item {
 				margin-bottom: 30rpx;
				border: 2rpx solid #D0D0D0;
				border-radius: 30rpx;

 				.start {
 					text-align: right;
 					color: #F3E0BC;
 					margin-bottom: 10rpx;
 				}

 				.pic-img {
 					position: relative;
 					width: 100%;
 					border-radius: 30rpx 30rpx 0 0;
 					z-index: 5;
 				}

 				.pic-text {
 					position: relative;
 					box-sizing: border-box;
 					width: 100%;
 					margin-top: -60rpx;
 					font-size: 45rpx;
 					color: #101010 !important;
 					padding: 80rpx 35rpx 45rpx;
 					background-color: #FFF;
 					border-radius: 34rpx;

 					.titleTop {
 						font-weight: 700;
 						font-size: 18px;
 					}

 					.number {
 						display: flex;
 						align-items: center;
 						font-size: 22rpx;
 						margin: 20rpx 0;

 						.numText {
 							display: flex;
 							align-items: center;
 							border-radius: 5rpx;
 							background: #F6F9FF;
 							color: #000;
 							padding-right: 20rpx;
 							margin-right: 15rpx;

 							.title {
 								background: #557BF8;
 								padding: 5rpx 10rpx;
 								color: #fff;
 								border-radius: 5rpx;
 								margin-right: 20rpx;
 							}
 						}
 					}

 					.toast {
 						font-size: 24rpx;
 						color: #D8BE9A;
 					}

 					.detail {
 						// width: 107px;
 						// height: 36px;
 						// background-color: #fff;
 						// box-sizing: border-box;
 						// border: 1px solid #EE002E;
 						// border-radius: 18px;
 						// text-align: center;
 						font-size: 16px;
						font-weight: 700;
 						color: #000;
 						// line-height: calc(36px - 2px);
 						position: absolute;
 						right: 15px;
 						bottom: 25px;
 					}

 					.price {
 						position: absolute;
 						bottom: 30rpx;
 						right: 30rpx;
 						font-weight: 700;
 						letter-spacing: 5rpx;
 					}
 				}
 			}
 		}

 		.yoshop-notcont {
 			// padding: 71px 55px;
 			box-sizing: border-box;
			width: 100%;
			margin-top: 38rpx;

 			.none {
 				width: 246rpx;
 				height: 150rpx;
				margin: 0 auto;

 				image {
 					width: 100%;
 					height: 100%;
 				}
 			}
            .contain{
				padding: 0 20rpx 0 20rpx;
				.goods-list{
					margin-top: 40rpx;
					.calendar-item{
						margin-bottom: 30rpx;
						    padding-top: 40rpx;
						    background: #2b2c2e;
						    border-radius: 36rpx;
							color: #333;
							.date{
								margin-left: 24rpx;
								    font-size: 40rpx;
								    font-weight: 700;
								    color: #fff;
							}
							.time{
								margin: 26rpx 0 26rpx 24rpx;
								    font-size: 16px;
								    font-weight: 700;
								    color: #fff;
							}
							.goods-item{
								    box-sizing: border-box;
								    display: flex;
								    align-items: center;
								    padding-right: 40rpx;
								    width: 100%;
								    height: 256rpx;
								    background: #434443;
								    border-radius: 40rpx;
								    overflow: hidden;
									margin-bottom: 30rpx;
									.goods-cover{
										width: 256rpx;
										height: 256rpx;
										margin-right: 32rpx;
										border-radius: 40rpx;
										overflow: hidden;
										image{
											width: 100%;
											height: 100%;
										}
									}
									.goods-info{
										.goods-title{
											margin-bottom: 30rpx;
											    font-size: 15px;
											    font-weight: 700;
											    color: #fff;
											    overflow: hidden;
											    white-space: nowrap;
											    text-overflow: ellipsis;
										}
										.global-limit-box{
											display: flex;
											    align-items: center;
											    margin-bottom: 40rpx;
											    height: 32rpx;
											    width: 210rpx;
											    background: rgba(225,222,222,.2);
											    border-radius: 2rpx;
											    overflow: hidden;
											    text-align: center;
											    font-size: 10px;
											    line-height: 36rpx;
												.global-limit{
													display: inline-block;
													    width: 112rpx;
													    height: 32rpx;
													    background: #d7b059;
													    border-radius: 2rpx;
													    color: #000;
												}
												.global-limit-count{
													    display: inline-block;
													    width: 112rpx;
													    height: 32rpx;
													    color: #d7b059;
												}
										}
										.goods-price{
											font-size: 19px;
											    font-weight: 700;
											    color: #fff;
										}
									}
							}
					}
				}
			}
 			.cont {
 				display: block;
 				text-align: center;
 				font-size: 16px;
 				color: #999;
 				margin-top: 5px;
 			}
 		}

 		.container {
 			padding: 0 10rpx 40rpx;
 			width: 100%;

 			.goods-list {
 				margin-top: 40rpx;

 				.article-item {
 					margin-bottom: 16px;
 					background: #f2f2f2;
 					border-radius: 19px;
 					color: #333;

 					.article-cover {
 						height: 171px;
 						border-radius: 19px;
 						overflow: hidden;
 						z-index: 1;

 						image {
 							width: 100%;
 							height: 100%;
 							;
 						}
 					}

 					.article-info {
 						padding: 32rpx 22rpx;

 						.article-title {
 							margin-bottom: 8rpx;
 							font-size: 16px;
 							font-weight: 700;
 							color: #000;
 							// overflow: hidden;
 							// text-overflow: ellipsis;
 							// white-space: nowrap;
 							// line-height: 1.5;
 						}

 						.article-desc {
 							font-size: 12px;
 							font-weight: 400;
 							line-height: 1.6;
 							color: #999;
 							display: -webkit-box;
 							word-break: break-all;
 							text-overflow: ellipsis;
 							overflow: hidden;
 							-webkit-box-orient: vertical;
 							-webkit-line-clamp: 2;
 						}
 					}
 				}
 			}
 		}
 	}
 </style>
