// 防抖
export function debouce(callback, delay) {
  let timer = null; // 作用防止请求堆积
  return function () {
    clearTimeout(timer); // 在每次请求之前，先清空一下定时器，确保只发送最后一次请求
    timer = setTimeout(() => {
      /* 之所以修改this指向，是因为我们产生了闭包，
            this指向现在为undefined，所以要修改this指向 */
      callback.call(this, arguments);
      // callback.bind(this, arguments)();
    //   callback.apply(this, [arguments]);
    }, delay);
  };
}

// 节流
export function throttle(callback, wait) {
  // 上一次点击的时间
  let lastTime = 0;
  return function () {
    // 如果不return的话会立即执行，return的话就是点击才会调用此方法
    // 获取当前点击的时间
    let nowTime = new Date().getTime();
    // 判断当前点击的时间 - 上一次点击的时间  是否  大于1秒
    if (nowTime - lastTime > wait) {
      callback.call(this, arguments);
      // callback.bind(this, arguments)();
      // callback.apply(this, [arguments]);
      // 把当前点击的时候  赋值给上一次的时间
      lastTime = nowTime;
    }
  };
}
