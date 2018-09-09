export function debounce(func, delay) {
  let timer

  return function(...args) { // 返回一个闭包，这里的args是使用闭包时传入的参数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
