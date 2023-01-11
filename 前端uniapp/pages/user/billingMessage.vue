<template>
	<view>
		<view class="seting-tab">
			<view class="van_tabs">
				<view class="van_tab" :class="changeIndex == index?'active':''" v-for="(item,index) in arr"
					:key="index" @click="change(index)">{{item.name}}</view>
			</view>
			<view class="upload" v-if="changeIndex == 0 && !uploadImgZ || changeIndex == 1 && !uploadImgW" @click="upLoad">+</view>
			<view class="uploadImgW" v-if="changeIndex == 0 && uploadImgZ" @click="upLoad"><image class="auto-img" :src="uploadImgZ" mode="" @click="upLoad"></image></view>
			<view class="uploadImgW" v-if="changeIndex == 1 && uploadImgW" @click="upLoad"><image class="auto-img" :src="uploadImgW" mode="" @click="upLoad"></image></view>
			<view class="flex_ipt" v-if="changeIndex == 0">
				<view class="txt">支付宝号</view>
				<view class="ipt"><input type="text" value="" v-model="apply" placeholder="请输入支付宝号码"/></view>
			</view>
			<view class="flex_ipt" v-if="changeIndex == 1">
				<view class="txt">微信号</view>
				<view class="ipt"><input type="text" value="" v-model="wechat" placeholder="请输入微信号码"/></view>
			</view>
			<view class="flex_ipt" v-if="changeIndex == 2">
				<view class="txt">姓名</view>
				<view class="ipt"><input type="text" value="" v-model="name" placeholder="请输入姓名"/></view>
			</view>
			<view class="flex_ipt" v-if="changeIndex == 2">
				<view class="txt">开户银行</view>
				<view class="ipt"><input type="text" value="" v-model="openBank" placeholder="请输入开户银行"/></view>
			</view>
			<view class="flex_ipt" v-if="changeIndex == 2">
				<view class="txt">开户支行</view>
				<view class="ipt"><input type="text" value="" v-model="openOther" placeholder="请输入开户支行"/></view>
			</view>
			<view class="flex_ipt" v-if="changeIndex == 2">
				<view class="txt">银行卡号</view>
				<view class="ipt"><input type="text" value="" v-model="bankNumber" placeholder="请输入银行卡号"/></view>
			</view>
			<view class="flex_ipt">
				<view class="txt">手机号</view>
				<view class="ipt"><input type="text" value="" v-model="mobile" placeholder="请输入手机号码"/></view>
			</view>
			<view class="submit" @click="submit">提交</view>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js';
	export default {
		data() {
			return {
				arr: [{
						name: '支付宝'
					},
					{
						name: '微信'
					},
					{
						name: '银行卡'
					}
				],
				changeIndex: 0,
				apply:'',
				wechat:'',
				mobile:'',
				name:'',
				openBank:'', //开户银行
				openOther:'',
				bankNumber:'',//银行卡号
				uploadImgZ:'',  //支付宝
				uploadImgW:'', //微信收款码
				upZ:'',
				upW:''
			}
		},
		onShow(){
			this.$request('get', 'user/collectionInfo', {
			}).then(res => {
				console.log('asd',res)
				if(res.data.data){
				   let arr = res.data.data
				   arr.forEach(item=>{
					   if(item.type == 0){
						   this.apply = item.name
						   this.mobile = item.mobile
						   this.uploadImgZ = config.ImgUrl + item.path
					   }else if(item.type == 1){
						   this.wechat = item.name
						   this.mobile = item.mobile
						   this.uploadImgW = config.ImgUrl + item.path
					   }else{
						   this.openBank = item.bank
						   this.openOther = item.branch
						   this.bankNumber = item.name
						   this.name = item.real_name
						   this.mobile = item.mobile
					   }
				   })
				}
			}).catch(err => {
				console.log('err', err)
				this.$showToast(err.message)
			})
		},
		methods:{
			change(index){
				this.changeIndex = index
			},
			submit(){
				let form = {
					name:this.changeIndex == 0 ? this.apply : this.changeIndex == 1 ? this.wechat : this.bankNumber,
					type:this.changeIndex,
					mobile:this.mobile,
					path:this.changeIndex == 0 ? this.uploadImgZ : this.changeIndex == 1 ? this.uploadImgW : '',
					bank:this.changeIndex == 2 ? this.openBank : '',
					branch:this.changeIndex == 2 ? this.openOther : '',
					real_name:this.changeIndex == 2 ? this.name : ''
				}
				if (this.mobile == '' || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					return this.$showToast('请输入正确的手机号')
				}
				switch (this.changeIndex){
					case 0:
					if(this.upZ == '' || this.apply == '' || this.mobile == '') return this.$showToast('请完善支付宝信息')
                    this.utilPost(form)
					break;
					case 1:
					if(this.upW == '' || this.wechat == '' || this.mobile == '') return this.$showToast('请完善微信收款信息')
					this.utilPost(form)
					break;
					case 2:
					if(this.openBank == '' || this.openOther == '' || this.bankNumber == '' || this.mobile == '' || this.name == '') return this.$showToast('请完善银行卡收款信息')
					this.utilPost(form)
					break;
				}
			},
			utilPost(form){
				this.$request('post', 'user/collectionEdit', {
					form
				}).then(res => {
					console.log('asd',res)
					this.$showToast(res.message)
					
				}).catch(err => {
					this.$showToast(err.message)
				})
			},
			upLoad(){
				const that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function (res) {
						console.log(res.tempFiles[0]);
					uni.uploadFile({
					      url: `${config.URL}User/ImgUp`, //仅为示例，非真实的接口地址
					      filePath: res.tempFilePaths[0],
					      name: 'file',
					      formData: {
					        'userid': uni.getStorageSync('userinfo').userId
					      },
					      success (res){
							  if(that.changeIndex == 0){
								  that.uploadImgZ = config.ImgUrl+ JSON.parse(res.data).data.file_path
								  that.upZ = JSON.parse(res.data).data.file_path
							  }else{
								  that.uploadImgW = config.ImgUrl+ JSON.parse(res.data).data.file_path
								  that.upW = JSON.parse(res.data).data.file_path
							  }
					      }
					})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFF;
	}

	.seting-tab {
		width: 96%;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		-moz-box-shadow: 0px 1px 5px #d8d6d6;
		-webkit-box-shadow: 0px 1px 5px #d8d6d6;
		box-shadow: 0px 1px 5px #d8d6d6;
		border-radius: 20rpx;
		background-image: linear-gradient(to right , #C7F0E5, #E9EAF8);

		.van_tabs {
			display: flex;
			font-size: 16px;
			color: #333;

			.van_tab {
				width: 33.3%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
			}

			.active {
				background-color: #d4c4c4;
			}
		}
		.upload{
			width: 160rpx;
			height: 160rpx;
			border: 2rpx solid #333;
			border-radius: 14rpx;
			margin: 0 auto;
			margin-top: 60rpx;
			line-height: 160rpx;
			text-align: center;
			font-size: 30px;
			color: #AAA;
		}
		.uploadImgW{
			width: 160rpx;
			height: 160rpx;
			border-radius: 14rpx;
			margin: 0 auto;
			margin-top: 60rpx;
			overflow: hidden;
		}
		.flex_ipt{
			display: flex;
			padding: 20rpx 10rpx;
			border-bottom: 2rpx solid #F7F7F7;
			.txt{
				color: #333;
				margin-right: 10rpx;
			}
			.ipt{
				color: #999;
			}
		}
		.submit{
			width: 90%;
			height: 70rpx;
			line-height: 70rpx;
			border-radius: 16rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			text-align: center;
			background-color: #d4c4c4;
		    color: #000;
		}
	}
</style>
