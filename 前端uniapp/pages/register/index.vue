<template>
	<view class="login">
		<!-- <image src="../../static/close-2.png" mode="widthFix" class="login-close" @click="loginClose"></image> -->
		<view class="logo"><image class="auto-img" src="../../static/logo.jpg" mode="widthFix"></image></view>
		<view class="name">尼古数藏</view>
		<view class="box">
			<!-- <view class="title">手机号</view> -->
			<view class="flex">
				<view class="img">
					<image class="auto-img" src="../../static/phone.png" mode=""></image>
				</view>
				<view style="width: 86%;">
					<input type="number" placeholder-style="font-size:16px;color:#BDBDBD;" focus v-model="phone" maxlength="11"
						@input="getInput" placeholder="请输入手机号" class="login-phone" />
				</view>
			</view>
			<!-- <input type="number" focus v-model="phone" maxlength="11" @input="getInput" placeholder="请输入手机号"
				class="login-phone" /> -->
				<!-- <view class="title">验证码</view> -->
				<view class="flex">
					<view class="img">
						<image class="auto-img" src="../../static/yzm.png" mode=""></image>
					</view>
					<view style="width: 86%;">
						<view class="code_box">
							<view class="ipt"><input placeholder-style="font-size:16px;color:#BDBDBD;" type="text" value="" v-model="code"
									placeholder="短信验证码" />
							</view>
							<view class="code" @click="getCode">{{codeTip}}</view>
						</view>
					</view>
				</view>
			
			<!-- <view class="title">密码</view> -->
			<view class="flex">
				<view class="img">
					<image class="auto-img" src="../../static/password.png" mode=""></image>
				</view>
				<view style="width: 86%;">
					<input type="password" v-model="password" placeholder-style="font-size:16px;color:#BDBDBD;" placeholder="请输入密码" class="login-phone" />
				</view>
			</view>
			
			<!-- <view class="title">邀请ID</view> -->
			<view class="flex">
				<view class="img">
					<image class="auto-img" src="../../static/invite.png" mode=""></image>
				</view>
				<view style="width: 86%;">
					<input placeholder-style="font-size:16px;color:#BDBDBD;" type="text" value="" placeholder="请输入邀请人ID"
							v-model="invite" />
				</view>
			</view>
			
		</view>
		<view class="login-submit" :class="subType ? 'login-sub':''" @click="loginSubmit">注册</view>
		<!-- <view class="login-submit login-sub" @click="loginApp">下载</view> -->
		<view style="display: flex;justify-content: space-between;">
			<view> </view>
			<!-- <view class="input-texts" @click="register">暂无账号,去注册</view> -->
		</view>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				phone: null,
				subType: true,
				codeTip: '获取验证码',
				inter: null,
				code: '',
				invite: '',
				password:''
			}
		},
		onLoad(options) {
			console.log('lll',options)
			if(options.code){
				this.invite = options.code
			}
   //       if(this.getRequest().code){
			//  console.log('asd',this.invite)
			//  this.invite = this.getRequest().code
		 // }
		},
		methods: {
			loginClose() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			getCode() {
				if (this.phone == '' || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
					return this.$showToast('请输入正确的手机号')
				}
				if (this.codeTip != '获取验证码') return
				var num = 60
				this.$request('post', 'Captcha/sendSmsCaptcha', {
					form: {
						mobile: this.phone,
						type: 0
					}
				}).then(res => {
					this.$showToast(res.message)
					this.inter = setInterval(() => {
						if (num - 1 <= 0) {
							this.inter = clearInterval(this.inter)
							this.codeTip = '获取验证码'
						} else {
							num -= 1
							this.codeTip = num + 's后重新获取'
						}
					}, 1000)
				}).catch(err => {
					this.$showToast(err.message)
				})
			},
			loginApp(){
				location.href = 'http://123.8bcm.cn/saibo.apk'
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
			},
			//获取地址栏
			getRequest() {
				var url = window.location.href;
				console.log('kk',url)
				//获取url中"?"符后的字串  
				var theRequest = new Object();
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
			getInput(e) {
				if (e.detail.value.length >= 11) {
					this.subType = false
				} else {
					this.subType = true
				}
			},
			loginSubmit: tool.debounce(function() {
				if (this.subType) return this.$showToast('请输入手机号')
				if (this.code == '') return this.$showToast('请输入验证码')
				if (this.password == '') return this.$showToast('请输入密码')
				uni.showLoading({
					title: '登录中'
				})
				this.$request('POST', 'Passport/registerNre', {
					phone: this.phone,
					password:this.password,
					smsCode: this.code,
					code: this.invite
				}).then(suc => {
					console.log('suc', suc)
					this.$showToast(suc.message)
					let length = suc.data.phone.length
					suc.data.phone = suc.data.phone.substring(0, 3) + '****' + suc.data.phone.substring(
						length - 3, length)
						if(suc.data.file_path ){
							suc.data.file_path = this.$config.ImgUrl + suc.data.file_path
						}else{
							suc.data.file_path = this.$config.ImgUrl + 'headimg/headimg.png'
						}
					uni.setStorageSync('userinfo', suc.data)
					uni.setStorageSync('token', suc.data.token)
					uni.setStorageSync('login', 1)
					setTimeout(() => {
						uni.switchTab({
							url: '../index/index'
						})
					}, 800)
				}).catch(fail => {
					this.$showToast(fail.message)
				}).finally(() => {
					uni.hideLoading()
				})
			})
		},
		onUnload() {
			this.inter = clearInterval(this.inter)
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		height: 100vh;
		// background: url(../../static/login-bg.png);
		// background-size: 100% 100%;
		padding: 100rpx 40rpx 0;
		box-sizing: border-box;
        background-color: #FFF;
		.login-close {
			width: 50rpx;
			position: absolute;
			top: 120rpx;
			left: 50rpx;
		}

		.login-title {
			font-size: 60rpx;
			color: #fff;
			letter-spacing: 5rpx;
		}

		.login-phone {
			width: 100%;
			// border-bottom: 3rpx solid #3D3D3D;
			// margin-top: 100rpx;
			// padding-bottom: 20rpx;
			font-size: 32rpx;
			letter-spacing: 8rpx;
			color: #000;
			background-color: #FFF;
			padding: 10rpx 10rpx;
			border-radius: 10rpx;
		}

		.input-text {
			margin-top: 30rpx;
			color: #666;
			letter-spacing: 6rpx;
			font-size: 30rpx;

		}
         .title{
			 margin-top: 16rpx;
			 margin-bottom: 16rpx;
		 } 
		.input-texts {
			margin-top: 30rpx;
			color: #F23636;
			letter-spacing: 6rpx;
			font-size: 30rpx;
			text-align: right;
			border-bottom: 2rpx solid #F23636;
			display: inline-block;
		}

		.login-submit {
			border-radius: 40rpx;
			background-color: #01CEA5;
			height: 80rpx;
			width: 80%;
			line-height: 80rpx;
			text-align: center;
			margin: 80rpx auto 0;
			font-size: 32rpx;
			color: #FFF;
		}

		.login-sub {
			background-color: #01CEA5;
			color: #FFF;
		}
	}
	.logo{
		width: 210rpx;
		height: 160rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.name{
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}
   .box{
	   box-sizing: border-box;
	       margin-bottom: 33px;
	       padding: 27px 17px 32px;
	       // background: #f9f9f9;
	       // border: 1px solid #f4f2f2;
	       border-radius: 11px;
	       width: 100%;
		   .flex {
		   	display: flex;
		   	align-items: center;
		   	padding-bottom: 10rpx;
		   	border-bottom: 2rpx solid #C5C5C5;
		   	margin-bottom: 20rpx;
		   
		   	.img {
		   		margin-right: 20rpx;
		   		width: 40rpx;
		   		height: 40rpx;
		   	}
		   }
   }
	.code_box {
		display: flex;
		justify-content: space-between;
		// margin-top: 14px;
		padding: 10rpx 10rpx;
		background-color: #FFF;
		border-radius: 10rpx;
		// border-bottom: 1px solid #3D3D3D;

		.ipt {
			font-size: 16px;
			color: grey;
		}

		.code {
			padding: 2px 6px;
			background-color: #01CEA5;
			border-radius: 4px;
			color: #fff;
		}
	}
</style>
