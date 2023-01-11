<template>
	<view class="content">
		<view style="position: fixed;top: -999px;left: 0;">
			<uqrcode ref="uqrcode" ></uqrcode>
		</view>
		<view v-if="show">
			<canvas style="position: fixed;top: -999px;left: 0;" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"
			 canvas-id="myCanvas" id="myCanvas"></canvas>
		</view>
		<image v-if="img != ''" style="width: 100%;" :style="{height: canvasH  + 'px'}" :src="img" mode=""></image>
	</view>
</template>

<script>
	// import {site} from '../../api/mySelf.js'
	import uQRCode from '../../uni_modules/Sansnn-uQRCode/js_sdk/u-qrcode';
	export default {
		data() {
			return {
				title: '邀请好友',
				isback: true,
				background: '#FFF',
				txtColor: '#A4A4A4',
				backColor: '',
				canvasW: 0, // 画布宽
				canvasH: 0, // 画布高
				SystemInfo: {}, // 设备信息
				goodsImg: {}, // 商品主图
				ewmImg: {}, // 二维码图片
				otherImg: {},
				ewmW: 120, // 二维码大小
				show: true,
				img: '',
				url:'',
				list: '',
				urcode:'',
				tip:false
			}
		},
		async onLoad() {
			let that = this
			await that.$request('get', 'user/poster', {
			}).then(res => {
				console.log('res', res)
				that.goodsImg = res.data.values.file_path
			}).catch(err => {
				console.log('err', err)
			})
			// that.goodsImg =
			// 	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13095219924%2F641.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632382809&t=0dcf193e2a1651c72dd95945459c1bf4'		
		},
		async onReady() {
			let that = this
				that.$refs
					.uqrcode
					.make({
						size: 354,
						text: that.$config.inviteUrl + '?code=' + uni.getStorageSync('userinfo').userId
					})
					.then(res => {
						// 返回的res与uni.canvasToTempFilePath返回一致
						console.log(res,'res')
						that.urcode = res.tempFilePath
					})
			// })
			
			// 获取设备信息，主要获取宽度，赋值给canvasW 也就是宽度：100%
			that.SystemInfo = await that.getSystemInfo();
			// 获取商品主图，二维码信息，APP端会返回图片的本地路径（H5端只能返回原路径）
			// that.goodsImg = await that.getImageInfo('http://hjccloud.cn/h5/uploads/20201225142312e197f2881.jpg');
			// that.ewmImg = await that.getImageInfo('http://hjccloud.cn/h5/uploads/20201225142312e197f2881.jpg');
			// that.otherImg = await that.getImageInfo(that.list.logo);
			console.log('ssa', that.otherImg)
			that.canvasW = that.SystemInfo.windowWidth; // 画布宽度
			that.canvasH = that.SystemInfo.windowHeight - 44; // 画布高度 = 主图高度+二维码高度 + 文字图片的间距（大概50）

			// 如果主图，二维码图片，设备信息都获取成功，开始绘制海报，这里需要用setTimeout延时绘制，否则可能会出现图片不显示。
			// if(that.goodsImg.errMsg == 'getImageInfo:ok' && that.ewmImg.errMsg == 'getImageInfo:ok' && that.otherImg.errMsg == 'getImageInfo:ok' && that.SystemInfo.errMsg == 'getSystemInfo:ok'){
			console.log('ok')
			uni.showToast({
				icon: 'loading',
				mask: true,
				duration: 10000,
				title: '海报绘制中',
			});
			setTimeout(() => {
				var ctx = uni.createCanvasContext('myCanvas', that);
				// 填充背景色，白色
				ctx.setFillStyle('#fff'); // 默认白色
				ctx.fillRect(0, 0, that.canvasW, that.canvasH) // fillRect(x,y,宽度，高度)
                 
				 
				// 绘制商品主图，二维码
				ctx.drawImage(that.goodsImg, 0, 0, that.canvasW, that.canvasH) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度)
				ctx.drawImage(that.urcode, that.canvasW - 260, that.canvasH - 220, that.ewmW, that.ewmW) // drawImage(图片路径,x,y,绘制图像的宽度，绘制图像的高度,二维码的宽,高)
				// ctx.drawImage(that.otherImg, 40, 40, 70, 70)
				// 3、绘制商品标题，多余文字自动换行
                
				
				
				/* str 这段代码是我百度找的，参考别人的。canvas不能自动换行，需要自行计算 */
				let _strlineW = 0;
				let _strLastIndex = 0; //每次开始截取的字符串的索引
				let _strHeight = that.canvasW + 30; //绘制字体距离canvas顶部的初始高度
				let _num = 1;

				// 5、邀请信息
				ctx.setFontSize(17)
				ctx.setFillStyle('#FFF')
				ctx.fillText('推荐码: ' + uni.getStorageSync('userinfo').userId,that.canvasW / 2.8 + 10, that.canvasH - 60);
				ctx.fillText('扫一扫，参与精彩', that.canvasW / 2.8, that.canvasH - 30);


				ctx.draw(true, (ret) => { // draw方法 把以上内容画到 canvas 中。
					console.log(ret)
					uni.showToast({
						icon: 'none',
						title: '绘制完成',
					});
					setTimeout(() => { /* 大坑，Android真机上必须setTimeout延时后保存，不然会出错~~~开发者工具上无问题，ios下也无问题 */
						uni.canvasToTempFilePath({ // 保存canvas为图片
							canvasId: 'myCanvas',
							quality: 1,
							fileType: 'jpg',
							success: function(res) {
								// 在H5平台下，tempFilePath 为 base64, // 图片提示跨域 H5保存base64失败，APP端正常输出临时路径
								console.log('res', res)
								that.show = false
								that.img = res.tempFilePath
							},
							fail: function(errInfo) {
								alert('no', errInfo)
							}
						})
					}, 500)

				})
			}, 500)
			// }else{
			// 	console.log('err')
			// }
		},
		methods: {
			// 获取图片信息
			getImageInfo(image) {
				return new Promise((req, rej) => {
					uni.getImageInfo({
						src: image,
						success: function(res) {
							req(res)
						},
					});
				})
			},

			// 获取设备信息
			getSystemInfo() {
				return new Promise((req, rej) => {
					uni.getSystemInfo({
						success: function(res) {
							req(res)
						}
					});
				})
			},
		},
	}
</script>

<style>

</style>
