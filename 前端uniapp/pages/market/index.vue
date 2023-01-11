<template>
	<view class="detail">
		<view class="detail-image">
			<image class="detail-img" :src="detailImg" ></image>
		</view>
		<view class="exhibition">
			<view class="titleTop">
			<view @click="open">开盲盒</view>
			</view>
		</view>
		<view class="back" @click="payType = false" v-if="payType">
			<view class="change" @click.stop>
				<view class="title">选择支付方式</view>
				<view class="item" :class="index == payIndex?'active':''" v-for="(item,index) in payArr" @click="changeType(index)" :key="index">
					<view style="display: flex;align-items: center;">
						<view class="img">
							<image :src="item.image" mode=""></image>
						</view>
						<view>{{item.name}}</view>
					</view>
					<view v-if="payIndex == index && payIndex != 2">￥{{money}}</view>
					<view v-if="payIndex == index && payIndex == 2">-{{intergral}}</view>
				</view>
				<view class="now">当前可用积分:{{integralAll}}</view>
				<view class="yes" @click="submit">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				detailImg: require('../../static/23.png'),
				payType:false,
				payIndex:0,
				payArr:[
					{name:"微信",image:'/static/wechat.png'},
					{name:"支付宝",image:'/static/zfb.png'},
					{name:"积分",image:'/static/mh.png'}
				],
				money:'',
				intergral:'',
				integralAll:'',
				goodsImg:''
			}
		},
		onLoad(){
			this.$request('get', 'user/boxBg', {
			}).then(res => {
				console.log('res', res)
				this.detailImg = res.data.values.file_path
			}).catch(err => {
				console.log('err', err)
			})
			this.$request('post', 'order/seleIntegrals', {
				// userid: uni.getStorageSync('userinfo').userId,
			}).then(res => {
				console.log('res', res)
				this.money = res.data.price
				this.intergral = res.data.integrals
			}).catch(err => {
				console.log('err', err)
			})
		},
		methods:{
			open(){
				console.log(1111)
				let userinfo = uni.getStorageSync('userinfo')
				if(!userinfo || !userinfo.userId){
					return this.$showToast('请先完成登录')
				}
				if(!userinfo.idcar) return this.$showToast('请完成实名认证')
				this.payType = true
				this.getIntergral()
			},
			changeType(index){
				this.payIndex = index
			},
			getIntergral(){
				this.$request('post', 'Checkout/myIntegral', {
					userid: uni.getStorageSync('userinfo').userId,
				}).then(res => {
					this.integralAll = res.data.integralAll
				}).catch(err => {})
			},
			submit(){
				this.payType = false
				//微信
				if(this.payIndex == 0){
					uni.request({
						url: `${this.$config.URL}Checkout/payTwo`,
						header: {
							'Access-Token': uni.getStorageSync('userinfo').token || '',
							// 'storeId':uni.getStorageSync('userinfo').userId || '',
							'platform': 'H5'
						},
						method: 'POST',
						data: {
							userid: uni.getStorageSync('userinfo').userId,
							goodsid: 0,
							pay_type: 20,
							isBox: 1
						},
						success: (res) => {
							if (res.data.status == 500) {
								return this.$showToast(res.data.message)
							}
							console.log(res.data.url)
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
					//     url: `${config.URL}Checkout/ordersWe`,
					// 	header:{
					// 		'Access-Token': uni.getStorageSync('userinfo').token || '',
					// 		// 'storeId':uni.getStorageSync('userinfo').userId || '',
					// 		'platform':'H5'
					// 	},
					// 	method: 'POST',
					// 	data:{
					// 		goodsid: 0,
					// 		userid : uni.getStorageSync('userinfo').userId,
					// 		isBox:1,
					// 		pay_type:20
					// 	},
					//     success: (res)=>{
					//     	if(res.data.status == 500){
					//     		return this.$showToast(res.data.message)
					//     	}
					//        console.log('dd',res)
					//        const newUrl = res.data+'&redirect_url=' + encodeURIComponent(`${config.yu}#/pages/order/index`)
					//        console.log('asd',newUrl)
					//        location.href = newUrl
					//     },
					// });
					//支付宝
				}else if(this.payIndex == 1){
					//#ifdef H5
					uni.request({
					    url: `${config.URL}Checkout/orders`,
						header:{
							'Access-Token': uni.getStorageSync('userinfo').token || '',
							// 'storeId':uni.getStorageSync('userinfo').userId || '',
							'platform':'H5'
						},
						method: 'POST',
						data:{
							goodsid: 0,
							userid : uni.getStorageSync('userinfo').userId,
							isBox:1,
							pay_type:30
						},
					    success: (res)=>{
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
				}else{
					//积分
					//#ifdef H5
					this.$request('post','order/drawbox',{
						userid : uni.getStorageSync('userinfo').userId,
						pay_type:10
						// token: uni.getStorageSync('userinfo').token
					}).then(res => {
						console.log('res',res)
						this.payType = false
						this.$showToast(res.message)
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/collection/index'
							})
						},1000)
					}).catch(err => {
						console.log('err',err)
						this.payType = false
						this.$showToast(err.message)
					})
					// uni.request({
					//     url: 'https://sc.zhongyuansc.net/index.php?s=/api/Checkout/orders',
					// 	header:{
					// 		'Access-Token': uni.getStorageSync('userinfo').token || '',
					// 		// 'storeId':uni.getStorageSync('userinfo').userId || '',
					// 		'platform':'H5'
					// 	},
					// 	method: 'POST',
					// 	data:{
					// 		goodsid: this.detailList.goods_id,
					// 		userid : uni.getStorageSync('userinfo').userId,
					// 	},
					//     success: (res)=>{
					//         // 将接口返回的form表单显示到页面
					//         document.querySelector('body').innerHTML = res.data;
					//         // 调用submit方法
					//         document.forms[0].submit()
					//     }
					// });
					//#endif
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff !important;
	}
	.detail{
		width: 100%;
		
		box-sizing: border-box;
		.detail-image{
			width: 100%;
			text-align: center;
			transform: translate3d(0, 0, 0);
			.detail-img{
				width: 70%;
				margin-top: 28vh;
				animation: detail 20s infinite;
				box-shadow: 0px 0px 9px #FFFFFF;
				transform: translate3d(0, 0, 2rpx);
			}
		}
		.exhibition{
			width: 100%;
			padding: 100rpx 0 100rpx;
			background: url(../../static/story_02.png) no-repeat;
			background-size: 100% 100%;
			font-size: 45rpx;
			color: #fff;
			text-align: center;
			.titleTop{
				margin-top: 90rpx;
				font-weight: 700;
				display: inline-block;
				// padding: 8rpx 14rpx;
				// box-shadow: 0px 0px 9px #FFFFFF;
				
			}
		}
	}
	@keyframes detail {
		0% { transform: rotateY(0);}
		50% { transform: rotateY(360deg);}
		100% { transform: rotateY(0);}
	}
	@keyframes opacityChange {
	    50% {
	        opacity:.5;
	    }
	    100% {
	        opacity: 1;
	    }
	}
	@keyframes rotate {
		100% {
			transform: rotate(1turn);
		}
	}
	.titleTop {
	    // background-color: #000;
	    padding: 20px;
	    view{ 
	        --borderWidth: 12px;
	        --bRadius: 10px;
	        width: 60%;
	        height: 60%;
	        position: relative;
	        z-index: 0;
	        overflow: hidden;
	        padding: 2rem;
	        z-index: 0;
	        border-radius: --bRadius;
	        &::after, &::before {
	            box-sizing: border-box;
	        }
	        &::before {
	            content: '';
	            position: absolute;
	            z-index: -2;
	            left: -50%;
	            top: -50%;
	            width: 200%;
	            height: 200%;
	            background-color: #1a232a;
	            background-repeat: no-repeat;
	            background-position: 0 0;
	            background-image: conic-gradient(transparent, #cfd8da, transparent 40%);
	            animation: rotate 3s linear infinite;
	        }
		
	        &::after {
	            content: '';
	            position: absolute;
	            z-index: -1;
	            left: calc(var(--borderWidth) / 2);
	            top: calc(var(--borderWidth) / 2);
	            width: calc(100% - var(--borderWidth));
	            height: calc(100% - var(--borderWidth));
	            background: #1B1B1B;
	            border-radius: 5px;
	            /* 这句效果打开有助于理解动画 */
	            /*animation: opacityChange 5s infinite linear;*/
	        }
	        
	    }
	}
	
	.titleTop:nth-child(9) div::after {
	    animation: opacityChange 3s infinite linear;
	}
	.back{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		.change{
			width: 86%;
			padding: 30rpx;
			background-color: #FFF;
			border-radius: 30rpx;
			box-sizing: border-box;
			.title{
				text-align: center;
			}
			.item{
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				padding: 10rpx;
				justify-content: space-between;
				.img{
					width: 64rpx;
					height: 64rpx;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.now{
				color: #64625b;
				font-size: 15px;
				margin-top: 10rpx;
			}
			.active{
				border:4rpx dashed #F3E0BC;
				box-sizing: border-box;
			}
		}
		.yes{
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
