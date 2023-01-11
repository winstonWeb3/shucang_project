<template>
	<view class="detail">
		<view class="header">
			<view class="media">
				<view class="media-img-wrapper">
					<img class="auto-img" :src="detailList.file_path" mode="widthFix" />
				</view>
			</view>
			<!-- <view class="last">
				<view class="last-img">
					<view class="share">
						<image src="../../static/share.png" mode=""></image>
					</view>
					
				</view>
			</view> -->
			<!-- <view class="newTxt">
				<view v-if="detailType">
					<view class="txt">{{detailList.goods_name}}</view>
					<view class="center">
						<view class="xianliang">限量{{detailList.stock_total}}份</view>
					</view>
					<view class="last_title">温馨提示: 购买即可体验内容</view>
				</view>
				<view v-else class="MyId">{{collId}}</view>
			</view> -->
			<!-- <view class="flex">
				<view class="img"><image src="../../static/leftpo.png" class="auto-img" mode=""></image></view>
				<view>购买即可体验体验内容</view>
				<view class="img"><image src="../../static/rightpo.png" class="auto-img" mode=""></image></view>
			</view> -->
			<view class="goods_name">{{detailList.goods_name}}</view>
			<view class="flexs">
				<view class="num">
					<view class="po">编号</view>
					{{score}}
				</view>
			</view>
		</view>
		<!-- <view class="detail-image">
			<image class="detail-img" :src="'https://sc.zhongyuansc.net/uploads/' + detailList.file_path"
				mode="widthFix"></image>
		</view> -->
		<view style="padding: 0 20rpx;box-sizing: border-box;">
			<!-- <view class="exhibition">
				<view class="titleTop">{{detailList.goods_name}}</view>
				<view class="number" v-if="detailType">
					<view class="numText">
						<view class="title">限量</view>{{detailList.stock_total}}份
					</view>
					<view class="numText">
						<view class="title">剩余</view>{{detailList.stock_num}}份
					</view>
				</view>
			</view> -->
			
			
			<view class="author">
				<view class="title">藏品信息</view>
				<view class="nex">
					<view style="color: #333;">创造者: </view>
					<view style="color: #9B9B9B;text-align: right;">{{detailList.author}}</view>
				</view>
				<view class="nex">
					<view style="color: #333;">合约地址: </view>
					<view class="nex-address" style="color: #9B9B9B;">{{detailList.goods_address}}</view>
				</view>
				<view class="nex">
					<view style="color: #333;">链上标识: </view>
					<view class="nex-address" style="color: #9B9B9B;">{{detailList.logo}}</view>
				</view>
				<view class="nex">
					<view style="color: #333;">发行时间: </view>
					<view style="color: #9B9B9B;">{{detailList.startTime}}</view>
				</view>
			</view>
			
			<view class="story">
			<view class="title">藏品详情</view>
				<view class="story-content">
					<rich-text :nodes="detailList.content"></rich-text>
				</view>
			</view>
			<!-- <view class="last_title">购买须知</view> -->
			<view class="notice" v-if="detailType">
				<view class="notice-content">{{noticeText}}</view>
			</view>
		</view>
		<view class="submit" v-if="detailType">
			<view class="sub-price" v-if="type != 2">{{detailList.goods_price_min}}</view>
			<view class="sub-price" v-else>{{detailList.price}}</view>
			<template v-if="userinfo.userId">
				<view class="sub-btn" v-if="showIcon && detailList.stock_num > 0" @click="buy(detailList.goods_id)">立即购买
				</view>
				<view class="sub-btn" v-if="showIcon && detailList.stock_num == 0">已售罄</view>
				<view class="sub-btn timeIcon" v-if="!showIcon">
					<view class="icon">
						<image src="../../static/shijian.png" mode=""></image>
					</view>
					<view>{{startTime}}</view>
				</view>
			</template>
			<template v-else>
				<view class="sub-btn" @click="login">暂未登录</view>
			</template>
		</view>
		<view class="back" @click="payType = false" v-if="payType">
			<view class="change" @click.stop>
				<view class="title">选择支付方式</view>
				<view class="item" :class="index == payIndex?'active':''" v-for="(item,index) in payArr"
					@click="changeType(index)" :key="index">
					<view class="img">
						<image :src="item.image" mode=""></image>
					</view>
					<view>{{item.name}}</view>
				</view>
				<view class="yes" @click="submit">确定</view>
			</view>
		</view>
		<form id='alipaysubmit' name='alipaysubmit' action='支付宝地址' method='POST'></form>
		<view class="lasts">
			<view v-if="sale" class="submits" @click="sub">转售</view>
			<view v-else class="submits" @click="close">下架</view>
		</view>
	</view>
