import config from './config.js';


function request(type,url, data={},load = true) {
    return new Promise(function(resolve, reject) {
		if(data){
			// var token=uni.getStorageSync('token');
			//  data.token=token;
		}
		if(load){
			uni.showLoading({
				mask:true,
				title:"加载中.."
			})
		}
		// // const system = uni.getSystemInfoSync();
		// //#ifdef APP-PLUS
		// 	// console.log("app")
		// 	url = config.URL + url
		// // #endif 
		// // #ifdef H5
		// 	// console.log("h5")
		// 	// window.location.host
		// 	url ='/'+url;
		// 	// url = config.URL + url
		// // #endif 
		url = config.URL + url
        uni.request({
            url:url,
			header:{
				'Access-Token': uni.getStorageSync('userinfo').token || '',
				// 'storeId':uni.getStorageSync('userinfo').userId || '',
				'platform':'H5'
			},
            method: type,
			data: data,
            success: function(res) {
                if (res.statusCode === 200) {
					if(res.data.status == 0 || res.data.status==200){
						resolve(res.data)
					}
					else if(res.data.status == 2){
						uni.showToast({
							title:"未登录",
							icon:'none'
						})
						reject(res.data)
					}
					else if (res.data.status == 1) {//没有数据
						uni.showToast({
							title: res.data.data.message,
							icon: "none",
							duration: 2000,
							position:'bottom',												
						})
						 reject(res.data)
					}
					else if (res.data.status == -2) {//没有数据
						// if (window.location.href.indexOf('login/logon') > 0) {
						 
						// } else {
						// 	uni.showToast({
						// 		title: res.data.message,
						// 		icon: "none",
						// 		duration: 2000,
						// 		position:'bottom',												
						// 	})
						// 	// uni.navigateTo({
						// 	// 	url: '/pages/login/login'
						// 	// })
						// }
					} else {
						uni.showToast({
							title: res.data.data.message,
							icon: "none",
							duration: 2000,
							position:'bottom',												
						})
						reject(res.data)
					}											
                } else {
                  switch (res.statusCode) {
                    case 500:
						uni.showToast({
							title: "500:服务器内部错误",
							icon: "none",
							duration: 2000						
						})
						break;
                    case 404:
						uni.showToast({
							title: "404:网络请求不存在",
							icon: "none",
							duration: 2000
					  						
						})
						break;
					case 403:
					    uni.showToast({
					    	title: "403:网络请求不存在",
					    	icon: "none",
					    	duration: 2000
					    						
					    })
					    break;
						case 401:
						    uni.showToast({
						    	title: "很抱歉，用户信息不存在或已删除",
						    	icon: "none",
						    	duration: 2000					
						    })
						    // break;
                    default:
						uni.showToast({
							title: '服务器繁忙，请稍后再试',
							icon: "none",
							duration: 2000,					
						})
                  }
                  reject(res.data);
                }
            },
            fail: function(err) {
				console.log('errs',err)
				uni.showToast({
					title: "网络超时" + err.message,
					icon: "none",
					duration: 2000,
					position:'bottom',
										
				})
              reject(err.message);
            },
			complete(ret) {
				console.log('kk',ret)
				if(ret.data.status == 401){
					uni.showToast({
						title: ret.data.message,
						icon: "none",
						duration: 2000,
						position:'bottom',
											
					})
					uni.clearStorageSync()
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/login/index'
						})
					},1000)
				}
				setTimeout(()=>{
					uni.hideLoading();
				},500)
			}
        })
    });
}

//封装uploadFile上传文件请求
const sendUploadFile = (url, filePath, name, data) => {
	var token = uni.getStorageSync('userinfo').token || '';
	console.log(token,'正在请求uploadFile上传文件');
	return new Promise(function(resolve, reject) {
		uni.uploadFile({
			url: config.URL + url, //请求接口地址
			filePath: filePath, //文件地址
			name: name,
			formData: data || '' ,
			header: {
				'Access-Token': token
			},
			success(res){
				console.log("请求成功的结果", res.statusCode,res);
				resolve(res);
			},
			fail(err){
				console.log("请求失败的结果", res);
				reject(res);
			}
		})
	})
}

export default request
module.exports.sendUploadFile = sendUploadFile

