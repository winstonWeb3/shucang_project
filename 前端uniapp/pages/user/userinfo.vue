<template>
	<view class="userinfo">
		<view class="userinfo-item" v-for="(item,index) in userinfo" @click="change(item.type)">
			<view class="icon-left">
				{{item.title}}
			</view>
			<view class="icon-right">
				<image class="icon-text-img" :src="item.img" v-if="item.type == 1" mode="widthFix"></image>
				<view class="icon-text" v-if="item.type == 2 || item.type == 3">{{item.text}}</view>
				<view class="icon-text" v-if="item.type == 4"><icon type="success" v-if="userInfoIdType" class="icon-a" size="20" color="#5BA151"/> <view v-if="!userInfoIdType" class="icon-o"></view> {{userInfoIdType ? '已认证':'未认证'}}</view>
				<image v-if="index != 3" src="../../static/icon_00.png" class="icon-img" mode="widthFix"></image>
				<image v-else src="../../static/copy.png" class="icon-img" mode="widthFix" @click="copy"></image>
			</view>
		</view>
<!-- 		<view class="login_out" @click="loginOut">
			退出登录
		</view> -->
		<!-- <uni-popup ref="popup" type="bottom" name="userImg">
			<view class="pop-item">
				<view class="popup-text camera" @click="camera">拍摄</view>
				<view class="popup-text album " @click="album ">从手机相册选择</view>
				<view class="popup-text close" @click="close">取消</view>
			</view>
		</uni-popup> -->
		<uni-popup ref="popupName" type="center" name="userName">
			<view class="popupName-item">
				<view class="popupName-title">修改昵称</view>
				<view class="popupName-text">原昵称: {{userinfo[1].text}}</view>
				<input focus class="popupName-input" type="text" v-model="popupName" placeholder="支持2-16位中英文,数字" placeholder-style="color:'#5E6161'"/>
				<view class="popupName-btn">
					<view class="popupName-a close" @click="popupNameClose">取消</view>
					<view class="popupName-a" @click="popupNameSub">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import tool from '../../common/tool.js'
	import config from '../../common/config.js';
	export default {
		data () {
			return {
				userinfo: [
					{title: '头像',type: 1,img:require('../../static/user.jpeg')},
					{title: '昵称',type: 2,text:'藏家_001'},
					{title: '手机号',type: 3,text:'xxxxxx1454'},
					{title: '区块链地址',type: 3,text:''},
					{title: 'ID',type: 3,text:''}
				],
				popupName: '',
				userInfoIdType: false,
				txt:''
			}
		},
		onShow() {
			if(uni.getStorageSync('userinfo')) {
				let userinfo = uni.getStorageSync('userinfo')
				this.userinfo[0].img = userinfo.file_path
				this.userinfo[1].text = userinfo.nick_name
				this.userinfo[2].text = userinfo.phone
				this.userinfo[3].text = userinfo.address.substring(0,1) + '****************' + userinfo.address.substring(userinfo.address.length - 1, userinfo.address.length)
				this.userinfo[4].text = userinfo.userId
				this.txt = userinfo.address
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
			change (type) {
				switch (type) {
					case 1: 
						// this.$refs.popup.open('bottom')
						this.chooseImg()
						break;
					case 2:
						this.changeName()
						break;
					case 4:
						uni.navigateTo({
							url:'./realname?type=' + this.userInfoIdType
						})
						break;
				}
			},
			copy(){
				// #ifdef H5
				this.$copyText(this.txt).then(
					res => {
						this.$showToast('复制成功')
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.txt,
					success: () => {
						this.$showToast('复制成功')
					}
				})
				// #endif
			},
			chooseImg(){
				const that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(res.tempFiles[0]);
					uni.uploadFile({
					      url: `${that.$config.URL}User/ImgUp`, //仅为示例，非真实的接口地址 
					      filePath: res.tempFilePaths[0],
					      name: 'file',
					      formData: {
					        'userid': uni.getStorageSync('userinfo').userId
					      },
					      success (res){
							 that.userinfo[0].img = config.ImgUrl+ JSON.parse(res.data).data.file_path
							 var newkey = uni.getStorageSync('userinfo')
							 newkey.file_path = that.userinfo[0].img 
							 uni.setStorageSync('userinfo',newkey)
							that.$showToast(JSON.parse(res.data).message)
					      }
					})
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
				this.$request('post','User/nickNameUp',{
					nickname : this.popupName,
					userid: uni.getStorageSync('userinfo').userId
				}).then(res => {
					console.log('res',res)
					var newkey = uni.getStorageSync('userinfo')
					newkey.nick_name = res.data.nickname
					uni.setStorageSync('userinfo',newkey)
					this.$showToast(res.message)
					this.userinfo[1].text = res.data.nickname
					this.popupName = res.data.nickname
					this.$refs.popupName.close()
				}).catch(err => {
					console.log('err',err)
					this.$showToast(err.message)
				})
				
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
			background: #292B2B;
			color: #C94F58;
			text-align: center;
			padding: 30rpx 0;
			margin-top: 200rpx;
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
		background: #FFF;
		color: #000;
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
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 0 20rpx 30rpx;
			margin: 0 40rpx;
			width: 500rpx;
			text-align: left;
			border: 2rpx solid #F2F2F2;
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
