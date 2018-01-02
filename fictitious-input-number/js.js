/**
 * Created by Administrator on 2017/12/29.
 */
function FictitiousNumber(ele) {
    this.ele = ele
    
    const body = document.body
    
    // 创建虚拟键盘
    let keyBoard = document.createElement('div')
    keyBoard.id = 'fictitious-keyboard'
    keyBoard.innerHTML = '<p>﹀</p><span>7</span><span class="middle">8</span><span>9</span><span>4</span><span class="middle">5</span><span>6</span><span>1</span><span class="middle">2</span><span>3</span><span class="ot">.</span><span class="middle">0</span><span class="ot">×</span>'
    body.appendChild(keyBoard)
    // 创建光标
    let cursorI = document.createElement('i')
    cursorI.className = 'fictitious-cursor'
    
    // 给非表单元素添加获取焦点事件
    this.ele.setAttribute('tabindex', '1')
    // 获取焦点事件
    this.ele.onfocus = () => {
        this.ele.appendChild(cursorI)
        keyBoard.className = 'show-animation'
    }
    /*this.ele.onblur = () => {
        let cursorI = this.ele.getElementsByClassName('fictitious-cursor')[0]
        this.ele.removeChild(cursorI)
        keyBoard.className = ''
    }*/
    
    //输入
    keyBoard.onclick = (e) => {
        console.log(e.target)
        if(e.target.nodeName == 'P'){
            let cursorI = this.ele.getElementsByClassName('fictitious-cursor')[0]
            this.ele.removeChild(cursorI)
            keyBoard.className = ''
        }else{
            let num = this.keyDown(e.target)
            let newNumber = document.createElement('span')
            newNumber.innerHTML = '1'
            this.ele.insertBefore(newNumber, cursorI)
        }
    }
}
FictitiousNumber.prototype = {
    keyDown: function (target) {
        
    }
}