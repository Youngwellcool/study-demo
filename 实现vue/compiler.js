class Compiler {
    constructor(vm) {
        this.el = vm.$el;
        this.vm = vm;
        this.compiler(this.el);
    }

    // 编译模板，处理文本节点和元素节点
    compiler(el) {
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)) { // 如果是文本节点
                this.compilerText(node)
            }else if(this.isElementNode(node)) {  // 是元素节点
                this.compilerElement(node)
            }

            // 判断node是否有子节点
            if(node.childNodes && node.childNodes.length) {
                this.compiler(node)
            }
        })
    }

    // 编译元素节点，处理指令
    compilerElement(node) {
        console.dir(node.attributes)
        // 1、遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            if(this.isDirective(attr.name)) {
                console.log(attr.value)
                node.textContent = this.vm[attr.value]
            }
        })
        // 2、判断是否是指令
    }

    // 编译文本节点，处理插值表达式
    compilerText(node) {

        // {{ msg }}
        let reg = /\{\{(.+?)\}\}/; // 匹配插值表达式正则
        let value = node.textContent;  // {{ msg }}
        if(reg.test(value)) {
            let key = RegExp.$1.trim(); // msg
            console.log(key)
            // TODO 注意：这里一定要用replace方法将this.vm[key]的值替换{{ msg }}，而不是将node.textContent = this.vm[key]赋值，因为有可能node.textContent之前的值为 msg：{{msg}},这样的格式，除了插值表达式之外还有其他字符
            node.textContent = value.replace(reg, this.vm[key]) // 从vm中取出对应属性key的值，替换 {{ msg }}
        }
    }

    // 判断元素属性是否是指令
    isDirective(attrName) {

        return attrName.startsWith('v-')
    }

    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }

    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}