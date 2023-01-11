<template>
	<view>
		<view class="box_top">
			<view class="search"><input type="text" v-model="search" value="" placeholder="请输入商品名称"/></view>
			<view class="sub" @click="sub">确定</view>
		</view>
		<view class="select_box">
			<view class="select_item" v-for="(item,index) in selectArr" :key="index" @click="change(index)">
				<view class="name" :class="item.show? 'select_active' :''">{{item.name}}</view>
				<view class="icon">
					<view class="util">
						<image :src="item.show && item.tip?item.icon[0].change:item.icon[0].noChange" mode=""></image>
					</view>
					<view class="util">
						<image :src="item.show && !item.tip?item.icon[1].change:item.icon[1].noChange" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="contain">
			<view class="item" @click="link(item.id,item.goods_id)" v-for="(item,index) in arr" :key="index">
				<view class="img">
					<image :src="item.file_path" mode=""></image>
				</view>
				<view class="last">
					<view class="name">{{item.name}}</view>
                    <view class="number">
                    	<view class="numText">
                    		<view class="title">编号</view>{{item.coll_no}}
                    	</view>
						<view class="price">￥{{item.price}}</view>
                    </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[],
				result:[],
				search:'',
				selectArr: [{
						name: '价格排序',
						tip: true,
						show: true,
						icon: [{
								change: '../../static/top1.png',
								noChange: '../../static/top.png'
							},
							{
								change: '../../static/bottom1.png',
								noChange: '../../static/bottom.png'
							}
						]
					},
					{
						name: '时间排序',
						tip: false,
						show: false,
						icon: [{
								change: '../../static/top1.png',
								noChange: '../../static/top.png'
							},
							{
								change: '../../static/bottom1.png',
								noChange: '../../static/bottom.png'
							}
						]
					}
				],
				page:1,
				selectIndex:0
			}
		},
		// onShow
		onLoad(){
			// this.$request('get', 'order/market', {
			// }).then(res => {
			// 	console.log('lpo',res)
			// 	this.arr = res.data.list
			// 	this.result = res.data.list
			// }).catch(err => {
			// 	console.log('err', err)
			// 	this.$showToast(err.message)
			// })
			this.utilList()
		},
		methods: {
			utilList(){
				this.$request('get', 'order/market', {
					page:this.page,
					order:this.selectIndex == 0 ? 'price':'createtime',
					type:this.selectArr[this.selectIndex].tip?'asc':'desc',
					keyword:this.search
				}).then(res => {
					console.log('lpo',res)
					this.arr = [...this.arr,...res.data.list.data]
					this.result = [...this.arr,...res.data.list.data]
					this.total = res.data.list.last_page
					// this.search = ''
				}).catch(err => {
					console.log('err', err)
					this.search = ''
					this.$showToast(err.message)
				})
			},
			// getList(price,type){
			// 	this.$request('get', 'order/market', {
			// 		order:price,
			// 		type:type
			// 	}).then(res => {
			// 		console.log('lpo',res)
			// 		this.arr = res.data.list
			// 	}).catch(err => {
			// 		console.log('err', err)
			// 		this.$showToast(err.message)
			// 	})
			// },
			getList(price,type){
				this.$request('get', 'order/market', {
					order:price,
					type:type,
					page:this.page,
					keyword:this.search
				}).then(res => {
					console.log('lpo',res)
					this.arr = [...this.arr,...res.data.list.data]
					this.total = res.data.list.last_page
				}).catch(err => {
					console.log('err', err)
					this.$showToast(err.message)
				})
			},
			change(index) {
				console.log('asd',index)
				this.selectIndex = index
				this.page = 1
				this.arr = []
				for (var i in this.selectArr) {
					if (index == i) {
						this.selectArr[i].show = true
					} else {
						this.selectArr[i].show = false
					}
				}
				this.selectArr[index].tip = !this.selectArr[index].tip
				this.getList(index == 0?'price':'createtime',this.selectArr[index].tip?'asc':'desc')
			},
			sub(){
				if(this.search == '') this.$showToast('请输入藏品名称')
				this.arr = []
				this.page = 1
				this.utilList()	
			},
			link(id,goods_id){
				this.$request('post', 'order/chkWaitPay', {
					id:id,
					goods_id:goods_id
				}).then(res => {
					uni.navigateTo({
						url: '/pages/index/detail?id=' + id +'&type=' + 2
					})
				}).catch(err => {
					this.$showToast(err.message)
				})
				
			},
			onReachBottom(){
				console.log('sskkfjk')
				if(this.page + 1 > this.total){
					return this.$showToast('暂无更多数据')
				}else{
					this.page += 1
					this.utilList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:#fff !important;
		// background:#000;
	}
	.box_top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		.search{
			width: 80%;
			height: 60rpx;
			line-height: 60rpx;
			color: #000;
			background-color: #eee;
			overflow:hidden;
			text-align: center;
			border-radius: 40rpx;
			margin: 0 auto;
			// margin-top: 20rpx;
			input{
				width: 100%;
				height: 100%;
			}
		}
		.sub{
			padding: 10rpx 20rpx;
			border-radius: 10rpx;
			color: #FFF;
			background-color: #1989FA;
			font-size: 15px;
		}
	}
	.select_box {
		display: flex;

		.select_item {
			color: #999;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 20rpx;
			display: flex;
			align-items: center;
			font-size: 15px;
		}

		.select_active {
			color: #aaa;
		}

		.icon {
			margin-left: 8rpx;

			.util {
				width: 18rpx;
				height: 18rpx;
				display: flex;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.contain {
		padding: 0 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			width: 49%;
			border-radius: 16rpx;
			box-shadow: 0 0 10px #ccc;
			overflow: hidden;
			margin: 10rpx 0;
			.img {
				width: 100%;
				height: 360rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.last {
				padding: 20rpx 10rpx 0;
				background: #FFF;
				border-radius:0 0 16rpx 16rpx;

				.name {
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.number {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 22rpx;
					margin: 20rpx 0;
					padding-bottom:14rpx;
				
					.numText {
						display: flex;
						align-items: center;
						border-radius: 5rpx;
						background: rgba(0, 0, 0, .2);
						color: #000;
						padding-right: 20rpx;
						margin-right: 15rpx;
				
						.title {
							background: #000;
							padding: 5rpx 10rpx;
							color: #fff;
							border-radius: 5rpx;
							margin-right: 20rpx;
						}
					}
					.price{
						font-size:15px;
						font-weight:700;
					}
				}
				
			}
		}
	}
</style>
