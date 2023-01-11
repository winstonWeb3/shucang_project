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
		onLoad(option){
			console.log(option)
			this.text = option.text
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff !important;
	}
	.box{
	   padding: 20rpx;
	   color: #333;
	   text-indent: 2em;
	}
</style>
