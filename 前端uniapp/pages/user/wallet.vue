<template>
	<view>
		<view class="contain">
			<view class="decorate">
				<view class="circle"></view>
			</view>
			<view class="wallet">
				<view class="safeguard">
					<view>资金安全有保障</view>
				</view>
				<view class="top">账户余额（元）</view>
				<view class="balance">{{balance}}</view>
				<view class="btn-normal" @click="withdraw">提现</view>
			</view>
		</view>
		<view class="content" @click="detail">
			<view class="withdraw_record">
				<view>提现明细</view>
				<view class="img"><image class="auto-img" src="../../static/icon_00.png" mode=""></image></view>
			</view>
		</view>
		<view class="back" @click="payType = false" v-if="payType">
			<view class="change" @click.stop>
				<view class="title">提现金额</view>
				<view class="ipt">
					<input type="number" value="" placeholder="请填写提现金额" v-model="num"/>
				</view>
				<radio-group @change="radioChange">
					<view class="radio-btn">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in radioBtn" :key="item.value">
							<view class="radio-btn-item">
								<view>
									<radio color="#1989fa" :value="item.value" :checked="index === current" />
								</view>
								<view>{{item.name}}</view>
							</view>
						</label>
					</view>
				</radio-group>
				<view class="yes" @click="give">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
               balance:'',
			   payType:false,
			   num:'',
			   current: 0,
			   radioBtn: [
				   // {value: '0',name: '支付宝'},
				   // {value: '1',name: '微信'},
				   {value: '2',name: '银行卡'},
				],
			}
		},
		onShow(){
			this.getBalance()
		},
		methods:{
			getBalance(){
				this.$request('get', 'user/balance', {
				}).then(res => {
					this.balance = res.data.balance
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			withdraw(){
				this.payType = true
			},
			give(){
				if(this.num > this.balance || this.balance == 0) return this.$showToast('余额不足')
				this.$request('post', 'user/withdrawal', {
					price:this.num,
					type: this.current
				}).then(res => {
					this.$showToast(res.message)
					this.getBalance()
					this.payType = false
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			detail(){
				uni.navigateTo({
					url:'/pages/user/walletDetail/index'
				})
			},
			radioChange(e){
				console.log('ee',e)
				this.current = parseInt(e.detail.value);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.contain {
		.decorate {
			height: 460rpx;
			position: relative;
			overflow: hidden;

			.circle {
				width: 993px;
				padding-bottom: 100%;
				// background: #000;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				bottom: 0;
				-webkit-transform: translateX(-50%);
				transform: translateX(-50%);
			}
		}

		.wallet {
			width: calc(100% - 2 * 32rpx);
			// height: 570rpx;
			border-radius: 8px;
			position: absolute;
			top: 30rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 2;
			background: #fff;
			box-shadow: 0 0 10px #eee;
			padding-bottom: 20rpx;
			.safeguard {
				height: 33px;
				background: rgba(61, 62, 63, .13);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 12px;
				font-weight: 700;
			}

			.top {
				margin-top: 54rpx;
				text-align: center;
			}

			.balance {
				height: 55px;
				margin-top: 44rpx;
				font-size: 44px;
				color: #000;
				text-align: center;
			}
			.btn-normal{
				    width: 540rpx;
				    height: 96rpx;
				    background: #1989fa;
				    border-radius: 16rpx;
				    margin: 100rpx auto 0;
				    font-size: 18px;
				    color: #fff;
				    line-height: 96rpx;
				    text-align: center;
			}
		}
	}
	.content{
		padding: 0 32rpx;
		margin-top: 160rpx;
		.withdraw_record{
			height: 120rpx;
			    padding: 0 22rpx;
			    border-radius: 22rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #fff;
				color: #333;
				.img{
					width: 44rpx;
					height: 44rpx;
				}
		}
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
			.ipt{
				margin: 0 auto;
				margin-top: 30rpx;
				width: 90%;
				height: 70rpx;
				line-height: 70rpx;
				border:4rpx dashed #ddd;
				padding-left:8rpx ;
				input{
					width: 100%;
					height: 100%;
				}
			}
		}
		.yes{
			width: 80%;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			background-color: #1989fa;
			color: #fff;
			margin: 0 auto;
			margin-top: 40rpx;
			border-radius: 34rpx;
		}
	}
	.radio-btn{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		margin: 30rpx 0;
		.radio-btn-item{
			display: flex;
			align-items: center;
		}
	}
</style>
