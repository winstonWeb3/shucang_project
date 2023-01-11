<template>
	<view>
		<view class="title">{{detail.title}}</view>
		<view class="flex-space">
			<view>{{detail.show_views}}{{txt}}</view>
		</view>
		<rich-text :nodes="detail.content"></rich-text>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default{
		data(){
			return{
				detail:'',
				txt:''
			}
		},
		methods:{
			getDetail(id){
				this.$request('get', 'article/detail',{'articleId':id}).then(res => {
					console.log('res', res)
					res.data.detail.content = tool.formatRichText(res.data.detail.content)
					this.detail = res.data.detail
					this.txt = '次浏览'
				}).catch(err => {
					console.log('err', err)
				})
			}
		},
		onLoad(options){
			const id = options.id
			this.getDetail(id)
		}
	}
</script>

<style style="scss" scoped>
	page{
		background-color: #FFF;
		color: #333;
		padding: 22rpx;
	}
	.title{
		font-size: 17px;
		font-weight: 700;
	}
	.flex-space{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
	}
</style>
