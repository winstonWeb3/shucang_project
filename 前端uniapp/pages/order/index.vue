<template>
	<view>
		<view class="fix_title">
			<view :class="[changeIndex == index? 'fix_item' :'no_change']" v-for="(item,index) in arr" :key="index"
				@click="change(index)">
				<view class="">{{item.name}}</view>
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="shop">
					<view class="shop_img"><image :src="configs + item.file_path" mode=""></image></view>
						<view style="margin-left: -50rpx;">
							<view style="margin-bottom: 10rpx;color: #000;font-size: 17px;font-weight: 700;">{{item.goods_name}}</view>
							<view>{{utilTime(item.create_time)}}</view>
							<view style="color: #000;margin-top: 20rpx;">{{item.total_price}}元</view>
						</view>
						<view class="success" v-if="item.order_status == 30">交易成功</view>
						<view class="success" v-if="item.order_status == 20">交易取消</view>
				</view>
				<!-- <view class="items">
					<view>
						<view class="name">订单号:{{item.order_no}}</view>
						<view>{{utilTime(item.create_time)}}</view>
					</view>
					<view class="name">￥{{item.total_price}}</view>
				</view> -->
				<view class="items" v-if="item.orderType == 10">
					<view> </view>
					<view class="pay" @click="openPay(item)">付款</view>
				</view>
			</view>
		</view>
		<view class="back" @click="payType = false" v-if="payType">
			<view class="change" @click.stop>
				<view class="title">选择支付方式</view>
				<view class="item" :class="index == payIndex?'active':''" v-for="(item,index) in payArr" @click="changeType(index)" :key="index">
					<view class="img">
						<image :src="item.image" mode=""></image>
					</view>
					<view>{{item.name}}</view>
				</view>
				<view class="yes" @click="submit">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				changeIndex: 0,
				payArr:[
					{name:"微信",image:'/static/wechat.png'},
					{name:"支付宝",image:'/static/zfb.png'}
				],
				arr: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '已付款'
				}, {
					name: '已取消'
				}],
				list: [],
				payIndex:0,
				payType:false,
				detailList:'',
				configs:''
			}
		},
		onLoad(options){
			if(options.index){
				if(options.index == 0){
					this.changeIndex = 1
				}else if(options.index == 1){
					this.changeIndex = 2
				}
				else if(options.index == 2){
					this.changeIndex = 3
				}else{
					this.changeIndex = 0
				}
				this.getList()
			}
		},
		onShow() {
			this.getList()
			this.configs = this.$config.ImgUrl
		},
		methods: {
			change(index) {
				this.changeIndex = index
				this.getList()
			},
			changeType(index){
				this.payIndex = index
			},
			openPay(item){
				this.payType = true
				this.detailList = item
				
			},
			submit(){
				this.payType = false
				console.log(this.detailList)
				if(this.detailList.type == 1) {
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
							orderId: this.detailList.order_id
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
								// location.href = newUrl
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
					if(this.payIndex == 0){
							
						uni.request({
							url: `${this.$config.URL}Checkout/pay`,
							header: {
								'Access-Token': uni.getStorageSync('userinfo').token || '',
								// 'storeId':uni.getStorageSync('userinfo').userId || '',
								'platform': 'H5'
							},
							method: 'POST',
							data: {
								order_no:this.detailList.order_no,
								userid: uni.getStorageSync('userinfo').userId,
								// goodsid: this.detailList.goods_id,
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
								
								
								// location.href = res.data.url
								// // 将接口返回的form表单显示到页面
								// document.querySelector('body').innerHTML = res.data;
								// // 调用submit方法
								// document.forms[0].submit()
							}
						});
						
						// uni.request({
						//     url: `${this.$config.URL}Checkout/ordersWe`,
						// 	header:{
						// 		'Access-Token': uni.getStorageSync('userinfo').token || '',
						// 		// 'storeId':uni.getStorageSync('userinfo').userId || '',
						// 		'platform':'H5'
						// 	},
						// 	method: 'POST',
						// 	data:{
						// 		order_no:this.detailList.order_no,
						// 		userid : uni.getStorageSync('userinfo').userId,
						// 		isBox:this.detailList.is_box,
						// 		pay_type:20
						// 	},
						//     success: (res)=>{
						// 		if(res.data.status == 500){
						// 			return this.$showToast(res.data.message)
						// 		}
						//        console.log('dd',res)
						// 	   const newUrl = res.data+'&redirect_url=' + encodeURIComponent(`${this.$config.yu}#/pages/order/index`)
						// 	   console.log('asd',newUrl)
						// 	   location.href = newUrl
						//     },
							
						// });
					}else if(this.payIndex == 1){
						//#ifdef H5
						uni.request({
							url: `${this.$config.URL}Checkout/orders`,
							header:{
								'Access-Token': uni.getStorageSync('userinfo').token || '',
								// 'storeId':uni.getStorageSync('userinfo').userId || '',
								'platform':'H5'
							},
							method: 'POST',
							data:{
								order_no:this.detailList.order_no,
								userid : uni.getStorageSync('userinfo').userId,
								isBox:this.detailList.is_box,
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
					}
					
				}
			},
			utilTime(num) {
				// 时间戳转换成 “yyyy-MM-dd hh:mm:ss”格式
				let date = new Date(num * 1000);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				//年
				let year = date.getFullYear();
				// 月
				let month = date.getMonth() + 1;
				month = month < 10 ? ('0' + month) : month; //月补0
				//日
				let day = date.getDate();
				day = day < 10 ? ('0' + day) : day; //天补0
				//时
				let hours = date.getHours();
				hours = hours < 10 ? ('0' + hours) : hours; //小时补0
				// 分
				let minutes = date.getMinutes();
				minutes = minutes < 10 ? ('0' + minutes) : minutes; //分钟补0
				// 秒
				let seconds = date.getSeconds();
				seconds = seconds < 10 ? ('0' + seconds) : seconds; //秒补0
				// 星期
				const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
				let weekDay = weekArr[date.getDay()];
				let weekNum = date.getDay();
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${weekDay}`
			},
			getList() {
				this.$request('post', 'Checkout/myOrderList', {
					orderType: this.changeIndex == 0 ? '' : this.changeIndex == 1 ? 10 : this.changeIndex == 2 ?
						20 : 30,
					userid: uni.getStorageSync('userinfo').userId,
				}).then(res => {
					console.log('res', res)
					if (res.data != '') {
						this.list = res.data
					} else {
						this.list = []
						this.$showToast('暂无数据')
					}
				}).catch(err => {
					console.log('err', err)
					this.list = []
					this.$showToast(err.message)
				})
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
		padding: 20rpx 30rpx;

		.no_change {
			color: #000;
		}

		.fix_item {
			color: #000;
			border-bottom: 4rpx solid #007aff;
			padding-bottom: 8rpx;
		}
	}

	.list {
		padding: 30rpx 20rpx;
	}

	.item {
		font-size: 24rpx;
		color: #000;
		background-color: #F2F2F2;
		padding: 25rpx 29rpx;
		border-radius: 15rpx;
		margin-bottom: 22rpx;
		.items{
			display: flex;
			// align-items: center;
			justify-content: space-between;
		}
		.shop{
			display: flex;
			justify-content: space-between;
			// align-items: center;
			.shop_img{
				width: 140rpx;
				height: 140rpx;
				margin-bottom: 20rpx;
				margin-right: 10rpx;
				border-radius: 20rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.success{
				color: #000;
			}
		}
		.pay{
			padding: 6rpx 18rpx;
			border-radius: 10rpx;
			background-color: #F3E0BC;
			letter-spacing: 4rpx;
			color: #000;
		}
	}

	.name {
		margin-bottom: 10rpx;
		color: #000;
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
