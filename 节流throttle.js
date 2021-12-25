/*TODO 函数节流：不管事件触发频率有多高，只在单位时间内执行一次。*/

/**
 * 使用定时器 第一次需要等待wait秒后才能执行，最后一次一定触发
 * @param fn
 * @param wait
 * @returns {Function}
 */
function throttle(fn, wait) {
    let timer = null;
    return function (...args) {
        if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}

/**
 * 时间戳版本， 第一次一定触发，最后一次不会触发 （比如说监听 onmousemove，则鼠标停止移动时，立即停止触发事件)
 * @param fn
 * @param wait
 * @returns {Function}
 */
function throttle2(fn, wait) {
    // 记录上一次执行的时间戳
    let previous = 0;
    return function (...args) {
        // 当前时间戳减去上一次执行的时间戳大于设定的时间，就执行
        if(Date.now() - previous > wait) {
            // 更新上一次执行时间戳为当前时间戳
            previous = Date.now();
            fn.apply(this, args)
        }
    }
}

/**
 * 两者结合可以实现，第一次事件会触发，最后一次事件也会触发
 * @param fn
 * @param wait
 * @returns {Function}
 */
function throttle3(fn, wait) {
    let previous = 0;
    let timer = null;
    return function (...args) {
        if(Date.now() - previous > wait) {
            clearTimeout(timer)
            timer = null;
            previous = Date.now();
            fn.apply(this, args)
        }else if(!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, args)
            }, wait)
        }
    }
}


/*
* 调用
*  如果被执行的函数需要参数时，这样传参
* */

function fun(options) {
    console.log(options)
}

document.getElementById('id').addEventListener('scroll', throttle3(function () {
    fun(123)
}, 1000))