<template>
  <div class="ul" v-show="visible" :style="ulStyle" @contextmenu.stop.prevent>
    <div class="li" v-for="(menu, index) in menus" @click="clickMenu(menu, index)">
      <span class="fl" v-text="menu.label"></span>
      <span class="fr explain" v-if="menu.explain" v-text="menu.explain"></span>
    </div>
  </div>
</template>

<script>
/**
 * @template menuContext 
 *   @prop {Array} menus 菜单列表 必传
 *    menus: {
 *      label: '编辑',
 *      key: 'edit',
 *      explain: 'ctrl+e' //选填
 *    }
 *   @prop {Object} event 点击event对象 必传
 *   @prop {All} argument 需要携带的参数 选传
 *   @event clickMenu 
 *    @param {String} key 对应项的 key
 *    @param {Object} menu 对应项数据
 *    @param {All} data argument
 *   @description 使用方式：
 *       <menu-context :menus="menus" :event="event" @clickMenu="clickMenu"></menu-context>
 * 
 * @method show 
 *  @desc 显示弹框
 * 
 * @method hide 
 *  @desc 隐藏弹框
 * 
 * @method clickMenu
 *   @param {Object} menu 点击项对应的menu
 *   @returns {Null}
 *   @desc 触发点击事件
 */
export default {
  name: 'menuContext',
  props: {
    menus: {
      type: Array,
      required: true,
    },
    event: {
      type: MouseEvent,
      required: true,
    },
    argument: {
      default: null
    },
  },
  data() {
    return {
      visible: false,
      ulStyle: {
        top: 0,
        left: 0
      }
    }
  },
  watch:{
    event(){
      this.ulStyle = {
        top: this.event.clientY + 'px',
        left: this.event.clientX + 'px'
      }
    }
  },
  created() {
    document.removeEventListener('click', ()=>{})
    document.addEventListener('click', ()=> {
      this.hide()
    })
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    clickMenu(menu, index) {
      if (menu.key && menu.metkeyhod !== '') {
        this.$emit('clickMenu', menu.key, menu, this.argument)
      }else{
        console.error('---- menuContext error: menu.key is not defind!');
        console.warn('请传入"' + menu.label + '"对应的 key 值!');
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.ul {
  position: fixed;
  z-index: 10001;
  width: 160px;
  padding: 4px 0;
  background: #faf9fb;
  border-radius: 4px;
  font-size: 14px;
  letter-spacing: 3px;
  box-shadow: 0 0 2px 1px rgba(22,22,22,.2);
  .li {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    overflow: hidden;
    &:hover {
      background: #caccce;
    }
    .explain {
      font-size: 12px;
      color: #666;
      letter-spacing: 0;
    }
  }
}
</style>