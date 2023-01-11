/**
 * 显示消息提示
 * @param {*} title 标题
 * @param {*} duration 持续时间
 * @param {*} callBack 回调
 * @param {*} icon 图标
 */
export const showToast = (title, duration = 2000, callBack, icon = 'none', mask = false) => {
  uni.showToast({
    title,
    duration,
    icon,
    success: () => {
      setTimeout(() => {
        callBack && callBack();
      }, duration);
    },
    mask,
  });
};

/**
 * 时间戳转日期
 * @param {*} 
 * @param {*} 
 * @param {*}
 * @param {*}
 */
export const utilTime = (num) => {
  // 时间戳转换成 “yyyy-MM-dd hh:mm:ss”格式
  let date = new Date(num * 1000);
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //年
  let year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month; //月补0
  //日
  let day = date.getDate();
  day = day < 10 ? ('0' + day) : day; //天补0
  //时
  let hours = date.getHours();
  hours = hours < 10 ? ('0' + hours) : hours; //小时补0
  // 分
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? ('0' + minutes) : minutes; //分钟补0
  // 秒
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? ('0' + seconds) : seconds; //秒补0
  // 星期
  const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  let weekDay = weekArr[date.getDay()];
  let weekNum = date.getDay();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
};

export const utilDate = (num) => {
  // 时间戳转换成 “yyyy-MM-dd”格式
  let date = new Date(num * 1000);
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //年
  let year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month; //月补0
  //日
  let day = date.getDate();
  day = day < 10 ? ('0' + day) : day; //天补0
  //时
  let hours = date.getHours();
  hours = hours < 10 ? ('0' + hours) : hours; //小时补0
  // 分
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? ('0' + minutes) : minutes; //分钟补0
  // 秒
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? ('0' + seconds) : seconds; //秒补0
  // 星期
  const weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  let weekDay = weekArr[date.getDay()];
  let weekNum = date.getDay();
  return `${year}-${month}-${day}`
};
export const utilCountDown = (num) => {
  // 时间戳转换成 “hh:mm:ss”格式
  let date = new Date(num * 1000);
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //年
  let year = date.getFullYear();
  // 月
  let month = date.getMonth() + 1;
  month = month < 10 ? ('0' + month) : month; //月补0
  //日
  let day = date.getDate();
  day = day < 10 ? ('0' + day) : day; //天补0
  //时
  let hours = date.getHours();
  hours = hours < 10 ? ('0' + hours) : hours; //小时补0
  // 分
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? ('0' + minutes) : minutes; //分钟补0
  // 秒
  let seconds = date.getSeconds();
  seconds = seconds < 10 ? ('0' + seconds) : seconds; //秒补0
  return `${hours}:${minutes}:${seconds}`
};