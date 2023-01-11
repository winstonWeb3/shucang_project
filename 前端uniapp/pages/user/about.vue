<template>
	<view>
		<view class="box">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			text:''	
			}
		},
		onLoad(){
			this.getAbout()
		},
		methods:{
			getAbout(){
				this.$request('post','User/aboutUsColl',{
				}).then(res => {
					console.log(';;',res)
					this.text = res.data[0].text_us
				}).catch(err => {
					console.log('err',err)
				})
			}
		}
	}
</script>

<style lang="scss">
	.box{
	   padding: 20rpx;
	   color: #FFF;
	}
</style>