</template>

<script>
	import TronWeb from 'tronweb';
	const ethers = require('ethers')
	const AbiCoder = ethers.utils.AbiCoder;
	const ADDRESS_PREFIX_REGEX = /^(41)/;
	const ADDRESS_PREFIX = "41";
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				detailImg: require('../../static/story_03.png'),
				storyImg: require('../../static/story.png'),
				noticeText: '数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。',
				detailList: {},
				detailType: true,
				payType: false,
				score:'',
				payArr: [{
						name: "微信",
						image: '/static/wechat.png'
					},
					{
						name: "支付宝",
						image: '/static/zfb.png'
					}
					// ,
					// {
					// 	name: "测试支付",
					// 	image: '/static/icon_01.png'
					// }
				],
				payIndex: 0,
				showIcon: false,
				startTime: '',
				timer: null,
				userinfo: '',
				timeOut: '',
				code: '',
				collId: null,
				sale:true
			}
		},
		async onLoad(data) {
			console.log(data)
				await this.getDetailList(data.id)
					this.detailType = false
					this.score = data.score
					this.detailList.score = data.score
					if(data.status == 0){
						this.sale = true
					}else{
						this.sale = false
					}
			if(data.collId) {
				this.collId = data.collId
			}
			this.userinfo = uni.getStorageSync('userinfo')
			this.code = await this.enCode()
			console.log('as', this.code)
		},
		methods: {
			sub(){
				this.detailList.score = this.score
				this.detailList.coll_id = this.collId
				let str = this.detailList
				str.content = ''
				uni.navigateTo({
					url:"/pages/collection/sale?obj=" + encodeURIComponent(JSON.stringify(str))
				})
			},
			close(){
				let that = this
				uni.showModal({
								title: '提示',
								content: '是否确认下架',
								success: function(res) {
									if (res.confirm) {
										that.$request('get', 'order/unsale', {
											'collId': that.collId
										}).then(res => {
											that.$showToast(res.data.message)
											setTimeout(() => {
												// #ifdef H5
												const pages = getCurrentPages()
												if (pages.length > 1) {
												uni.navigateBack(1)
												return;
												}
												//使用vue-router返回上一级
												let a = that.$router.go(-1)
												if (a == undefined) {
												//重新定向跳转页面
												
												}
												return;
												// #endif
												uni.navigateBack(1)
											}, 600)
										}).catch(err => {
											console.log('err', err)
											that.$showToast(err.message)
										})
				
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
			},
			getDetailList(id) {
				this.$request('get', 'Goods/goodsDetails', {
					goodsid: id
				}).then(res => {
					console.log('res', res)
					res.data.goodsdetails.content = tool.formatRichText(res.data.goodsdetails.content)
					// res.data.goodsdetails.file_path = `${this.$config.ImgUrl}${res.data.goodsdetails.file_path}`
					this.detailList = res.data.goodsdetails
					let date = new Date(res.data.goodsdetails.startTime.replace(/-/g, '/')).getTime()
					let timestamp = new Date().getTime()
					if (timestamp > date) return this.showIcon = true
					console.log('ppp', date, (date - timestamp))
					this.timer = setInterval(() => {
						let timestamp = new Date().getTime()
						let countdown = date - timestamp
						this.showIcon = false
						if (countdown - 1 > 1) {
							countdown -= 1
							this.startTime = this.formateSeconds(countdown)
							// console.log('sad',this.startTime)
						} else {
							this.showIcon = true
							clearInterval(this.timer)
						}
					}, 1000)
				}).catch(err => {
					console.log('err', err)
				})
			},
			login() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			async enCode() {
				let timeOut = `${this.getRandomSixDigit()}${uni.getStorageSync('userinfo').userId}`
				this.timeOut = timeOut
				console.log('asd', timeOut);
				// let address = TronWeb.address.toHex(uni.getStorageSync('userinfo').address)
				let inputs = [{
						type: 'address',
						value: uni.getStorageSync('userinfo').address
						// value: address
					},
					{
						type: 'uint256',
						value: timeOut
					},
					{
						type: 'string',
						value: "'ipfs://QmWyB4dGanAS3ckMwF5GTJGUs9ipNUjRNaDSsavJ4BnEmE'"
					}
				]
				// let inputs = [
				//     {type: 'address', value: '4159ecb02f71a2e9244e86fceefc29667c512c7be0'},
				// 	{type: 'address', value: '417283cb8e690acf1b3b0f4f9d109999e1afa53c05'},
				//     {type: 'uint256', value: '1444441'},
				// ]
				console.log('inputs',inputs)
				let parameters = await this.encodeParams(inputs)
				console.log('parameters', parameters)
				return parameters
			},
			async encodeParams(inputs) {
				let typesValues = inputs
				let parameters = ''

				if (typesValues.length == 0)
					return parameters
				const abiCoder = new AbiCoder();
				let types = [];
				const values = [];

				for (let i = 0; i < typesValues.length; i++) {
					let {
						type,
						value
					} = typesValues[i];
					if (type == 'address')
						value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
					else if (type == 'address[]')
			 		value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
					types.push(type);
					values.push(value);
				}

				console.log(types, values)
				try {
					parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
				} catch (ex) {
					console.log('ex', ex);
				}
				return parameters

			},
			getRandomSixDigit() {
				let code = ''
				for (var i = 0; i < 5; i++) {
					code += parseInt(Math.random() * 10)
				}
				return code
			},
			submit() {
				this.payType = false
				if(this.type == 2){
					let payType = this.payIndex ? 20 : 10;
					uni.request({
						url: `${this.$config.URL}checkout/buy`,
						header:{
							'Access-Token': uni.getStorageSync('userinfo').token || '',
							'platform':'H5'
						},
						method: 'POST',
						data:{
							transactionId: this.detailList.transaction_id,
							payType: payType,
						},
						success: (res)=>{
							if (res.data.status == 500) {
								return this.$showToast(res.data.message)
							}
							console.log(res.data)
							// 将接口返回的form表单显示到页面
							if(payType == 10) {
								console.log(res)
								// const newUrl = res.data + '&redirect_url=' + encodeURIComponent(
								// 	`${config.yu}#/pages/order/index`)
								// console.log('asd', newUrl)
								// location.href = res.data.data.url
								// #ifdef H5
								  location.href = res.data.data.url
								  // #endif
								  // #ifdef APP-PLUS       
								  const platform = uni.getSystemInfoSync().platform
								  const webview = plus.webview.create(); // 创建一个webview
								  console.log('bbb', platform)
								  switch (platform) {
								   case 'android':
								    plus.webview.open(res.data.data.url);
								    break;
								   case 'ios':
								    plus.webview.open(res.data.data.url);
								    // webview.loadURL(newUrl,{'Referer':'https://www.web3metadao.cn/'});//解决ios支付完成后，打开safari浏览器的bug
								    break;
								   default:
								    plus.webview.open(res.data.data.url);
								    // webview.loadURL(newUrl,{'Referer':'https://www.web3metadao.cn/'});
								    break;
								  }
								  // #endif
							} else {
								// #ifdef H5
								document.querySelector('body').innerHTML = res.data;
								// 调用submit方法
								document.forms[0].submit()
								// #endif
								
							}
							
						}
					});
				} else {
					if (this.payIndex == 0) {
						uni.request({
							url: `${this.$config.URL}Checkout/pay`,
							header: {
								'Access-Token': uni.getStorageSync('userinfo').token || '',
								// 'storeId':uni.getStorageSync('userinfo').userId || '',
								'platform': 'H5'
							},
							method: 'POST',
							data: {
								userid: uni.getStorageSync('userinfo').userId,
								goodsid: this.detailList.goods_id,
								pay_type: 20,
								isBox: 0
							},
							success: (res) => {
								if (res.data.status == 500) {
									return this.$showToast(res.data.message)
								}
								console.log(res)
								// location.href = res.data.data.url
								// #ifdef H5
								  location.href = res.data.data.url
								  // #endif
								  // #ifdef APP-PLUS       
								  const platform = uni.getSystemInfoSync().platform
								  const webview = plus.webview.create(); // 创建一个webview
								  console.log('bbb', platform)
								  switch (platform) {
								   case 'android':
								    plus.webview.open(res.data.data.url);
								    break;
								   case 'ios':
								    plus.webview.open(res.data.data.url);
								    // webview.loadURL(newUrl,{'Referer':'https://www.web3metadao.cn/'});//解决ios支付完成后，打开safari浏览器的bug
								    break;
								   default:
								    plus.webview.open(res.data.data.url);
								    // webview.loadURL(newUrl,{'Referer':'https://www.web3metadao.cn/'});
								    break;
								  }
								  // #endif
								// // 将接口返回的form表单显示到页面
								// document.querySelector('body').innerHTML = res.data;
								// // 调用submit方法
								// document.forms[0].submit()
							}
						});
						
						
						// uni.request({
						// 	url: `${this.$config.URL}Checkout/ordersWe`,
						// 	header: {
						// 		'Access-Token': uni.getStorageSync('userinfo').token || '',
						// 		// 'storeId':uni.getStorageSync('userinfo').userId || '',
						// 		'platform': 'H5'
						// 	},
						// 	method: 'POST',
						// 	data: {
						// 		goodsid: this.detailList.goods_id,
						// 		userid: uni.getStorageSync('userinfo').userId,
						// 		isBox: 0,
						// 		pay_type: 20
						// 	},
						// 	success: (res) => {
						// 		if (res.data.status == 500) {
						// 			return this.$showToast(res.data.message)
						// 		}
						// 		console.log('dd', res)
						// 		const newUrl = res.data + '&redirect_url=' + encodeURIComponent(
						// 			`${this.$config.yu}#/pages/order/index`)
						// 		console.log('asd', newUrl)
						// 		location.href = newUrl
						// 	},
					
						// });
					} else if (this.payIndex == 1) {
						//#ifdef H5
						uni.request({
							url: `${this.$config.URL}Checkout/orders`,
							header: {
								'Access-Token': uni.getStorageSync('userinfo').token || '',
								// 'storeId':uni.getStorageSync('userinfo').userId || '',
								'platform': 'H5'
							},
							method: 'POST',
							data: {
								goodsid: this.detailList.goods_id,
								userid: uni.getStorageSync('userinfo').userId,
								isBox: 0,
								pay_type: 30
							},
							success: (res) => {
								if (res.data.status == 500) {
									return this.$showToast(res.data.message)
								}
								// 将接口返回的form表单显示到页面
								document.querySelector('body').innerHTML = res.data;
								// 调用submit方法
								document.forms[0].submit()
							}
						});
						//#endif
					}
				}
				//  else {
				// 	uni.request({
				// 		url: `${this.$config.URL}Checkout/pay`,
				// 		header: {
				// 			'Access-Token': uni.getStorageSync('userinfo').token || '',
				// 			// 'storeId':uni.getStorageSync('userinfo').userId || '',
				// 			'platform': 'H5'
				// 		},
				// 		method: 'POST',
				// 		data: {
				// 			userid: uni.getStorageSync('userinfo').userId,
				// 			goodsid: this.detailList.goods_id,
				// 			pay_type: 20,
				// 			isBox: 0
				// 		},
				// 		success: (res) => {
				// 			if (res.data.status == 500) {
				// 				return this.$showToast(res.data.message)
				// 			}
				// 			console.log(res.data.url)
				// 			location.href = res.data.url
				// 			// // 将接口返回的form表单显示到页面
				// 			// document.querySelector('body').innerHTML = res.data;
				// 			// // 调用submit方法
				// 			// document.forms[0].submit()
				// 		}
				// 	});

				// 	// this.$request('post', 'Checkout/pay', {
				// 	// 	goodsId: this.detailList.goods_id,
				// 	// 	goodsSkuId: this.detailList.id,
				// 	// 	goodsNum: 1,
				// 	// 	parameter: this.code,
				// 	// 	tokenId: this.timeOut,
				// 	// 	is_box: 0
				// 	// }).then(res => {
				// 	// 	console.log('res', res)
				// 	// 	this.payType = false
				// 	// }).catch(err => {
				// 	// 	console.log('err', err)
				// 	// })
				// }
			},
			changeType(index) {
				this.payIndex = index
			},
			buy(id) {
				if (!this.userinfo.idcar) {
					return this.$showToast('请完成实名认证')
				}
				this.payType = true
				// this.$request('post','Checkout/purchaseGoods',{
				// 	goodsid: id,
				// 	userid : uni.getStorageSync('userinfo').userId,
				// 	// token: uni.getStorageSync('userinfo').token
				// }).then(res => {
				// 	console.log('res',res)
				// }).catch(err => {
				// 	console.log('err',err)
				// })
			},
			formateSeconds(endTime) {
				let secondTime = parseInt(endTime / 1000) //将传入的秒的值转化为Number
				let min = 0 // 初始化分
				let h = 0 // 初始化小时
				let result = ''
				if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
					min = parseInt(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
					secondTime = parseInt(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
					if (min > 60) { //如果分钟大于60，将分钟转换成小时
						h = parseInt(min / 60) //获取小时，获取分钟除以60，得到整数小时
						min = parseInt(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
					}
				}
				result =
					`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
				return result
			}
		},
		onUnload() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #AAB2B7;
	}

	.detail {
		width: 100%;
		padding: 0 0 120rpx;
		box-sizing: border-box;

		.header {
			height: 490px;
			background-image: url('../../static/bg_new.png');
			background-size: 100% 100%;
			position: relative;
			background-color: #FFF;
           .flex{
			   display: flex;
			   align-items: center;
			   justify-content: space-between;
			   position: absolute;
			   width: 100%;
			   left: 0;
			   bottom: 110rpx;
			   .img{
				   width: 28%;
				   height: 30rpx;
			   }
			   font-size: 13px;
			   color: #FFF;
		   }
		   .goods_name{
			   position: absolute;
			   font-size: 16px;
			   font-weight: 600;
			   color: #000;
			   left: 20rpx;
			   bottom: 60rpx;
		   }
		   .flexs{
		   	display: flex;
			position: absolute;
			width: 100%;
			left: 20rpx;
			bottom: 0;
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

					.share {
						position: absolute;
						left: calc(50% - 30rpx);
						top: -8%;
						bottom: 368rpx;
						width: 60rpx;
						height: 60rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

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

			.newTxt {
				width: 90%;
				position: absolute;
				bottom: 60rpx;
				background-color: #1B1714;
				border: 4rpx solid #BE9D8A;
				left: calc(5% - 8rpx);
				border-radius: 12rpx;
				padding: 10rpx;
				.MyId{
					color: #fff;
					text-align: center;
					font-weight: 700;
					padding: 20rpx 0;
					letter-spacing: 2px;
				}
				.txt {
					color: #FFF;
					text-align: center;
					font-size: 20px;
					margin-top: 10rpx;
				}

				.center {
					display: flex;
					justify-content: center;
					margin-bottom: 20rpx;

					.xianliang {
						background-color: #FACEB6;
						color: #000;
						border-radius: 30rpx;
						padding: 4rpx 14rpx;
						margin: 0 auto;
						display: inline-block;
						font-size: 15px;
						margin-top: 20rpx;
					}
				}

				.last_title {
					position: relative;
					color: #615752;
					text-align: center;
					font-size: 13px;
				}

				.last_title:before {
					left: 44px;
					content: "";
					width: 55px;
					height: 2rpx;
					background-color: #615752;
					position: absolute;
					top: 50%;
					-webkit-transform: translateY(-50%);
					transform: translateY(-50%);
				}

				.last_title:after {
					right: 44px;
					content: "";
					width: 55px;
					height: 2rpx;
					background-color: #615752;
					position: absolute;
					top: 50%;
					-webkit-transform: translateY(-50%);
					transform: translateY(-50%);
				}
			}

			.media {
				position: absolute;
				top: 36%;
				left: 50%;
				transform: translate(-50%, -50%) !important;
				z-index: 2;

				.media-img-wrapper {
					// width: 360rpx; 
					// height: 360rpx;
					border-radius: 30rpx;
					overflow: hidden;
					image{
						width: 100%;
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

		.story-title {
			font-size: 17px;
			font-weight: 700;
			margin-top: 20rpx;
		}

		.story {
			width: 100%;
			background: #FFF;
			border-radius: 30rpx;
			margin-top: 20rpx;
			color: #333;
			padding: 40rpx 30rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;

             .title{
				 color: #777777;
				 margin-bottom: 20rpx;
			 }
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

		.author {
			width: 100%;
			background: #f9f9f9;
			margin-top: 20rpx;
			border-radius: 30rpx;
			color: #333;
			padding: 40rpx 30rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
            .title{
				color: #777777;
				margin-bottom: 20rpx;
			}
			.nex {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.nex-address{
					width: 70%;
					white-space:normal;
					word-break:break-all;
					word-wrap:break-word;
				}
			}

			view {
				margin-bottom: 10rpx;
			}
		}

		.last_title {
			position: relative;
			color: #101010;
			text-align: center;
		}

		.last_title:before {
			left: 44px;
			content: "";
			width: 55px;
			height: 0.5px;
			background-color: #e5e5e5;
			position: absolute;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}

		.last_title:after {
			right: 44px;
			content: "";
			width: 55px;
			height: 0.5px;
			background-color: #e5e5e5;
			position: absolute;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}

		.notice {
			width: 100%;
			background: #fff;
			border-radius: 30rpx;
			color: #333;
			padding: 40rpx 30rpx;
			margin-bottom: 30rpx;
			box-sizing: border-box;
			margin-top: 20rpx;

			.notice-title {
				font-size: 50rpx;
				font-weight: 700;
				margin-bottom: 20rpx;
			}

			.notice-content {
				color: #9B9B9B;
				letter-spacing: 3.5rpx;
			}
		}

		.submit {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			background: #fff;
			color: #fff;
			font-size: 50rpx;
			font-weight: 700;
			box-sizing: border-box;
            border-top: 2rpx solid #F2F2F2;

			.sub-price {
				letter-spacing: 5rpx;
				color: #007aff;
				margin-left: 50rpx;
			}

			.sub-btn {
				font-size: 30rpx;
				background: #007aff;
				color: #FFFFFF;
				border-radius: 50rpx;
				padding: 20rpx 60rpx;
				text-align: center;
			}

			.timeIcon {
				display: flex;
				align-items: center;

				.icon {
					width: 36rpx;
					height: 36rpx;
					margin-right: 6rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	@keyframes detail {
		0% {
			transform: rotateY(0);
		}

		50% {
			transform: rotateY(360deg);
		}

		100% {
			transform: rotateY(0);
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

			.item {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				padding: 10rpx;

				.img {
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.active {
				border: 4rpx dashed #F3E0BC;
				box-sizing: border-box;
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
	.lasts{
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #FFF;
		.submits{
			padding: 16rpx 30rpx;
			font-size: 15px;
			background-color: #EFCA3E;
			color: #000;
			border-radius: 30rpx;
		}
	}
</style>
