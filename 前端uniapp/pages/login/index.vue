<template>
	<view class="login">
<!-- 		<image src="../../static/close-2.png" mode="widthFix" class="login-close" @click="loginClose"></image>
 -->		<view class="logo">
			<image class="auto-img" src="../../static/logo.jpg" mode="widthFix"></image>
		</view>
		<!-- <view class="name">尼古数藏</view> -->
	<!-- 	<view class="tab-list">
			<view class="tab-item" :class="[index == changeIndex ? 'active':'']" v-for="(item,index) in changeArr"
				:key="index" @click="change(index)">{{item.name}}</view>
		</view> -->
		<view class="box" v-if="changeIndex == 0">
			<!-- <view class="title">手机号</view> -->
			<view class="flex">
				<view class="img">
					<image class="auto-img" src="../../static/phone.png" mode=""></image>
				</view>
				<view style="width: 86%;">
					<input type="number" placeholder-style="color:#BDBDBD" focus v-model="phone" maxlength="11"
						@input="getInput" placeholder="请输入手机号" class="login-phone" />
				</view>
			</view>
			<!-- <view class="title">密码</view> -->
			<view class="flex">
				<view class="img">
					<image class="auto-img" src="../../static/password.png" mode=""></image>
				</view>
				<view
					style="display: flex;justify-content: space-between;align-items: center;background-color: #FFF;width: 86%;border-radius: 10rpx;">
					<input type="password" placeholder-style="color:#BDBDBD" v-model="password" placeholder="请输入密码"
						class="login-phone" />
					<view style="margin-right: 10rpx;font-size: 15px;width: 30%;color: #01CEA5;text-align: right;"
						@click="forget">忘记密码</view>
				</view>
			</view>

		</view>
		<view class="login-submit" :class="subType ? 'login-sub':''" @click="loginSubmit" v-if="changeIndex == 0">登录</view>
		<view class="link-view" @click="register">
			<view></view>
				<view style="display: flex;">
				<view>还没有账号？</view>
				<view class="dark">立即注册</view>
			</view>
		</view>
		<!-- <view style="display: flex;justify-content: space-between;">
			
			<view class="input-texts" @click="register">暂无账号,去注册</view>
		</view> -->
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	export default {
		data() {
			return {
				phone: null,
				// phone: '13542770993',
				// inter: null,
				code: '',
				invite: '',
				password: '123456',
				changeArr: [{
					name: '登录'
				}, {
					name: '注册'
				}],
				changeIndex: 0,
				subType: true,
				codeTip: '获取验证码'
			}
		},
		onLoad(options) {
			console.log('lll', options)
			if (options.code) {
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
			change(index) {
				this.changeIndex = index
			},
			forget() {
				uni.navigateTo({
					url: '/pages/forget/index'
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/register/index'
				})
			},
			//获取地址栏
			getRequest() {
				var url = window.location.href;
				console.log('kk', url)
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
			getInput(e) {
				if (e.detail.value.length >= 11) {
					this.subType = false
				} else {
					this.subType = true
				}
			},
			loginSubmit: tool.debounce(function() {
				if (this.subType) return this.$showToast('请输入手机号')
				if (this.password == '') {
					return this.$showToast('请输入密码')
				}
				uni.showLoading({
					title: '登录中'
				})
				this.$request('POST', 'Passport/loginAll', {
					phone: this.phone,
					password: this.password
				}).then(suc => {
					console.log('suc', suc)
					this.$showToast(suc.message)
					let length = suc.data.phone.length
					suc.data.phone = suc.data.phone.substring(0, 3) + '****' + suc.data.phone.substring(
						length - 3, length)
					if (suc.data.file_path) {
						suc.data.file_path = this.$config.ImgUrl + suc.data.file_path
					} else {
						suc.data.file_path = this.$config.ImgUrl + 'headimg/headimg.png'
					}
					// {
					// 	"data": {
					// 		"address": "0xjd8vg33h67teipyjiw2rgtwr0crbf2mr436mjkcm",
					// 		"file_path": "https://baimu.qhfkj.cn/uploads/headimg/headimg.png",
					// 		"idcar": "44************3972",
					// 		"idname": "梁聪",
					// 		"nick_name": "13542770993",
					// 		"phone": "135****993",
					// 		"token": "cc991e894ca45f6b215a9fcbf3d74a64",
					// 		"userId": 1
					// 	},
					// 	"message": "登录成功",
					// 	"status": 200
					// }
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

		.tab-list {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			width: 100%;
			// align-items: center;
			padding: 20px;
			margin-top: 30rpx;

			.tab-item {
				padding: 30rpx;
				font-size: 15px;
				color: #A2A2A2;
				text-align: center;
				width: 100%;
			}

			.active {
				font-size: 16px;
				color: #000;
				position: relative;
			}

			.active:after {
				content: '';
				position: absolute;
				bottom: 18rpx;
				width: 100%;
				height: 6rpx;
				border-radius: 10rpx;
				background-color: #01CEA5;
				left: 0;
			}
		}

		.login-title {
			font-size: 60rpx;
			color: #fff;
			letter-spacing: 5rpx;
		}

		.login-phone {
			// width: 100%;
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

		.title {
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
			line-height: 80rpx;
			text-align: center;
			width: 80%;
			margin: 120rpx auto 0;
			font-size: 32rpx;
			color: #FFF;
		}

		.link-view {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			margin-top: 26rpx;
			font-size: 12px;
			font-weight: 400;
			color: #999;

			.dark {
				color: #000;
			}
		}

		.login-sub {
			background-color: #01CEA5;
			// background: linear-gradient(to right,#B1DEC8,#89f89f);
			color: #FFF;
		}
	}

	.logo {
		width: 210rpx;
		height: 160rpx;
		margin: 0 auto;
		border-radius: 20rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.name {
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}

	.box {
		box-sizing: border-box;
		margin-bottom: 33px;
		margin-top: 40rpx;
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
		margin-top: 14px;
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
			background-color: grey;
			border-radius: 4px;
			color: #e2d6d6;
		}
	}
</style>
