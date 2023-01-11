<template>
	<view class="user">
		<view class="box">
			<view class="avatar" @click="linkTo('./userinfo')"><image :src="userinfo.file_path" mode=""></image></view>
			<view class="name" @click="login">{{userinfo.nick_name}}</view>
			<view class="phone">{{userinfo.phone}}</view>
			<!-- <view class="jifen" @click="linkTo('../fraction/index')">
				<view class="icon"><image src="../../static/jifen.png" mode=""></image></view>
				<view>积分</view>
			</view> -->
		</view>
		<!-- <view class="header" @click="linkTo('./userinfo')">
			<view class="headerInfo">
				<image class="header-img" :src="userinfo.file_path" mode=""></image>
				<view class="userinfo">
					<view class="name">{{userinfo.nick_name}}</view>
					<view class="phone">{{userinfo.phone}}</view>
				</view>
			</view>
		</view> -->
		<view style="padding: 0 20rpx;">
			<view class="next">
				<view class="title">我的藏品</view>
				<view class="menu">
					<view class="menu-item" v-for="item in menu" @click="linkTo(item.url)">
						<image class="muni-img" :src="item.image" mode="widthFix"></image>
						<view class="muni-text">{{item.text}}</view>
					</view>
				</view>
			</view>
			<view class="next">
				<view class="title">通用设置</view>
				<view class="list">
					<view class="list-item" v-for="item in list" @click="linkTo(item.url)">
						<view class="icon-left">
							<image :src="item.icon" class="list-img"></image>
							<view class="list-text">{{item.text}}</view>
						</view>
						<!-- <image src="../../static/icon_00.png" mode="widthFix" class="icon-right"></image> -->
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="list">
			<view class="list-item" v-for="item in list" @click="linkTo(item.url)">
				<view class="icon-left">
					<image :src="item.icon" class="list-img" mode="widthFix"></image>
					<view class="list-text">{{item.text}}</view>
				</view>
				<image src="../../static/icon_00.png" mode="widthFix" class="icon-right"></image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data () {
			return {
				userinfo: {
					file_path: require('../../static/user-login.png'),
					nick_name: '点击登录',
					phone: '登录后可查看你的数字藏品'
				},
				menu:[
					{image:require('../../static/icon_01.png'),text:'盲盒',url:'../market/index'},
					{image:require('../../static/icon_03.png'),text:'合成',url:'../compose/index'},
					{image:require('../../static/icon_02.png'),text:'我的订单',url:'../order/index'},
					{image:require('../../static/icon_04.png'),text:'我的设置',url:'../setting/index'}
				],
				list:[
					{icon: require('../../static/new1.png'),text:'实名认证',url:'./realname'},
					{icon: require('../../static/new2.png'),text:'我的客服',url:'./message'},
					{icon: require('../../static/wallet.png'),text:'我的钱包',url:'./wallet'},
					{icon: require('../../static/billing.png'),text:'收款设置',url:'./billingMessage'},
					{icon: require('../../static/new3.png'),text:'邀请好友',url:'../invite/index'},
					{icon: require('../../static/icon_02.png'),text:'排行榜',url:'./rank'},
				],
				loginType: true
			}
		},
		onShow() {
			if(uni.getStorageSync('userinfo')){
				this.userinfo = uni.getStorageSync('userinfo')
				this.loginType = false
			} else {
				this.userinfo = {
					file_path: require('../../static/user-login.png'),
					nick_name: '点击登录',
					phone: '登录后可查看你的数字藏品'
				}
				this.loginType = true
			}
		},
		methods: {
			linkTo(url){
				if(this.loginType) return uni.navigateTo({
					url: '../login/index'
				})
				uni.navigateTo({url})
			},
			login(){
				if(this.userinfo.nick_name == '点击登录'){
					uni.redirectTo({
						url:'/pages/login/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		// padding: 105px 0 0;
		    background-image: url('https://imgcdn.ecbao.cn/nft/user/user_bg.png');
		    background-position: 100% 0;
		    background-size: 100%;
		    background-repeat: no-repeat;
	       background: #F6F7FB;
	}
	.user{
		background-color: #F6F7FB;
		padding: 0 0;
		.box{
			    margin-bottom: 32rpx;
			    padding: 150rpx 0 0;
			    position: relative;
			    width: 100%;
				height: 350rpx;
			    background-image: linear-gradient(to right , #C7F0E5, #E9EAF8);
			    // border-radius: 36rpx;
				color: #575757;
				text-align: center;
				padding-top: 110rpx;
				// margin-top: 10px;
				.avatar{
					position: absolute;
					height: 160rpx;
					width: 160rpx;
					top: 80rpx;
					left: calc(50% - 80rpx);
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					font-size: 19px;
					margin-top: 150rpx;
				}
				.phone{
					font-size: 15px;
					color: #575757;
					margin-top: 20rpx;
				}
				.jifen{
					margin: 0 auto;
					margin-top: 40rpx;
					font-size: 14px;
					.icon{
						width: 44rpx;
						height: 44rpx;
						margin: 0 auto;
						margin-bottom: 10rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
		}
		.next{
			background: #fff;
			    border-radius: 22rpx;
			    margin-bottom: 32rpx;
				padding-top: 20rpx;
			.title{
				font-size: 16px;
				    font-weight: 400;
				    color: #575757;
				    margin-bottom: 22rpx;
					padding: 0 32rpx;
			}
			.menu{
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 30rpx 0;
				.menu-item{
					color: #575757;
					text-align: center;
				}
				.muni-img{
					width: 50rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.header{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.headerInfo{
				display: flex;
				align-items: center;
				.header-img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
					margin-right: 25rpx;
				}
				.userinfo{
					font-size: 30rpx;
					color: #999;
					.name{
						color: #fff;
						font-size: 45rpx;
						margin-bottom: 10rpx;
					}
					.phone{
						font-size: 26rpx;
					}
				}
			}
			.userdetail{
				background: #3D4042;
				border-radius: 30rpx;
				padding: 15rpx 50rpx;
				text-align: center;
				color: #fff;
				font-weight: 700;
			}
		}
		
		.list{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.list-item{
				width: 18%;
				color: #fff;
				background: #fff;
				border-radius: 30rpx;
				margin-bottom: 20rpx;
				padding: 30rpx 50rpx;
				color: #575757;
				    // margin-left: 16px;
				    font-size: 14px;
			}
			.icon-left{
				// display: flex;
				// align-items: center;
				text-align: center;
				.list-img{
					width: 40rpx;
					// margin-right: 40rpx;
					height: 40rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}		
			.icon-right{
				width: 30rpx;
			}
		}
	}
</style>
