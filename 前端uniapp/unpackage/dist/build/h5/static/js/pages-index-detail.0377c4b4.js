(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-detail"],{"08ce":function(t,e,a){"use strict";var i=a("5bc2"),n=a.n(i);n.a},"155b":function(t,e,a){"use strict";var i=a("4ea4");a("99af"),a("d81d"),a("d3b7"),a("e25e"),a("ac1f"),a("25f0"),a("4d90"),a("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var n=i(a("1da1")),o=(i(a("9d36")),i(a("6f66"))),r=a("5888"),s=r.utils.AbiCoder,d=/^(41)/,c={data:function(){return{detailImg:a("6759"),storyImg:a("d209"),noticeText:"数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。",detailList:{},detailType:!0,payType:!1,payArr:[{name:"微信",image:"/static/wechat.png"},{name:"支付宝",image:"/static/zfb.png"}],payIndex:0,showIcon:!1,startTime:"",timer:null,userinfo:"",timeOut:"",code:"",collId:null}},onLoad:function(t){var e=this;return(0,n.default)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log(t),2==t.type?(e.type=2,e.showIcon=!0,e.$request("get","order/details",{transactionId:t.id}).then((function(t){console.log("res",t),t.data.content=o.default.formatRichText(t.data.content),e.detailList=t.data})).catch((function(t){console.log("err",t)}))):(e.getDetailList(t.id),1==t.type&&(e.detailType=!1)),t.collId&&(e.collId=t.collId),e.userinfo=uni.getStorageSync("userinfo"),a.next=6,e.enCode();case 6:e.code=a.sent,console.log("as",e.code);case 8:case"end":return a.stop()}}),a)})))()},methods:{getDetailList:function(t){var e=this;this.$request("get","Goods/goodsDetails",{goodsid:t}).then((function(t){console.log("res",t),t.data.goodsdetails.content=o.default.formatRichText(t.data.goodsdetails.content),e.detailList=t.data.goodsdetails;var a=new Date(t.data.goodsdetails.startTime.replace(/-/g,"/")).getTime(),i=(new Date).getTime();if(i>a)return e.showIcon=!0;console.log("ppp",a,a-i),e.timer=setInterval((function(){var t=(new Date).getTime(),i=a-t;e.showIcon=!1,i-1>1?(i-=1,e.startTime=e.formateSeconds(i)):(e.showIcon=!0,clearInterval(e.timer))}),1e3)})).catch((function(t){console.log("err",t)}))},login:function(){uni.navigateTo({url:"/pages/login/index"})},enCode:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var a,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(t.getRandomSixDigit()).concat(uni.getStorageSync("userinfo").userId),t.timeOut=a,console.log("asd",a),i=[{type:"address",value:uni.getStorageSync("userinfo").address},{type:"uint256",value:a},{type:"string",value:"'ipfs://QmWyB4dGanAS3ckMwF5GTJGUs9ipNUjRNaDSsavJ4BnEmE'"}],console.log("inputs",i),e.next=7,t.encodeParams(i);case 7:return n=e.sent,console.log("parameters",n),e.abrupt("return",n);case 10:case"end":return e.stop()}}),e)})))()},encodeParams:function(t){return(0,n.default)(regeneratorRuntime.mark((function e(){var a,i,n,o,r,c,l,u,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t,i="",0!=a.length){e.next=4;break}return e.abrupt("return",i);case 4:for(n=new s,o=[],r=[],c=0;c<a.length;c++)l=a[c],u=l.type,f=l.value,"address"==u?f=f.replace(d,"0x"):"address[]"==u&&(f=f.map((function(t){return toHex(t).replace(d,"0x")}))),o.push(u),r.push(f);console.log(o,r);try{i=n.encode(o,r).replace(/^(0x)/,"")}catch(g){console.log("ex",g)}return e.abrupt("return",i);case 11:case"end":return e.stop()}}),e)})))()},getRandomSixDigit:function(){for(var t="",e=0;e<5;e++)t+=parseInt(10*Math.random());return t},submit:function(){var t=this;if(this.payType=!1,2==this.type){var e=0==this.payIndex?20:30;uni.request({url:"".concat(this.$config.URL,"checkout/buy"),header:{"Access-Token":uni.getStorageSync("userinfo").token||"",platform:"H5"},method:"POST",data:{transactionId:this.detailList.transaction_id,payType:e},success:function(a){if(500==a.data.status)return t.$showToast(a.data.message);console.log(a.data),10==e?(console.log(a),location.href=a.data.data.url):(document.querySelector("body").innerHTML=a.data,document.forms[0].submit())}})}else 0==this.payIndex?uni.request({url:"".concat(this.$config.URL,"Checkout/pay"),header:{"Access-Token":uni.getStorageSync("userinfo").token||"",platform:"H5"},method:"POST",data:{userid:uni.getStorageSync("userinfo").userId,goodsid:this.detailList.goods_id,pay_type:20,isBox:0},success:function(e){if(500==e.data.status)return t.$showToast(e.data.message);console.log(e),location.href=e.data.data.url}}):1==this.payIndex&&uni.request({url:"".concat(this.$config.URL,"Checkout/orders"),header:{"Access-Token":uni.getStorageSync("userinfo").token||"",platform:"H5"},method:"POST",data:{goodsid:this.detailList.goods_id,userid:uni.getStorageSync("userinfo").userId,isBox:0,pay_type:30},success:function(e){if(500==e.data.status)return t.$showToast(e.data.message);document.querySelector("body").innerHTML=e.data,document.forms[0].submit()}})},changeType:function(t){this.payIndex=t},buy:function(t){if(!this.userinfo.idcar)return this.$showToast("请完成实名认证");this.payType=!0},formateSeconds:function(t){var e=parseInt(t/1e3),a=0,i=0,n="";return e>60&&(a=parseInt(e/60),e=parseInt(e%60),a>60&&(i=parseInt(a/60),a=parseInt(a%60))),n="".concat(i.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"),":").concat(e.toString().padStart(2,"0")),n}},onUnload:function(){clearInterval(this.timer)}};e.default=c},"2bf1":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"detail"},[i("v-uni-view",{staticClass:"header"},[i("v-uni-view",{staticClass:"media"},[i("v-uni-view",{staticClass:"media-img-wrapper"},[i("v-uni-image",{attrs:{src:t.detailList.file_path,mode:"widthFix"}})],1)],1),i("v-uni-view",{staticClass:"last"},[i("v-uni-view",{staticClass:"last-img"},[i("v-uni-view",{staticClass:"share"},[i("v-uni-image",{attrs:{src:a("cabc"),mode:""}})],1)],1)],1),i("v-uni-view",{staticClass:"newTxt"},[t.detailType?i("v-uni-view",[i("v-uni-view",{staticClass:"txt"},[t._v(t._s(t.detailList.goods_name))]),i("v-uni-view",{staticClass:"center"},[i("v-uni-view",{staticClass:"xianliang"},[t._v("限量"+t._s(t.detailList.stock_total)+"份")])],1),i("v-uni-view",{staticClass:"last_title"},[t._v("温馨提示: 购买即可体验内容")])],1):i("v-uni-view",{staticClass:"MyId"},[t._v(t._s(t.collId))])],1)],1),i("v-uni-view",{staticStyle:{padding:"0 20rpx","box-sizing":"border-box"}},[i("v-uni-view",{staticClass:"story-title"},[t._v("作品故事")]),i("v-uni-view",{staticClass:"story"},[i("v-uni-view",{staticClass:"story-content"},[i("v-uni-rich-text",{attrs:{nodes:t.detailList.content}})],1)],1),i("v-uni-view",{staticClass:"story-title"},[t._v("藏品信息")]),i("v-uni-view",{staticClass:"author"},[i("v-uni-view",{staticClass:"nex"},[i("v-uni-view",{staticStyle:{color:"#333"}},[t._v("创造者:")]),i("v-uni-view",{staticStyle:{color:"#9B9B9B","text-align":"right"}},[t._v(t._s(t.detailList.author))])],1),i("v-uni-view",{staticClass:"nex"},[i("v-uni-view",{staticStyle:{color:"#333"}},[t._v("合约地址:")]),i("v-uni-view",{staticClass:"nex-address",staticStyle:{color:"#9B9B9B"}},[t._v(t._s(t.detailList.goods_address))])],1),i("v-uni-view",{staticClass:"nex"},[i("v-uni-view",{staticStyle:{color:"#333"}},[t._v("链上标识:")]),i("v-uni-view",{staticClass:"nex-address",staticStyle:{color:"#9B9B9B"}},[t._v(t._s(t.detailList.logo))])],1),i("v-uni-view",{staticClass:"nex"},[i("v-uni-view",{staticStyle:{color:"#333"}},[t._v("发行时间:")]),i("v-uni-view",{staticStyle:{color:"#9B9B9B"}},[t._v(t._s(t.detailList.startTime))])],1)],1),t.detailType?i("v-uni-view",{staticClass:"notice"},[i("v-uni-view",{staticClass:"notice-content"},[t._v(t._s(t.noticeText))])],1):t._e()],1),t.detailType?i("v-uni-view",{staticClass:"submit"},[2!=t.type?i("v-uni-view",{staticClass:"sub-price"},[t._v(t._s(t.detailList.goods_price_min))]):i("v-uni-view",{staticClass:"sub-price"},[t._v(t._s(t.detailList.price))]),t.userinfo.userId?[t.showIcon&&t.detailList.stock_num>0?i("v-uni-view",{staticClass:"sub-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.buy(t.detailList.goods_id)}}},[t._v("立即购买")]):t._e(),t.showIcon&&0==t.detailList.stock_num?i("v-uni-view",{staticClass:"sub-btn"},[t._v("已售罄")]):t._e(),t.showIcon?t._e():i("v-uni-view",{staticClass:"sub-btn timeIcon"},[i("v-uni-view",{staticClass:"icon"},[i("v-uni-image",{attrs:{src:a("accb"),mode:""}})],1),i("v-uni-view",[t._v(t._s(t.startTime))])],1)]:[i("v-uni-view",{staticClass:"sub-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.login.apply(void 0,arguments)}}},[t._v("暂未登录")])]],2):t._e(),t.payType?i("v-uni-view",{staticClass:"back",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.payType=!1}}},[i("v-uni-view",{staticClass:"change",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e)}}},[i("v-uni-view",{staticClass:"title"},[t._v("选择支付方式")]),t._l(t.payArr,(function(e,a){return i("v-uni-view",{key:a,staticClass:"item",class:a==t.payIndex?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeType(a)}}},[i("v-uni-view",{staticClass:"img"},[i("v-uni-image",{attrs:{src:e.image,mode:""}})],1),i("v-uni-view",[t._v(t._s(e.name))])],1)})),i("v-uni-view",{staticClass:"yes",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("确定")])],2)],1):t._e(),i("v-uni-form",{attrs:{id:"alipaysubmit",name:"alipaysubmit",action:"支付宝地址",method:"POST"}})],1)},o=[]},"533b":function(t,e,a){"use strict";a.r(e);var i=a("2bf1"),n=a("78e4");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("08ce");var r,s=a("f0c5"),d=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"252974cf",null,!1,i["a"],r);e["default"]=d.exports},"5bc2":function(t,e,a){var i=a("d419");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("f63b150e",i,!0,{sourceMap:!1,shadowMode:!1})},"78e4":function(t,e,a){"use strict";a.r(e);var i=a("155b"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},cabc:function(t,e){t.exports="data:image/png;base64,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"},d419:function(t,e,a){var i=a("24fb"),n=a("1de5"),o=a("1652"),r=a("079d");e=i(!1);var s=n(o),d=n(r);e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-252974cf]{background-color:#fff}.detail[data-v-252974cf]{width:100%;padding:0 0 %?120?%;box-sizing:border-box}.detail .header[data-v-252974cf]{height:680px;position:relative;background-color:#fff}.detail .header .last[data-v-252974cf]{width:%?632?%;height:%?382?%;margin:0 auto;box-sizing:border-box;position:absolute;bottom:%?60?%;left:calc(50% - %?310?%)}.detail .header .last .last-img[data-v-252974cf]{width:100%;height:100%;background-image:url('+s+');background-position:50%;background-size:cover;position:relative;padding:%?160?% %?20?% 0;box-sizing:border-box}.detail .header .last .last-img .share[data-v-252974cf]{position:absolute;left:calc(50% - %?30?%);top:-8%;bottom:%?368?%;width:%?60?%;height:%?60?%}.detail .header .last .last-img .share uni-image[data-v-252974cf]{width:100%;height:100%}.detail .header .last .last-img .flex-center[data-v-252974cf]{display:flex;justify-content:center;align-items:center}.detail .header .last .last-img .flex-center .flex-fixed[data-v-252974cf]{width:%?36?%;height:%?30?%}.detail .header .last .last-img .flex-center .flex-fixed uni-image[data-v-252974cf]{width:100%;height:100%}.detail .header .last .last-img .flex-center .title[data-v-252974cf]{color:#fff;padding:0 %?20?%;font-size:15px;font-weight:700}.detail .header .last .last-img .assets[data-v-252974cf]{display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;margin-top:%?10?%}.detail .header .last .last-img .assets uni-text[data-v-252974cf]:nth-child(1){color:#999;margin-right:%?20?%}.detail .header .newTxt[data-v-252974cf]{width:90%;position:absolute;bottom:%?60?%;background-color:#1b1714;border:%?4?% solid #be9d8a;left:calc(5% - %?8?%);border-radius:%?12?%;padding:%?10?%}.detail .header .newTxt .MyId[data-v-252974cf]{color:#fff;text-align:center;font-weight:700;padding:%?20?% 0;letter-spacing:2px}.detail .header .newTxt .txt[data-v-252974cf]{color:#fff;text-align:center;font-size:20px;margin-top:%?10?%}.detail .header .newTxt .center[data-v-252974cf]{display:flex;justify-content:center;margin-bottom:%?20?%}.detail .header .newTxt .center .xianliang[data-v-252974cf]{background-color:#faceb6;color:#000;border-radius:%?30?%;padding:%?4?% %?14?%;margin:0 auto;display:inline-block;font-size:15px;margin-top:%?20?%}.detail .header .newTxt .last_title[data-v-252974cf]{position:relative;color:#615752;text-align:center;font-size:13px}.detail .header .newTxt .last_title[data-v-252974cf]:before{left:44px;content:"";width:55px;height:%?2?%;background-color:#615752;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.detail .header .newTxt .last_title[data-v-252974cf]:after{right:44px;content:"";width:55px;height:%?2?%;background-color:#615752;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.detail .header .media[data-v-252974cf]{position:absolute;top:36%;left:50%;-webkit-transform:translate(-50%,-50%)!important;transform:translate(-50%,-50%)!important;z-index:2}.detail .header .media .media-img-wrapper[data-v-252974cf]{width:%?400?%;height:%?400?%;border-radius:%?30?%;overflow:hidden}.detail .header .media .media-img-wrapper uni-image[data-v-252974cf]{width:100%}.detail .detail-image[data-v-252974cf]{width:100%;text-align:center;-webkit-transform:translateZ(0);transform:translateZ(0)}.detail .detail-image .detail-img[data-v-252974cf]{width:70%;-webkit-animation:detail-data-v-252974cf 20s infinite;animation:detail-data-v-252974cf 20s infinite;-webkit-transform:translateZ(%?2?%);transform:translateZ(%?2?%)}.detail .exhibition[data-v-252974cf]{width:100%;padding:%?100?% 0 %?100?%;background:url('+d+') no-repeat;background-size:100% 100%;font-size:%?45?%;color:#fff;text-align:center}.detail .exhibition .titleTop[data-v-252974cf]{margin-top:%?50?%;font-weight:700}.detail .exhibition .number[data-v-252974cf]{display:flex;align-items:center;justify-content:center;font-size:%?28?%;margin:%?20?% 0}.detail .exhibition .number .numText[data-v-252974cf]{display:flex;align-items:center;border-radius:%?5?%;background:#4b4b4c;color:#f3e0bc;padding-right:%?20?%;margin-right:%?15?%}.detail .exhibition .number .numText .title[data-v-252974cf]{background:#f3e0bc;padding:%?5?% %?10?%;color:#000;border-radius:%?5?%;margin-right:%?20?%}.detail .story-title[data-v-252974cf]{font-size:17px;font-weight:700;margin-top:%?20?%}.detail .story[data-v-252974cf]{width:100%;background:#f9f9f9;border-radius:%?30?%;margin-top:%?20?%;color:#333;padding:%?40?% %?30?%;margin-bottom:%?30?%;box-sizing:border-box}.detail .story .story-content-img[data-v-252974cf]{width:100%}.detail .story .story-author[data-v-252974cf]{display:flex;align-items:center;justify-content:space-between;padding:%?30?% %?20?% %?20?%;color:#a3a3a3;font-size:%?35?%}.detail .story .story-author .story-author-text[data-v-252974cf]{color:#fff}.detail .author[data-v-252974cf]{width:100%;background:#f9f9f9;margin-top:%?20?%;border-radius:%?30?%;color:#333;padding:%?40?% %?30?%;margin-bottom:%?30?%;box-sizing:border-box}.detail .author .nex[data-v-252974cf]{display:flex;justify-content:space-between;align-items:center}.detail .author .nex .nex-address[data-v-252974cf]{width:70%;white-space:normal;word-break:break-all;word-wrap:break-word}.detail .author uni-view[data-v-252974cf]{margin-bottom:%?10?%}.detail .last_title[data-v-252974cf]{position:relative;color:#101010;text-align:center}.detail .last_title[data-v-252974cf]:before{left:44px;content:"";width:55px;height:.5px;background-color:#e5e5e5;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.detail .last_title[data-v-252974cf]:after{right:44px;content:"";width:55px;height:.5px;background-color:#e5e5e5;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.detail .notice[data-v-252974cf]{width:100%;background:#fff;border-radius:%?30?%;color:#333;padding:%?40?% %?30?%;margin-bottom:%?30?%;box-sizing:border-box;margin-top:%?20?%}.detail .notice .notice-title[data-v-252974cf]{font-size:%?50?%;font-weight:700;margin-bottom:%?20?%}.detail .notice .notice-content[data-v-252974cf]{color:#9b9b9b;letter-spacing:%?3.5?%}.detail .submit[data-v-252974cf]{position:fixed;bottom:0;left:0;width:100%;display:flex;justify-content:space-between;align-items:center;padding:%?20?% %?30?%;background:#fff;color:#fff;font-size:%?50?%;font-weight:700;box-sizing:border-box;border-top:%?2?% solid #f2f2f2}.detail .submit .sub-price[data-v-252974cf]{letter-spacing:%?5?%;color:#007aff;margin-left:%?50?%}.detail .submit .sub-btn[data-v-252974cf]{font-size:%?30?%;background:#007aff;color:#fff;border-radius:%?50?%;padding:%?20?% %?60?%;text-align:center}.detail .submit .timeIcon[data-v-252974cf]{display:flex;align-items:center}.detail .submit .timeIcon .icon[data-v-252974cf]{width:%?36?%;height:%?36?%;margin-right:%?6?%}.detail .submit .timeIcon .icon uni-image[data-v-252974cf]{width:100%;height:100%}@-webkit-keyframes detail-data-v-252974cf{0%{-webkit-transform:rotateY(0);transform:rotateY(0)}50%{-webkit-transform:rotateY(1turn);transform:rotateY(1turn)}100%{-webkit-transform:rotateY(0);transform:rotateY(0)}}@keyframes detail-data-v-252974cf{0%{-webkit-transform:rotateY(0);transform:rotateY(0)}50%{-webkit-transform:rotateY(1turn);transform:rotateY(1turn)}100%{-webkit-transform:rotateY(0);transform:rotateY(0)}}.back[data-v-252974cf]{width:100%;height:100%;background-color:rgba(0,0,0,.5);position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;z-index:999}.back .change[data-v-252974cf]{width:86%;padding:%?30?%;background-color:#fff;border-radius:%?30?%;box-sizing:border-box}.back .change .title[data-v-252974cf]{text-align:center}.back .change .item[data-v-252974cf]{display:flex;align-items:center;margin-top:%?30?%;padding:%?10?%}.back .change .item .img[data-v-252974cf]{width:%?64?%;height:%?64?%;margin-right:%?20?%}.back .change .item .img uni-image[data-v-252974cf]{width:100%;height:100%}.back .change .active[data-v-252974cf]{border:%?4?% dashed #f3e0bc;box-sizing:border-box}.back .yes[data-v-252974cf]{width:80%;height:%?70?%;line-height:%?70?%;text-align:center;background-color:#f3e0bc;color:#000;margin:0 auto;margin-top:%?40?%;border-radius:%?34?%}body.?%PAGE?%[data-v-252974cf]{background-color:#fff}',""]),t.exports=e}}]);