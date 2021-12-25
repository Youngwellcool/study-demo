class Observer {
    constructor(data) {
        this.walk(data)
    }

    walk(data) {
        // 1、判断data是不是对象
        if(!data || typeof data !== 'object') return;
        // 2、遍历data对象中的所有属性
        Object.keys(data).forEach(key => {
            // 3、将data中的所有属性转为getter和setter
            // TODO 注意：此处一定要传第三个参数data[key]
            this.defineReactive(data, key, data[key])
            //4、 TODO 注意：递归调用walk，解决data中的属性值也是对象的情况下，为其对象的属性添加getter和setter
            this.walk(data[key])
        })
    }

    defineReactive(obj, key, value) {
        let that = this;
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                //TODO 注意：get中可以返回obj[key]，也可以返回第三个参数value,为什么没有返回obj[key]，因为取obj[key]就是在调用此get方法，会造成栈溢出。

                // return obj[key]
                return value
            },
            set(val) {
                if(val == value) return;
                value = val;

                // TODO 注意：当给data中的属性赋值为对象时，调用walk，给该对象属性也添加getter和setter
                that.walk(value)
            },
        })
    }
}