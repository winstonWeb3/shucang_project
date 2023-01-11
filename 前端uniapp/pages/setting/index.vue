<template>
	<view class="userinfo">
		<view class="userinfo-item" v-for="item in userinfo" @click="change(item.url)">
			<view class="icon-left">
				{{item.title}}
			</view>
			<view class="icon-right">
				<image src="../../static/icon_00.png" class="icon-img" mode="widthFix"></image>
			</view>
		</view>
		<view class="login_out" @click="loginOut">
			退出登录
		</view>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data () {
			return {
				userinfo: [
					// {title: '头像',type: 1,img:require('../../static/user.jpeg')},
					{title: '账户与安全',type: 2,text:'藏家_001',url:'/pages/user/userinfo'},
					{title: '意见反馈',type: 3,text:'10086',url:'/pages/user/feedback'},
					{title: '关于我们',type: 4,url:'/pages/user/about'},
				],
				popupName: '',
				userInfoIdType: false
			}
		},
		onShow() {
			if(uni.getStorageSync('userinfo')) {
				let userinfo = uni.getStorageSync('userinfo')
				this.userinfo[0].img = userinfo.file_path
				this.userinfo[1].text = userinfo.nick_name
				this.userinfo[2].text = userinfo.phone	
				if(userinfo.idcar){
					this.userInfoIdType = true
				}
			}
		},
		methods: {
			// 退出登录
			loginOut:tool.debounce(function(){
				uni.removeStorageSync('token')
				uni.removeStorageSync('userinfo')
				uni.removeStorageSync('login')
				uni.switchTab({
					url: '../index/index'
				})
			}),
			change (url) {
						uni.navigateTo({
							url:url
						})
			},
			chooseImg(){
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			changeName(){
				this.$refs.popupName.open('center')
			},
			popupNameClose(){
				this.$refs.popupName.close()
			},
			popupNameSub(){
				if(this.popupName == '') return uni.showToast({
					title: '输入不能为空',
					icon: 'none'
				})
				this.userinfo[1].text = this.popupName
				this.popupName = ''
				this.$refs.popupName.close()
			}
			
			// -------  app端  ------
			// // 调起手机相机
			// camera(){
			// 	this.$refs.popup.close()
			// 	const that = this
			// 	let camera = plus.camera.getCamera();
			// 	var res = camera.supportedImageResolutions[0];
			// 	var fmt = camera.supportedImageFormats[0];
			// 	camera.captureImage((res)=>{}, (err)=>{console.log('err',err)}, {resolution:res,format:fmt,crop:{width:'300px',height:'300px'}})
			// },
			// // 调起相册
			// album(){
			// 	this.$refs.popup.close()
			// 	const that = this
			// 	plus.gallery.pick( function(path){
			// 	}, function ( e ) {
			// 		console.log( "取消选择图片" );
			// 	}, {filter:"image"});
			// },
			// // 关闭
			// close(){
			// 	this.$refs.popup.close()
			// }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.userinfo{
		padding: 20rpx 20rpx;
		.userinfo-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #000;
			background: #FFF;
			border-radius: 30rpx;
			margin-bottom: 25rpx;
			padding: 30rpx 50rpx;
		}
		.login_out{
			width: 100%;
			border-radius: 30rpx;
			background: #FFF;
			color: #000;
			text-align: center;
			padding: 30rpx 0;
			margin-top: 80rpx;
		}
		.icon-left{
			font-size: 35rpx;
		}
		.icon-right{
			display: flex;
			align-items: center;
			color: #A6A7A7;
			font-size: 35rpx;
			.icon-text-img{
				width: 100rpx;
				border-radius: 100%;
			}
			.icon-text{
				display: flex;
				align-items: center;
				.icon-a{
					margin-right: 10rpx;
				}
			}
			.icon-o{
				width: 25rpx;
				height: 25rpx;
				background: #FF3141;
				border-radius: 100%;
				margin-right: 10rpx;
			}
			.icon-img{
				width: 50rpx;
			}
		}
	}
	.pop-item{
		.popup-text{
			width: 100vw;
			background: #2C2F2F;
			padding: 30rpx;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
		}
		.camera{
			border-radius: 20rpx 20rpx 0 0;
			margin-bottom: 1rpx;
		}
		.close{
			margin-top: 15rpx;
		}
	}
	.popupName-item{
		padding: 20rpx 0 0;
		background: #2C2F2F;
		color: #fff;
		font-size: 30rpx;
		border-radius: 20rpx;
		text-align: center;
		.popupName-title{
			font-size: 40rpx;
			font-weight: 700;
		}
		.popupName-text{
			margin: 30rpx 0 25rpx;
		}
		.popupName-input{
			background: #363939;
			border-radius: 10rpx;
			padding: 20rpx 0 20rpx 30rpx;
			margin: 0 40rpx;
			width: 500rpx;
			text-align: left;
		}
		.popupName-btn{
			display: flex;
			align-items: center;
			border-top: 2rpx solid #5E6161;
			margin-top: 30rpx;
			.popupName-a{
				width: 50%;
				line-height: 100rpx;
				text-align: center;
			}
			.close{
				border-right: 2rpx solid #5E6161;
			}
		}
	}
</style>
