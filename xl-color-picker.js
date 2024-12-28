//  循环队列存储历史颜色
class ColorCircularQueue {
    /**
     * 构造函数，初始化
     * @param {*} k 队列容量
     */
    constructor(k) {
      // 容量
      this.capacity = k
      // 存储数据的数组
      this.elements = new Array(k)
      // 队尾指针
      this.rear = -1
      // 队首指针
      this.front = 0
      // 记录队列中元素的数量
      this.count = 0
    }
  
    /**
     * 插入元素
     * @param {*} value 插入值
     */
    enQueue(value) {
      if (this.count === this.capacity) {
        // 队列已满，移除第一个元素
        this.front = (this.front + 1) % this.capacity
      } else {
        // 增加计数
        this.count++
      }
      // 插入新元素到数组末尾
      this.rear = (this.rear + 1) % this.capacity
      this.elements[this.rear] = value
    }
  
    // 移除队首元素
    deQueue() {
      if (this.isEmpty()) {
        return false
      }
      // 将 front 移动到下一个元素
      this.front = (this.front + 1) % this.capacity
      // 减少计数
      this.count--
      return true
    }
  
    // 获取队首元素
    Front() {
      if (this.isEmpty()) {
        return -1
      }
      return this.elements[this.front]
    }
  
    // 获取队尾元素
    Rear() {
      if (this.isEmpty()) {
        return -1
      }
      return this.elements[this.rear]
    }
  
    /**
     * 判断队列是否为空
     * @returns 布尔值
     */
    isEmpty() {
      return this.count === 0
    }
  
    /**
     * 判断队列是否已满
     * @returns 布尔值
     */
    isFull() {
      return this.count === this.capacity
    }
  
    /**
     * 清除队列
     */
    clear() {
      this.elements = new Array(this.capacity)
      this.front = 0
      this.rear = -1
      this.count = 0
    }
  
    /**
     * 打印队列
     * @returns 直接输出
     */
    print() {
      console.log('队列中元素：')
      if (this.isEmpty()) {
        console.log('队列为空')
        return
      }
      let str = ''
      for (let i = 0; i < this.count; i++) {
        str += this.elements[(this.front + i) % this.capacity] + ' '
      }
      console.log(str)
    }
  
    /**
     * 获取队列
     * @returns 数组格式（当前队列中的所有元素）
     */
    getQueue() {
      let temArray = new Array(this.capacity)
      if (this.isEmpty()) {
        console.log('队列为空')
        return
      }
      for (let i = 0; i < this.count; i++) {
        temArray[i] = this.elements[(this.front + i) % this.capacity]
      }
      return temArray
    }
  }
  
  /**
   * ============================ 颜色格式转换功能 ============================
   * 根据参数将颜色转换为对应的颜色格式（暂时只支持HEX/RGB/RGBA/HSL/HSLA）
   * @param {string} options.color 待转换的颜色值
   * @param {string} options.format 转换颜色的格式
   */
  let colorFormat = function e(e) {
    return new _colorFormat(e)
  }
  let _colorFormat = function (e) {
    var r,
      t = (e && e.color && e.color.replace(/\s/g, '').toLowerCase()) || '#f00',
      n = (e && e.format && e.format.replace(/\s/g, '').toLowerCase()) || 'rgb',
      o = -1 == n.indexOf('rgba') ? 0 : 1,
      e = -1 == n.indexOf('hsla') ? 0 : 1
    if (-1 < t.indexOf('#'))
      'hex' == n
        ? ((r = this.hexToRgb(t)), (r = this.rgbToHex(r)))
        : -1 < n.indexOf('rgb')
        ? (r = this.hexToRgb(t, o))
        : -1 < n.indexOf('hsl') &&
          ((r = this.hexToRgb(t)), (r = this.rgbToHsl(r, e)))
    else if (-1 < t.indexOf('rgb'))
      (r = this.getRgb(t, o)),
        'hex' == n
          ? (r = this.rgbToHex(r))
          : -1 < n.indexOf('hsl') && (r = this.rgbToHsl(r, e))
    else if (-1 < t.indexOf('hsl'))
      (r = this.getHsl(t, e)),
        (r = this.hslToRgb(r, o)),
        'hex' == n
          ? (r = this.rgbToHex(r))
          : -1 < n.indexOf('hsl') && (r = this.rgbToHsl(r, e))
    else {
      for (var s, a = this.defineColor, i = 0, h = a.length; i < h; i++)
        if (t == a[i].name) {
          s = a[i].hex
          break
        }
      if (!(s && 0 < s.length)) return !1
      'hex' == n
        ? ((r = this.hexToRgb(s)), (r = this.rgbToHex(r)))
        : -1 < n.indexOf('rgb')
        ? (r = this.hexToRgb(s, o))
        : -1 < n.indexOf('hsl') &&
          ((r = this.hexToRgb(s)), (r = this.rgbToHsl(r, e)))
    }
    return r
  }
  _colorFormat.prototype = {
    constructor: this,
    defineColor: [
      { name: 'red', hex: '#f00' },
      { name: 'orange', hex: '#ffa500' },
      { name: 'yellow', hex: '#ff0' },
      { name: 'green', hex: '#0f0' },
      { name: 'cyan', hex: '#0ff' },
      { name: 'blue', hex: '#00f' },
      { name: 'violet', hex: '#ee82ee' },
      { name: 'black', hex: '#000' },
      { name: 'white', hex: '#fff' },
    ],
    getRgb: function (e, r) {
      var t = -1 == (e = e.toLowerCase()).indexOf('rgba') ? 0 : 1
      e = (e = t ? e.replace('rgba', '') : e.replace('rgb', ''))
        .replace(/\s/g, '')
        .split(',')
      var n = Number(e[0].slice(1)),
        o = Number(e[1]),
        s = t ? Number(e[2]) : Number(e[2].slice(0, -1)),
        e = !t || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1))
      return {
        r: n,
        g: o,
        b: s,
        o: e,
        complete: r
          ? 'rgba(' + [n, o, s, e].join(',') + ')'
          : 'rgb(' + [n, o, s].join(',') + ')',
      }
    },
    getHsl: function (e, r) {
      var t = -1 == (e = e.toLowerCase()).indexOf('hsla') ? 0 : 1
      e = (e = t ? e.replace('hsla', '') : e.replace('hsl', ''))
        .replace(/\s/g, '')
        .split(',')
      var n = Number(e[0].slice(1)),
        o = parseInt(e[1]),
        s = t ? parseInt(e[2]) : parseInt(e[2].slice(0, -1)),
        e = !t || 1 < Number(e[3].slice(0, -1)) ? 1 : Number(e[3].slice(0, -1))
      return {
        h: n,
        s: o / 100,
        l: s / 100,
        o: e,
        complete: r
          ? 'hsla(' + [n, o, s, e].join(',') + ')'
          : 'hsl(' + [n, o, s].join(',') + ')',
      }
    },
    rgbToHex: function (e) {
      var r = Number(e.r).toString(16),
        t = Number(e.g).toString(16),
        n = Number(e.b).toString(16),
        o = Math.round(255 * e.o).toString(16)
      return (
        r.length < 2 && (r = 0 + r),
        t.length < 2 && (t = 0 + t),
        n.length < 2 && (n = 0 + n),
        o.length < 2 && (o = 0 + o),
        r[0] == r[1] && t[0] == t[1] && n[0] == n[1] && (o[0], o[1]),
        {
          r: r,
          g: t,
          b: n,
          o: o,
          complete: '#' + (r + t + n + (1 == e.o ? '' : o)),
        }
      )
    },
    rgbToHsl: function (e, r) {
      var t,
        n = Number(e.r) / 255,
        o = Number(e.g) / 255,
        s = Number(e.b) / 255,
        a = Number(e.o),
        i = Math.max(n, o, s),
        h = Math.min(n, o, s),
        e = (i + h) / 2
      if (i == h) t = b = 0
      else {
        var l = i - h,
          b = e < 0.5 ? l / (i + h) : l / (2 - i - h)
        switch (i) {
          case n:
            t = (o - s) / l
            break
          case o:
            t = (s - n) / l + 2
            break
          case s:
            t = (n - o) / l + 4
        }
        t = (t *= 60) < 0 ? t + 360 : t
      }
      return {
        h: (t = Math.round(t)),
        s: (b = Math.round(100 * b) + '%'),
        l: (e = Math.round(100 * e) + '%'),
        o: a,
        complete: r
          ? 'hsla(' + [t, b, e, a].join(',') + ')'
          : 'hsl(' + [t, b, e].join(',') + ')',
      }
    },
    hexToRgb: function (e, r) {
      var t,
        n,
        o,
        s,
        a = (e = e.replace('#', '')).split('')
      return (
        3 == e.length
          ? ((t = parseInt(a[0] + a[0], 16)),
            (n = parseInt(a[1] + a[1], 16)),
            (o = parseInt(a[2] + a[2], 16)),
            (s = 1))
          : 4 == e.length
          ? ((t = parseInt(a[0] + a[0], 16)),
            (n = parseInt(a[1] + a[1], 16)),
            (o = parseInt(a[2] + a[2], 16)),
            (s = Math.round((parseInt(a[3] + a[3], 16) / 255) * 100) / 100))
          : 6 == e.length
          ? ((t = parseInt(a[0] + a[1], 16)),
            (n = parseInt(a[2] + a[3], 16)),
            (o = parseInt(a[4] + a[5], 16)),
            (s = 1))
          : 8 == e.length &&
            ((t = parseInt(a[0] + a[1], 16)),
            (n = parseInt(a[2] + a[3], 16)),
            (o = parseInt(a[4] + a[5], 16)),
            (s = Math.round((parseInt(a[6] + a[7], 16) / 255) * 100) / 100)),
        {
          r: t,
          g: n,
          b: o,
          o: s,
          complete: r
            ? 'rgba(' + [t, n, o, s].join(',') + ')'
            : 'rgb(' + [t, n, o].join(',') + ')',
        }
      )
    },
    hslToRgb: function (e, r) {
      var t,
        n,
        o,
        s = Number(e.h),
        a = Number(e.s),
        i = Number(e.l),
        h = Number(e.o)
      return (
        0 == a
          ? (t = n = o = i)
          : ((t = (e = function (e, r, t) {
              return (
                t < 0 && (t += 1),
                1 < t && --t,
                t < 1 / 6
                  ? e + 6 * (r - e) * t
                  : t < 0.5
                  ? r
                  : t < 2 / 3
                  ? e + (r - e) * (2 / 3 - t) * 6
                  : e
              )
            })(
              (a = 2 * i - (i = i < 0.5 ? i * (1 + a) : i + a - i * a)),
              i,
              (s /= 360) + 1 / 3
            )),
            (n = e(a, i, s)),
            (o = e(a, i, s - 1 / 3))),
        {
          r: (t = Math.round(255 * t)),
          g: (n = Math.round(255 * n)),
          b: (o = Math.round(255 * o)),
          o: h,
          complete: r
            ? 'rgba(' + [t, n, o, h].join(',') + ')'
            : 'rgb(' + [t, n, o].join(',') + ')',
        }
      )
    },
  }
  
  // =================================================================
  
  // 初始化参数
  let option = {
    // parentDOM: document.body,  // 对于vue组件（避免在html中重复添加多个取色器）
  
    isShow: false, // 是否显示取色器
    canMove: true, // 是否可以拖拽取色器
    isDragging: false, // 是否正在拖拽
    startX: 0, // 鼠标按下时的X坐标
    startY: 0, // 鼠标按下时的Y坐标
  
    id: '', // 传入的DOM  id
    ele: null, // id对应的DOM对象
    eleWidth: 20, // 对应DOM的宽度
    eleHeight: 20, // 对应DOM的高度
    eleColor: '#46be69', // 对应DOM的颜色
  
    pickerWidth: 280, // 颜色选择器宽度
    pickerHeight: 450, // 颜色选择器高度
  
    currentColorModule: '', // 当前选择的是原色还是渐变色
    currentColor: '', // 记录当前的颜色
    bottomHistory: 9, // 底部历史记录条数
    absorbHistory: 2, // 吸管取色历史记录条数
  
    sliderBarWidth: 0, // 渐变条宽度
    gradientDIVList: [], // 渐变条操作数组
    /**
       * [
       {
       // 当前滑块
       'slider': newGradientSlider,
       // 滑块的默认颜色
       'color': color,
       // 距离渐变条的左侧距离
       'positionX': position,
       // 百分比
       'percentages': 0,
       }
       ]
       */
    currentSelectedSlider: null, // 记录当前选中的滑块
    currentSelectedSliderObj: null, // 记录当前选中的滑块obj
    currentDegree: 180, // 渐变方向，默认为从上到下
  
    colorPanelCursorLabel: false, // 色板的游标取色功能
    colorPickerBottomSaturationLabel: false, // 色阶柱选择功能
    colorPickerBottomAlphaLabel: false, // 透明度选择功能
  
    originalColor: '#ff0000', // 原始颜色
    leftSliderColor: '#ff0000', // 渐变条左侧滑块颜色
    rightSliderColor: '#0900f5', // 渐变条右侧滑块颜色
  
    // 获取到输入框的值
    getCurrentColor: function (color) {},
  }
  
  // 构造函数
  function XLColorPicker(options) {
    // 合并参数
    this.option = Object.assign(option, options)
    Object.keys(this.option).forEach((key) => {
      this[key] = this.option[key]
    })
    // 渐变数组重置
    this.gradientDIVList = []
  
    // console.log("初始化颜色选择器")
    this.init()
  }
  
  // 原型方法
  XLColorPicker.prototype = {
    // 初始化
    init() {
      // 先初始化DOM
      this.initDom()
  
      // 初始化事件
      this.initEvent()
  
      // 初始化取色器块
      this.initmodule()
  
      // 给dom元素绑定事件
      this.bindEvent()
  
      // this.addGradientSlider(0, this.leftSliderColor);
      // this.addGradientSlider(this.sliderBarWidth, this.rightSliderColor);
  
      /**
       * ============================ 色板的游标取色功能 ============================
       * 1. 拖拽取色功能
       * 2. 点击取色功能
       * colorPanelCursor
       * return 将取到的颜色值返回到选中的展示块上，和将其以hex格式输出到inout框中
       */
      this.mousedown(
        this.colorPanel,
        this.colorPanelCursor,
        this.colorPanelCursorLabel
      )
      /**
       * ============================ 色阶柱选择功能 ============================
       * 1. 点击或者拖拽色阶柱
       * 2. 实现色板、展示板、输出值的实时改变
       */
      this.mousedown(
        this.colorPickerBottomSaturation,
        this.colorPickerBottomSaturationSlide,
        this.colorPickerBottomSaturationLabel
      )
  
      /**
       * ============================ 透明度选择功能 ============================
       * 1. 点击透明度条，控制当前颜色的透明度
       * 2. 有拖拽功能
       * 3. 展示块颜色会随着该值的改变而改变
       */
      this.mousedown(
        this.colorPickerBottomAlpha,
        this.colorPickerBottomAlphaSlide,
        this.colorPickerBottomAlphaLabel
      )
    },
  
    // 设置指定页面的操作块
    initmodule() {
      let that = this
  
      // 获取颜色选择器对应的DOM对象
      if (typeof this.id == 'string') {
        this.ele = document.querySelector(`#${this.id}`)
      } else {
        this.ele = this.id
      }
  
      // 添加样式
      this.ele.style.cursor = 'pointer'
      this.ele.style.width = this.eleWidth + 'px'
      this.ele.style.height = this.eleHeight + 'px'
  
      this.ele.style.background = this.eleColor
  
      // 给传入的颜色值显示到输出框
      this.setColorInputValue(this.eleColor)
  
      // 设置颜色板
      if (!this.eleColor.includes('linear-gradient')) {
        this.setColorBoard(this.eleColor)
  
        this.addGradientSlider(0, this.leftSliderColor)
        this.addGradientSlider(this.sliderBarWidth, this.rightSliderColor)
      }
  
      // 设置渐变
      if (this.eleColor.includes('linear-gradient')) {
        let gradientList = this.gradientFromStr(this.eleColor) || []
        if (gradientList.colors && gradientList.colors.length > 0) {
          gradientList.colors.forEach((item) => {
            this.addGradientSlider(
              (item.per * this.sliderBarWidth) / 100,
              item.color
            )
          })
          this.rotateGradient(gradientList.angle)
        }
      }
      // 添加点击事件
      this.ele.addEventListener('click', function (e) {
        // 获取坐标
        that.startX =
          that.ele.offsetWidth + that.ele.getBoundingClientRect().left + 10
        that.startY = that.ele.getBoundingClientRect().top
  
        // 显示取色器
        that.isShow = !that.isShow
  
        // 根据isShow的值显示或隐藏取色器
        that.isShow ? that.show() : that.hide()
  
        // 更新位置
        that.checkPosition(that.startX, that.startY)
      })
    },
  
    // 获取DOM的随机ID
    getRandomId(len = 8) {
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      var maxPos = chars.length
      var pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
  
    // 初始化dom
    initDom() {
      let temColorPicker = document.createElement('div')
      let html = `
                  <!-- 颜色选择器 -->
                  <div class="blink-color-picker">
    
                      <!-- 标题 -->
                      <div class="blink-color-picker-title">
                      <label>颜色</label>
                      <label class="blink-color-picker-close">X</label>
                      </div>
    
                      <!-- 原色还是线性渐变选择模块 -->
                      <div class="blink-color-picker-type">
                      <!-- 原色 -->
                      <div class="blink-color-picker-type-item blink-color-picker-type-item-color" data-type="color" id="show-original"></div>
                      <!-- 渐变色 -->
                      <div class="blink-color-picker-type-item blink-color-picker-type-item-linear" data-type="linear" id="show-linear"></div>
                      </div>
    
                      <!-- 渐变条操作 -->
                      <div class="blink-color-picker-linear-slider">
                      <!-- 整个渐变条 -->
                      <div class="blink-color-picker-linear-slider-bar">
                      </div>
                      <!-- 按钮新增-减少 -->
                      <div class="blink-color-picker-linear-slider-button">
                          <!-- <button class="add">+</button> -->
                          <button class="decline">-</button>
                      </div>
    
                      <!-- 渐变方向旋转 -->
                      <div class="blink-color-picker-linear-slider-rotate">
                                 <img
                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAYAAACVU7GwAAAAAXNSR0IArs4c6QAAA6hJREFUWEe9mF+IVFUcx3+/M+sisW5K+7IPEayQSQjKvoSk5FMa5J+X8jUjKsGHnZ3zu3sT2VGEnfM7I0uCySKohJBgf8DAiiKiiHrKEBJZBDXIHnSpJV3Bdc6vPUt3u3Nndu697s6clwtzfuf7+8y55/z+XIQcg5lfAYCdALBJRPoQ8SkAeAIR74rIFAD45zkR+XpkZOT3HNJ1ppi2cHR0tLenp+eAc24fIg6k2cfmP0fE41rrb3KsmTdtCcXM7wLAAQBYn1c4Zn8WAN4nol+zaiwKZYw5hojFrEIpdn97La31mSx6TaGY+QoAbGgi8BcAfOuc+xgAfnPO3S4UCg+dc4NKqUFEHBQR/3y2mXMRORwEQTkNrAGKme8AQF9i4W0ROdXd3T0xNDT0Z5qotfZtAKiIyOomtq8R0YVWGnVQzPw9AGxJLPjQOXco720aHx9fPTs7+ykAbMsLtgBljDmKiAfjAohY1lofTtuZVvPGmN2I+FnC5kpXV9cLxWLxQbO181DGmPVKqZ9FpDdm9BMRbV4KULTWGKMRkRNaARElf/s/JDDzBwDgr//8EJF7zrmtYRheXg4or2GtvSgir8b0/lBKbSyVSneTPnDu6q9CxFtzsWRNNImI72mtx5YLyOtUKpUNSqkfAODJmO6bRHS6Acpau0dE/IGMdmkyCIJ1ywkUaTHzSQB4J6Z9kYh2NUAx83kAeD02cYyISu2AqlQqe5VSH8W1iaghLPnX9wsibooMa7XatjAMv2sHVLVafcY5d23uba6M9JVSz5dKpatxf8jMPps/Hf1YKBTWDQ8PT7YDymsy8xcAsD2m3xBMPdR9X37EzlRvEAT/LBXKWrvXOfdcUkcpJSKykGp86ml2ptoC5R0ZY/Yj4omcf/Cttr8+a+1BETmaEaxIROMdOegZy6BRIjri4f1OdSQkWGtPi8gbi+xYlYh0NIcdDp4+Me9OgJ0lojrYjqUZDzIxMbFienr6q1g5c2lmZmZXuVx+VBen/osdbU/IkdNqtdrnnPNgtVqt9nIYhr6arRsdKV2STpl5rScKw/BmszPWssjLWlNnvO6ZzdpWDnuCsbGxlx4nj7arcdgDACUR8ZXri0T0Y+ZtWqwZzdNi9ff335+amhpwzg34Dto5tx0RdyQgdhDRl1nBOtWMep7U1moheLaiX6a2/SQR7c+6S/NpJs14CR84PkHEI1pr323nGqlQcbVFPgWtAIBJEZlExOsAcAMRbz7O15bI17/4ccRN1QbYSQAAAABJRU5ErkJggg=="
                                      alt="Base64 Image" width="20px" id="rotate" />
                      </div>
                      </div>
    
    
                      <!-- 颜色面板 -->
                      <div class="blink-color-picker-panel">
                      <!-- 白色 黑色背景 -->
                      <div class="blink-color-picker-panel-white"></div>
                      <div class="blink-color-picker-panel-black"></div>
                      <!-- 游标 -->
                      <div class="blink-color-picker-panel-cursor"></div>
                      </div>
    
                      <!-- 颜色选择器底部 -->
                      <div class="blink-color-picker-bottom">
                      <!-- 左边 吸取颜色 -->
                      <div class="blink-color-picker-bottom-left">
                          <!-- 吸取颜色图标 -->
                          <div class="blink-color-picker-bottom-left-absorb">
                                    <img
                                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAaVJREFUWEftli9PxDAYxp9OEiQGhQYklmBwmK293HkU4SOQYOEzkBOEP45L1tXwAfBIQKMwaNzthZJrUo52HV13Z2gy1WW/p8/7vk/HsOTFlszHv4DeHBBCrBPRrpRy0lTmXgQURbHDGLsFsAlgIqUc+UR0EpDn+VaWZVxKeWYAQog9IroBsGFBvSKiBczgd18n3AZwLKW8yPP8IMuyawBrjhM7RUQLEEKcENG5BdI2XwFY8dlNREdVVY3t/WgB+iOc80MAly2z5IUxtl+W5VtKAUMAugyh9UpEg6qqHudfjHaAc94W/s4YG5Rl+eBSGSXAAdezrp95Nz7quh4qpe6TjaELbubcsTdKGkRN8FlTagd0aez1PaKdHYiEG+6pHVZ/noIIuM6E1dmIPtV1PVJKPUc1YQzc1F2H1XQ6VT64FtQ4BV3goWAw+14Bi4B7HVgU3ClgkXCfAPLd45zz+TkPBk2oF371AOfcCPhxf/cBb+1AX/A2AvQ7+pKx47Wz7Y1JaJXAVb6k8LYOGCHJ4cEkDHVwiv2oH5IU4GAUp4Q0fWvpDnwCEdzjIQcHB4wAAAAASUVORK5CYII="
                                      alt="Base64 Image" width="30px" id="absorb" />
                          </div>
                          <!-- 颜色方块 上面展示吸取颜色（白色） 下面显示历史颜色（黑色） -->
                          <div class="blink-color-picker-bottom-left-color">
                          <div class="blink-color-picker-bottom-left-color-top absorb-history"></div>
                          <div class="blink-color-picker-bottom-left-color-bottom absorb-history"></div>
                          </div>
                      </div>
    
                      <!-- 右边 色阶柱和透明度柱 -->
                      <div class="blink-color-picker-bottom-right">
                          <!-- 色阶 -->
                          <div class="blink-color-picker-bottom-right-saturation">
                          <!-- 色阶滑块 -->
                          <div class="blink-color-picker-bottom-right-saturation-slide"></div>
                          </div>
                          <!-- 透明度 -->
                          <div class="blink-color-picker-bottom-right-alpha">
                          <!-- 背景色 -->
                          <div class="blink-color-picker-bottom-right-alpha-show"></div>
                          <!-- 透明度滑块 -->
                          <div class="blink-color-picker-bottom-right-alpha-slide"></div>
                          </div>
                      </div>
                      </div>
    
                      <!-- 颜色输出和输入框 支持输入RGB, HEX, HSL, HSB, 输出统一为 HEX -->
                      <div class="blink-color-picker-input">
                      <!-- 输入框 输出框 -->
                      <input class="blink-color-picker-input-color" placeholder="输入颜色值，如：#fff" spellcheck="false" />
                      </div>
    
                      <!-- 历史颜色展示 -->
                      <div class="blink-color-picker-history">
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      <div class="blink-color-picker-history-color"></div>
                      </div>
                      <!-- 底部留白 -->
                      <div class="blink-color-picker-bottom-blank"></div>
                  </div>
              `
  
      let css = `
              /* 使用flex布局 */
              /* 主体标签 */
              .blink-color-picker {
                  --blink-color-picker-bg: linear-gradient(45deg, rgba(0, 0, 0, 0.4) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.4)),
                      linear-gradient(45deg, rgba(0, 0, 0, 0.4) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.4));
                  // width: 300px;
                  // height: 500px;
                  background: #fff;
                  border: 1px solid #ccc;
                  position: fixed;
                  /* top: 100px; */
                  /* left: 50px; */
                  padding: 6px 10px;
                  box-sizing: border-box;
                  z-index: 999999;
                  user-select: none;
    
                  display: flex;
                  flex-direction: column;
              }
    
              .blink-color-picker.canmove {
                  cursor: move;
              }
    
              /* =========标题标签========= */
              .blink-color-picker .blink-color-picker-title {
                  flex: 0.6;
                  padding: 10px;
                  font-weight: bold;
                  border-bottom: 1px solid #ccc;
                  user-select: none;
              }
    
              .blink-color-picker .blink-color-picker-close {
                  float: right;
                  cursor: pointer;
              }
    
              /* =========原色还是线性渐变选择模块========= */
              .blink-color-picker .blink-color-picker-type {
                  flex: 0.7;
                  height: 35px;
                  display: flex;
                  flex-direction: row;
                  background-color: #f7f7f7;
                  margin: 1% 2% 0 2%;
                  align-items: center;
                  position: relative;
                  z-index: 1;
                  /* 确保父容器是相对定位 */
              }
    
              /* 原色和渐变色 公用样式 */
              .blink-color-picker .blink-color-picker-type-item {
                  border-radius: 10% 10%;
                  height: 75%;
                  width: 10%;
                  margin-left: 10%;
                  cursor: pointer;
              }
    
              /* 原色 */
              .blink-color-picker .blink-color-picker-type-item-color {
                  background-color: #d8d8d8;
              }
    
              /* 渐变色 */
              .blink-color-picker .blink-color-picker-type-item-linear {
                  margin-left: 10%;
              }
    
    
              .blink-color-picker .blink-color-picker-type-item-color::after,
              .blink-color-picker .blink-color-picker-type-item-linear::after {
                  content: "";
                  width: 15%;
                  height: 100%;
                  background-color: #fff;
                  border: 1px solid #ccc;
                  position: absolute;
                  top: 0;
                  left: 7.5%;
                  z-index: -1;
                  display: none;
              }
    
              .blink-color-picker .blink-color-picker-type-item-linear::after {
                  left: 27.2%;
              }
    
              .blink-color-picker .blink-color-picker-type-item.active::after {
                  display: block;
              }
    
              /* =========渐变条操作========= */
              .blink-color-picker .blink-color-picker-linear-slider {
                  flex: 1;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  background-color: #fafafa;
              }
    
              /* 渐变条 */
              .blink-color-picker .blink-color-picker-linear-slider-bar {
                  width: 70%;
                  margin: 0 1%;
                  height: 1rem;
                  border-radius: 1rem;
                  position: relative;
                  cursor: pointer;
                  /* border: 1px solid #ccc; */
              }
    
              .blink-color-picker .blink-color-picker-linear-slider-bar-slide {
                  width: 0.8rem;
                  height: 0.8rem;
                  border-radius: 50%;
                  position: absolute;
                  top: 5px;
                  transform: translate(-5px, -5px);
                  box-shadow: 0 0 0 3px #fff,
                      inset 0 0 2px 2px rgb(0 0 0 / 0%),
                      /*等价于rgba(0,0,0,0.4)*/
                      0 0 2px 3px rgb(0 0 0 / 50%);
                  /*等价于rgba(0,0,0,0.5)*/
                  cursor: pointer;
              }
    
              /* 被选中 */
              .blink-color-picker .slider-selected {
                  /* 增大阴影以突出显示 */
                  box-shadow: 0 0 0 5px #fff,
                      inset 0 0 2px 2px rgb(0 0 0 / 0%),
                      0 0 4px 4px rgb(0 0 0 / 70%);
    
                  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
              }
    
              /* 添加和减少按钮 */
              .blink-color-picker .blink-color-picker-linear-slider-button {
                  display: flex;
                  flex-direction: row;
                  width: auto;
                  margin-left: 3%;
                  user-select: none;
              }
    
              .blink-color-picker .blink-color-picker-linear-slider-button .add,
              .blink-color-picker .blink-color-picker-linear-slider-button .decline {
                  cursor: pointer;
              }
    
              .blink-color-picker .blink-color-picker-linear-slider-button .decline {
                  margin-left: 10%;
              }
    
              /* 旋转 */
              .blink-color-picker .blink-color-picker-linear-slider-rotate {
                  margin-left: 5%;
                  margin-top: 1%;
                  cursor: pointer;
                  user-select: none;
              }
    
              /* =========颜色面板========= */
              .blink-color-picker .blink-color-picker-panel {
                  flex: 5;
                  width: 100%;
                  position: relative;
                  background-color: #ff0000;
                  cursor: pointer;
              }
    
              /* 黑白背景 */
              .blink-color-picker .blink-color-picker-panel>.blink-color-picker-panel-white,
              .blink-color-picker .blink-color-picker-panel>.blink-color-picker-panel-black {
                  position: absolute;
                  left: 0;
                  top: 0;
                  right: 0;
                  bottom: 0;
              }
    
              .blink-color-picker .blink-color-picker-panel-white {
                  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
              }
    
              .blink-color-picker .blink-color-picker-panel-black {
                  background: linear-gradient(0deg, #000, transparent);
              }
    
              /* 游标 */
              .blink-color-picker .blink-color-picker-panel-cursor {
                  width: 5px;
                  height: 5px;
                  border-radius: 50%;
                  position: absolute;
                  left: 5px;
                  top: 5px;
                  transform: translate(-5px, -5px);
                  box-shadow: 0 0 0 3px #fff,
                      inset 0 0 2px 2px rgb(0 0 0 / 0%),
                      /*等价于rgba(0,0,0,0.4)*/
                      0 0 2px 3px rgb(0 0 0 / 50%);
                  /*等价于rgba(0,0,0,0.5)*/
                  cursor: default;
              }
    
    
              /* =========颜色选择器底部========= */
              .blink-color-picker .blink-color-picker-bottom {
                  flex: 0.5;
                  display: flex;
                  flex-direction: row;
                  margin-top: 3%;
                  margin-bottom: 3%;
              }
    
              /* 颜色选择器底部左侧 */
              .blink-color-picker .blink-color-picker-bottom-left {
                  flex: 2;
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
              }
    
              /* 拾色器 */
              .blink-color-picker .blink-color-picker-bottom-left-absorb {
                  cursor: pointer;
                  width: 100%;
                  height: 50%;
                  background-color: #fff;
                  user-select: none;
              }
    
              .blink-color-picker .blink-color-picker-bottom-left-absorb img {
                  margin: 0 auto;
                  margin-left: 20px;
              }
    
              .blink-color-picker .blink-color-picker-bottom-left-color {
                  width: 100%;
                  height: 100%;
              }
    
              .blink-color-picker .blink-color-picker-bottom-left-color-top,
              .blink-color-picker .blink-color-picker-bottom-left-color-bottom {
                  width: 90%;
                  height: 50%;
                  margin: auto;
                  border: 1px solid #ccc;
              }
    
              .blink-color-picker .blink-color-picker-bottom-left-color-top {
                  background-color: #b3b3b3;
                  border-top-left-radius: 20%;
                  border-top-right-radius: 20%;
                  border-bottom: none;
              }
    
              .blink-color-picker .blink-color-picker-bottom-left-color-bottom {
                  background-color: #000;
                  border-bottom-left-radius: 20%;
                  border-bottom-right-radius: 20%;
                  border-top: none;
              }
    
              /* 颜色选择器底部右侧 */
              .blink-color-picker .blink-color-picker-bottom-right {
                  flex: 4;
                  margin: 0 5%;
              }
    
              /* 色阶 */
              .blink-color-picker .blink-color-picker-bottom-right-saturation {
                  width: 100%;
                  margin: 2% 0;
                  height: 1rem;
                  border-radius: 1rem;
                  background: linear-gradient(to right,
                          hsl(0, 100%, 50%),
                          hsl(60, 100%, 50%),
                          hsl(120, 100%, 50%),
                          hsl(180, 100%, 50%),
                          hsl(240, 100%, 50%),
                          hsl(300, 100%, 50%),
                          hsl(360, 100%, 50%));
                  position: relative;
                  cursor: pointer;
              }
    
              .blink-color-picker .blink-color-picker-bottom-right-saturation-slide {
                  width: 0.7rem;
                  height: 0.7rem;
                  border-radius: 50%;
                  position: absolute;
                  left: 96%;
                  top: 7px;
                  transform: translate(-5px, -5px);
                  box-shadow: 0 0 0 3px #fff,
                      inset 0 0 2px 2px rgb(0 0 0 / 0%),
                      /*等价于rgba(0,0,0,0.4)*/
                      0 0 2px 3px rgb(0 0 0 / 50%);
                  /*等价于rgba(0,0,0,0.5)*/
                  cursor: pointer;
              }
    
              /* 透明度 */
              .blink-color-picker .blink-color-picker-bottom-right-alpha {
                  width: 100%;
                  margin-top: 3%;
                  height: 1rem;
                  background: var(--blink-color-picker-bg);
                  background-size: 10px 10px;
                  background-position: 0 0, 5px 5px;
                  border-radius: 1rem;
                  position: relative;
                  cursor: pointer;
              }
    
              .blink-color-picker .blink-color-picker-bottom-right-alpha-show {
                  width: 100%;
                  height: 1rem;
                  border-radius: 1rem;
                  background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
              }
    
              .blink-color-picker .blink-color-picker-bottom-right-alpha-slide {
                  width: 0.7rem;
                  height: 0.7rem;
                  border-radius: 50%;
                  position: absolute;
                  left: 96%;
                  top: 7px;
                  transform: translate(-5px, -5px);
                  box-shadow: 0 0 0 3px #fff,
                      inset 0 0 2px 2px rgb(0 0 0 / 0%),
                      /*等价于rgba(0,0,0,0.4)*/
                      0 0 2px 3px rgb(0 0 0 / 50%);
                  /*等价于rgba(0,0,0,0.5)*/
                  cursor: pointer;
              }
    
              /* =========颜色输出和输入框========= */
              .blink-color-picker .blink-color-picker-input {
                  width: auto;
                  flex: 0.6;
                  display: flex;
                  margin: 1% 2%;
              }
    
              .blink-color-picker .blink-color-picker-input-color {
                  width: 100%;
                  height: 100%;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                  padding: 0 5px;
                  margin: 0 2%;
                  outline: none;
                  background-color: #eaeaea;
    
                  font-size: 1.1rem;
                  /* text-transform: uppercase; */
              }
    
              /* 历史颜色展示 */
              .blink-color-picker .blink-color-picker-history {
                  flex: 0.7;
                  display: flex;
                  flex-direction: row;
                  width: auto;
                  margin: 1% 5%;
                  align-items: center;
              }
    
              /* 历史颜色展示内部标签 */
              .blink-color-picker .blink-color-picker-history-color {
                  border-radius: 10% 10%;
                  height: 75%;
                  width: 10%;
                  margin-left: 1%;
                  background-color: rgba(243, 242, 242, 0.277);
                  border: 1px solid transparent;
              }
    
              /* 底部留白 */
              .blink-color-picker .blink-color-picker-bottom-blank {
                  flex: 0.5;
              }
              `
      // 将html添加到页面中
      temColorPicker.innerHTML = html
      temColorPicker.classList.add('controllerShow')
  
      let elementId = this.getRandomId()
      temColorPicker.id = elementId
  
      // 创建style标签并添加到head中
      let style = document.createElement('style')
      style.appendChild(document.createTextNode(css))
      document.head.appendChild(style)
  
      document.body.appendChild(temColorPicker)
  
      // 获取到操作的dom
      let dom = {
        controllerShow: document.querySelector(`#${temColorPicker.id}`), // 父级div
        close: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-close`
        ), // 关闭
        colorPicker: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker`
        ), // 颜色选择器
        // 原色还是线性渐变选择模块
        showOriginal: document.querySelector(
          `#${temColorPicker.id} #show-original`
        ), // 原始颜色的dom
        showLinear: document.querySelector(`#${temColorPicker.id} #show-linear`), // 渐变色的dom
        // 渐变条操作
        linearSliderBar: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-linear-slider-bar`
        ), // 渐变条
        linearSliderBarSlide: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-linear-slider-bar-slide`
        ), // 渐变条滑块
        linearSliderBarSlideAdd: document.querySelector(
          `#${temColorPicker.id} .add`
        ), // 新增
        linearSliderBarSlideDecline: document.querySelector(
          `#${temColorPicker.id} .decline`
        ), // 减少
        rotate: document.querySelector(`#${temColorPicker.id} #rotate`), // 渐变方向旋转
  
        // 颜色面板
        colorPanel: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-panel`
        ), // 颜色面板
        colorPanelCursor: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-panel-cursor`
        ), // 颜色面板游标
  
        // 颜色选择器底部
        colorPickerBottomAbsorb: document.querySelector(
          `#${temColorPicker.id} #absorb`
        ), // 吸收图标
        colorPickerBottomAbsorbArray: document.querySelectorAll(
          `#${temColorPicker.id} .absorb-history`
        ), // 吸收历史颜色
        colorPickerBottomSaturation: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-bottom-right-saturation`
        ), // 色阶
        colorPickerBottomSaturationSlide: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-bottom-right-saturation-slide`
        ), // 色阶滑块
        colorPickerBottomAlpha: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-bottom-right-alpha`
        ), // 透明度
        colorPickerBottomAlphaSlide: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-bottom-right-alpha-slide`
        ), // 透明度滑块
  
        // 颜色输出和输入框
        colorInput: document.querySelector(
          `#${temColorPicker.id} .blink-color-picker-input-color`
        ),
  
        // 历史颜色列表展示
        historyColorArray: document.querySelectorAll(
          `#${temColorPicker.id} .blink-color-picker-history-color`
        ),
      }
  
      // 将所有dom挂载到this上
      Object.keys(dom).forEach((key) => (this[key] = dom[key]))
    },
  
    // 初始化事件
    initEvent() {
      this.colorPicker.style.width = `${this.pickerWidth}px`
      this.colorPicker.style.height = `${this.pickerHeight}px`
      // 历史记录初始化
      this.historyColorQueue = new ColorCircularQueue(this.bottomHistory)
      this.absorbHistoryColorQueue = new ColorCircularQueue(this.absorbHistory)
  
      this.sliderBarWidth = this.linearSliderBar.offsetWidth
  
      this.currentColor = this.originalColor
  
      // 全局设置当前的模式，是原色还是渐变色
      this.currentColorModule = this.showOriginal
      this.currentColorModule.classList.add('active')
  
      // 是否可以移动
      if (this.canMove) {
        this.colorPicker.classList.add('canmove')
      }
      // 最初是否显示
      this.isShow ? this.show() : this.hide()
    },
  
    // 显示
    show() {
      this.controllerShow.style.display = 'block'
    },
  
    // 隐藏
    hide() {
      this.controllerShow.style.display = 'none'
    },
  
    // 绑定事件
    bindEvent() {
      let that = this
  
      // 颜色选择器拖动
      if (this.canMove) {
        this.colorPicker.addEventListener('mousedown', function (e) {
          if (getComputedStyle(e.target).cursor === 'move') {
            // 记录鼠标按下时的位置
            that.isDragging = true
            that.startX =
              e.clientX - that.colorPicker.getBoundingClientRect().left
            that.startY = e.clientY - that.colorPicker.getBoundingClientRect().top
          }
        })
  
        document.addEventListener('mousemove', function (e) {
          if (that.isDragging) {
            // 更新元素的位置
            let x = e.clientX - that.startX
            let y = e.clientY - that.startY
            that.checkPosition(x, y)
          }
        })
  
        document.addEventListener('mouseup', function () {
          that.isDragging = false
        })
      }
  
      // 点击不是颜色选择器的其他地方隐藏颜色选择器
      document.addEventListener('mousedown', function (e) {
        if (that.isShow) {
          if (
            e.target !== that.colorPicker &&
            !that.colorPicker.contains(e.target) &&
            e.target !== that.ele
          ) {
            that.hide()
            that.isShow = !that.isShow
          }
        }
      })
  
      // 关闭按钮
      this.close.addEventListener('click', function () {
        that.hide()
        that.isShow = !that.isShow
      })
  
      // 为每个选择项添加点击事件监听器   选原色还是渐变色
      this.showOriginal.addEventListener('click', function () {
        that.currentColorModule = this
        if (this.classList.contains('active')) {
          this.classList.remove('active')
        } else {
          this.classList.add('active')
          that.showLinear.classList.remove('active')
        }
      })
  
      this.showLinear.addEventListener('click', function () {
        that.currentColorModule = this
        that.ele.style.background = that.eleColor
        if (this.classList.contains('active')) {
          this.classList.remove('active')
        } else {
          this.classList.add('active')
          that.showOriginal.classList.remove('active')
        }
      })
  
      // =====================================================
      // 监听渐变条的点击事件
      this.linearSliderBar.addEventListener('mousedown', function (e) {
        // 阻止冒泡
        e.stopPropagation()
        if (!that.currentColorModule.isEqualNode(that.showLinear)) return
        // 检查点击位置是否已经有滑块
        let clickPosition =
          e.clientX - that.linearSliderBar.getBoundingClientRect().left
        that.addGradientSlider(clickPosition)
      })
  
      // 删除选中滑块的按钮
      this.linearSliderBarSlideDecline.addEventListener('click', function (e) {
        that.deleteSelectedSlider()
      })
  
      // 旋转按钮
      this.rotate.addEventListener('click', function (e) {
        //  默认旋转90度
        that.rotateGradient()
      })
  
      // ======================================
      // 实现拾色器功能
      this.colorPickerBottomAbsorb.addEventListener('click', () => {
        // if (!window.EyeDropper) {
        //     // resultElement.textContent = "你的浏览器不支持 EyeDropper API";
        //     console.log("你的浏览器不支持 EyeDropper API");
        //     return;
        // }
        try {
          const eyeDropper = new EyeDropper()
          eyeDropper
            .open()
            .then((result) => {
              console.log('取色', result.sRGBHex)
              let resultColor = result.sRGBHex
              // 添加到历史记录
              that.addAbsorbHistoryColor(resultColor)
              that.addHistoryColor(resultColor)
              // 赋值到输入框
              that.setColorInputValue(resultColor)
            })
            .catch((e) => {
              console.log('取色失败', e)
            })
        } catch (e) {
          console.log(e)
        }
      })
  
      // ===================================
      // 监听颜色输入框的失去焦点事件
      this.colorInput.addEventListener('blur', function (e) {
        // 获取输入框的值
        let color = that.colorInput.value
  
        // 校验颜色格式，RGB、HEX、HSL、HSB、HSLA、RGBA格式
        if (!that.isValidColor(color.trim())) {
          // that.colorInput.value = "";
          // 抛出异常
          console.log('输入的颜色格式不正确')
          return
          // throw Error("输入的颜色格式不正确");
        }
  
        // 颜色格式转换
        let hexColor = colorFormat({ color, format: 'hex' }).complete
  
        if (hexColor === null || hexColor === undefined) {
          that.setColorInputValue('')
          // 提示错误信息
          console.log('输入的颜色格式不正确')
          return
          // throw Error("输入的颜色格式不正确");
        }
  
        // 设置input的值
        that.setColorInputValue(hexColor)
  
        that.setColorBoard(color)
      })
  
      // 监听右击事件
      this.colorInput.addEventListener('contextmenu', function (e) {
        // 阻止默认事件
        e.preventDefault()
        if (that.colorInput.value) {
          // 复制到剪切板
          that.copyToClipboard(that.colorInput.value)
        } else {
          alert('请输入颜色值')
        }
      })
    },
  
    validateAndCompleteRGBA(colorStr) {
      // 正则表达式匹配rgba格式
      const rgbaRegex =
        /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d(?:\.\d+)?))?\)$/i
      // 正则表达式匹配rgb格式
      const rgbRegex =
        /^rgb\(\s*(0|1\d\d?|2[0-4]\d?|25[0-5])\s*,\s*(0|1\d\d?|2[0-4]\d?|25[0-5])\s*,\s*(0|1\d\d?|2[0-4]\d?|25[0-5])\s*\)$/i
  
      // 匹配输入的字符串是否为rgba格式
      const rgbaMatch = rgbaRegex.exec(colorStr.trim())
      // 匹配输入的字符串是否为rgb格式
      const rgbMatch = rgbRegex.exec(colorStr.trim())
  
      if (rgbaMatch) {
        // 提取RGB值和A值
        const r = parseInt(rgbaMatch[1], 10)
        const g = parseInt(rgbaMatch[2], 10)
        const b = parseInt(rgbaMatch[3], 10)
        let a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1 // 如果没有A值，则默认为1
  
        // 确保A值在0到1之间
        a = Math.max(0, Math.min(1, a))
  
        // 返回完整的RGBA字符串
        return `rgba(${r},${g},${b},${a})`
      } else if (rgbMatch) {
        // 提取RGB值
        const r = parseInt(rgbMatch[1], 10)
        const g = parseInt(rgbMatch[2], 10)
        const b = parseInt(rgbMatch[3], 10)
  
        // 将RGB转换为RGBA，A值设为1
        return `rgba(${r},${g},${b},1)`
      } else {
        // 如果不是rgba或rgb格式，返回错误或抛出异常
        throw new Error('Invalid color format')
      }
    },
  
    // 通过hue获取到画板的背景
    hslToBackground(h) {
      // 将Hue值从0-360转换为0-1的范围
      let hue = h / 360
  
      // 计算RGB值
      let r, g, b
      if (hue >= 0 && hue < 1 / 6) {
        r = 1
        g = hue * 6
        b = 0
      } else if (hue >= 1 / 6 && hue < 2 / 6) {
        r = (2 / 6 - hue) * 6
        g = 1
        b = 0
      } else if (hue >= 2 / 6 && hue < 3 / 6) {
        r = 0
        g = 1
        b = (3 / 6 - hue) * 6
      } else if (hue >= 3 / 6 && hue < 4 / 6) {
        r = 0
        g = (4 / 6 - hue) * 6
        b = 1
      } else if (hue >= 4 / 6 && hue < 5 / 6) {
        r = (5 / 6 - hue) * 6
        g = 0
        b = 1
      } else {
        r = 1
        g = 0
        b = (1 - hue) * 6
      }
  
      // 将RGB值从0-1的范围转换为0-255的范围
      r = Math.round(r * 255)
      g = Math.round(g * 255)
      b = Math.round(b * 255)
  
      // 返回RGB颜色字符串
      return `rgb(${r}, ${g}, ${b})`
    },
  
    // 设置颜色板
    setColorBoard(color) {
      try {
        // rgba格式的校验
        if (
          this.eleColor.indexOf('rgba') !== -1 ||
          this.eleColor.indexOf('rgb') !== -1
        ) {
          this.eleColor = this.validateAndCompleteRGBA(this.eleColor)
        }
        let hsla = colorFormat({ color, format: 'hsla' }).complete
  
        // 获取h,s,l,a
        let { hue, saturation, lightness, opacity } = this.extractHSLAValues(hsla)
  
        // 转换成百分比
        hue = ((360 - hue) / 360) * 100
        opacity = opacity * 100
  
        // 预防滑块位置超出范围
        if (hue <= 4) {
          hue = 4
        }
        if (opacity <= 4) {
          opacity = 4
        }
  
        // 改变H色调柱滑块位置
        this.colorPickerBottomSaturationSlide.style.left =
          (hue === 100 ? 96 : hue) + '%'
  
        // 改变S,L位置,色板的游标位置
        this.colorPanelCursor.style.left = saturation + '%'
        this.colorPanelCursor.style.top = lightness + '%'
  
        // 改变A透明度滑块位置
        this.colorPickerBottomAlphaSlide.style.left =
          (opacity === 100 ? 96 : opacity) + '%'
  
        // 还原hue
        hue = 360 - (hue / 100) * 360
        // 改变色板颜色
        this.colorPanel.style.backgroundColor = this.hslToBackground(hue)
        // 保存当前颜色
        // this.currentColor = hsla;
      } catch (e) {
        console.log(e)
      }
    },
  
    replace(...args) {
      const string = `${args[0]}`
      return args.length < 3 ? string : string.replace(args[1], args[2])
    },
    gradientFromStr(gradientStr) {
      var type = ''
      gradientStr = gradientStr.toLowerCase()
      var reg1 = /(rgba\(.*?\))/gi
      var reg2 = /(hsla\(.*?\))/gi
      gradientStr = this.replace(gradientStr, reg1, (r) => {
        return colorFormat({ color: r, format: 'hex' }).complete
      })
      gradientStr = this.replace(gradientStr, reg2, (r) => {
        return colorFormat({ color: r, format: 'hex' }).complete
      })
      if (gradientStr.toLowerCase().indexOf('radial-gradient') > -1) {
        type = 'radial-gradient'
      }
      if (gradientStr.toLowerCase().indexOf('linear-gradient') > -1) {
        type = 'linear-gradient'
      }
      var arry = gradientStr
        .slice(
          gradientStr.toLowerCase().indexOf(type) + 16,
          gradientStr.toLowerCase().lastIndexOf(')')
        )
        .split(',')
      var colors = arry
        .map((res, i) => {
          if (type == 'linear-gradient' && i < 1) {
            return null
          }
          let color = res?.trim()?.split?.(' ')
          return color
            ? {
                color: color[0],
                per: color[1]
                  ? parseFloat(color[1])
                  : (100 * (i - 1)) / (arry.length - 2),
              }
            : null
        })
        .filter((item) => item)
  
      var gradient = {
        type: type,
        angle: type == 'linear-gradient' ? parseFloat(arry[0]).toFixed(0) : 0,
        colors,
      }
      // console.log("====", gradientStr, arry, gradient);
      // Object.assign(this.gradient, gradient);
      return gradient
    },
  
    // 取色器的位置不能超过浏览器窗口
    checkPosition(x, y) {
      // 获取屏幕的宽度和高度
      let screenWidth = window.innerWidth
      let screenHeight = window.innerHeight
  
      // 获取元素的宽度和高度
      let colorPickerWidth = this.colorPicker.offsetWidth
      let colorPickerHeight = this.colorPicker.offsetHeight
  
      // 限制元素不超出屏幕的右边和底边
      let maxX = screenWidth - colorPickerWidth
      let maxY = screenHeight - colorPickerHeight
  
      // 设置元素的新位置，并确保它不超出屏幕
      this.colorPicker.style.left = Math.min(Math.max(0, x), maxX) + 'px'
      this.colorPicker.style.top = Math.min(Math.max(0, y), maxY) + 'px'
    },
  
    /**
     * 提取出hsla格式的字符串中的值
     * @param {*} str hsla格式的颜色值
     * @returns hue (色调),saturation (饱和度),lightness (亮度),opacity (透明度)
     */
    extractHSLAValues(str) {
      if (typeof str !== 'string') {
        console.log('Invalid input type')
        return
        // throw Error('Invalid input type');
      }
      const regex = /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d+(?:\.\d+)?)\)/
      const match = str.match(regex)
      if (match) {
        return {
          hue: match[1],
          saturation: match[2],
          lightness: match[3],
          opacity: match[4],
        }
      } else {
        console.log('Invalid hsla format')
        return
        // throw Error('Invalid hsla format');
      }
    },
  
    /**
     * 判断输入的颜色是否合法
     * @param {*} color 输入值
     * @returns boolean
     */
    isValidColor(color) {
      // HEX 颜色格式
      const hexRegex =
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/
      // RGB 颜色格式
      const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
      // RGBA 颜色格式
      const rgbaRegex =
        /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d+)\)$/
      // HSL 颜色格式
      const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/
      // HSLA 颜色格式
      const hslaRegex =
        /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0\.\d+)\)$/
      // HSB/HSV 颜色格式 (假设输入的是 HSB，HSV 通常用在图形软件中)
      const hsbRegex = /^hsb\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/
  
      return (
        hexRegex.test(color) ||
        rgbRegex.test(color) ||
        rgbaRegex.test(color) ||
        hslRegex.test(color) ||
        hslaRegex.test(color) ||
        hsbRegex.test(color)
      )
    },
  
    /**
     * 设置颜色输入框的值
     * @param {*} value 颜色值
     */
    setColorInputValue(value) {
      try {
        this.colorInput.value = value.toLowerCase()
        // 颜色块的背景颜色
        if (this.currentColorModule === this.showOriginal) {
          if (value.includes('linear-gradient')) {
            this.currentColorModule.style.background = '#ffffff'
          } else {
            this.currentColorModule.style.background = value
          }
        } else if (this.currentColorModule === this.showLinear) {
          this.colorInput.style.fontSize = '12px'
  
          // 线性渐变
          if (this.currentSelectedSliderObj) {
            this.currentSelectedSliderObj.color = value
            this.setLinearGradient()
          } else {
            console.log('没有选择滑块')
            // this.colorInput.value = value;
            // return;
            // throw Error("没有选择滑块");
          }
        }
        this.getCurrentColor(value)
  
        this.ele.style.background = this.colorInput.value
        if (value.includes('linear-gradient')) {
          this.currentColorModule.style.background = '#ffffff'
        } else {
          // 更新当前颜色
          this.currentColor = value
        }
      } catch {
        console.log('设置颜色输入框的值失败')
      }
    },
  
    /**
     * 更新curruntColor当前颜色
     * @param {*} param0 h = 0, s, l, a = 1
     */
    updateCurrentColor({ h = 0, s, l, a = 1 }) {
      // rgba格式的校验
      if (this.eleColor.indexOf('rgba') !== -1) {
        this.eleColor = this.validateAndCompleteRGBA(this.eleColor)
      }
      // 当前颜色转换成hsla格式
      let hsla = colorFormat({
        color: this.currentColor,
        format: 'hsla',
      }).complete
  
      let { hue, saturation, lightness, opacity } = this.extractHSLAValues(hsla)
  
      hue = h === 0 ? (hue === undefined ? h : hue) : h
      saturation = s === undefined ? saturation : s
      lightness = l === undefined ? lightness : l
      opacity = a === 1 ? (opacity === undefined ? a : opacity) : a
  
      let color =
        'hsla(' + hue + ',' + saturation + '%,' + lightness + '%,' + opacity + ')'
  
      // 转换为hex格式
      color = colorFormat({ color, format: 'hex' }).complete
      this.setColorInputValue(color)
    },
  
    /**
     * 计算saturation和lightness
     * @param {*} w 宽度
     * @param {*} h 高度
     * @param {*} left 左边距
     * @param {*} top 顶边距
     * @returns saturation, lightness
     */
    calculateSL(w, h, left, top) {
      let s, l
      s = Math.round((left / w) * 100)
  
      l = Math.round((top / h) * 100 + ((w - left) / w) * 100) / 2
      return { s, l }
    },
  
    /**
     * 更新滑块位置
     * @param {*} element 滑块元素
     * @param {*} left 左边距
     * @param {*} ...arg 高度
     */
    updatedSlidePosition(ele, slide, left, ...args) {
      try {
        let [top] = args
        // 判断是否是dom节点元素
        if (!(slide instanceof Element) && !ele instanceof Element) return
        let width = ele.offsetWidth // 当前元素的宽度
        let height = ele.offsetHeight // 当前元素的高度
        // rgba格式的校验
        if (this.eleColor.indexOf('rgba') !== -1) {
          this.eleColor = this.validateAndCompleteRGBA(this.eleColor)
        }
        // 获取h,s,l,a 当前颜色转换成hsla格式
        let hsla = colorFormat({
          color: this.currentColor,
          format: 'hsla',
        }).complete
  
        let { hue, saturation, lightness, opacity } = this.extractHSLAValues(hsla)
  
        // 色阶
        if (slide.isEqualNode(this.colorPickerBottomSaturationSlide)) {
          hue = Math.round((left / width) * 360)
          this.updateCurrentColor({ h: hue })
  
          // 更新色板颜色
          let color = 'hsla(' + hue + ',' + 100 + '%,' + 50 + '%,' + 1 + ')'
  
          this.colorPanel.style.backgroundColor = color
        }
        // 透明度
        else if (slide.isEqualNode(this.colorPickerBottomAlphaSlide)) {
          opacity = (left / width).toFixed(2)
          this.updateCurrentColor({ a: opacity })
          // 更新色板颜色
          let color =
            'hsla(' +
            hue +
            ',' +
            saturation +
            '%,' +
            lightness +
            '%,' +
            opacity +
            ')'
  
          this.colorPanel.style.backgroundColor = color
        }
  
        // 如果有top参数（传入height参数了）  画板
        if (top !== undefined) {
          let { s, l } = this.calculateSL(width, height, left, height - top)
  
          // 更新颜色值
          this.updateCurrentColor({ s: s, l: l })
          // 移动滑块
          if (top <= slide.offsetHeight / 2) {
            top = slide.offsetHeight / 2
          }
          slide.style.top = top + 'px'
        }
  
        // 判断滑块是否出界
        if (left <= slide.offsetWidth) {
          left = slide.offsetWidth / 2
        } else if (left >= width) {
          left = width - slide.offsetWidth / 2
        }
        // 改变滑块的位置
        slide.style.left = left + 'px'
      } catch (e) {
        console.log('更新滑块位置失败')
        alert('颜色值错误')
        console.log(e)
      }
    },
  
    /**
     * 鼠标移动事件
     * @param {*} e 鼠标事件
     * @param {*} ele 移动元素条
     * @param {*} slide 滑块元素
     * @param {*} availableLabel 是否可用
     */
    mousemove(e, ele, slide, availableLabel) {
      let that = this
      if (!availableLabel) return
      let width = ele.offsetWidth // 当前元素的宽度
      let height = ele.offsetHeight // 当前元素的高度
      let left = e.clientX - ele.getBoundingClientRect().left
      let right = e.clientX - ele.getBoundingClientRect().left - width
      // 判断是否是色板
      if (ele.isEqualNode(that.colorPanel)) {
        let top = e.clientY - ele.getBoundingClientRect().top
        let bottom = e.clientY - ele.getBoundingClientRect().top - height
        if (left <= 0) {
          // 最左
          if (top <= 0) {
            that.updatedSlidePosition(ele, slide, 0, 0)
          } else if (bottom >= 0) {
            that.updatedSlidePosition(ele, slide, 0, height)
          } else {
            that.updatedSlidePosition(ele, slide, 0, top)
          }
        } else if (right >= 0) {
          // 最右
          if (top <= 0) {
            that.updatedSlidePosition(ele, slide, width, 0)
          } else if (bottom >= 0) {
            that.updatedSlidePosition(ele, slide, width, height)
          } else {
            that.updatedSlidePosition(ele, slide, width, top)
          }
        } else {
          // 中间
          if (top <= 0) {
            that.updatedSlidePosition(ele, slide, left, 0)
          } else if (bottom >= 0) {
            that.updatedSlidePosition(ele, slide, left, height)
          } else {
            that.updatedSlidePosition(ele, slide, left, top)
          }
        }
      } else {
        // 判断鼠标移动位置是否已经超出了box的范围，从而设置滑块的进度
        if (left <= 0) {
          // 最左
          that.updatedSlidePosition(ele, slide, 0)
        } else if (right >= 0) {
          // 最右
          that.updatedSlidePosition(ele, slide, width)
        } else {
          // 中间
          that.updatedSlidePosition(
            ele,
            slide,
            e.clientX - ele.getBoundingClientRect().left
          )
        }
      }
    },
  
    /**
     * 鼠标按下事件
     * @param {*} ele 移动元素条
     * @param {*} slide 滑块元素
     * @param {*} availableLabel 是否可用
     */
    mousedown(ele, slide, availableLabel) {
      let that = this
      ele.addEventListener('mousedown', function (e) {
        availableLabel = true
        // 当前点击位置的相对于条的宽度
        let leftWidth = e.clientX - ele.getBoundingClientRect().left
  
        document.addEventListener(
          'mousemove',
          function (e) {
            that.mousemove(e, ele, slide, availableLabel)
          },
          false
        )
  
        // 定义鼠标抬起的处理函数
        function mouseup(e) {
          availableLabel = false
          // 解绑mousemove事件
          document.removeEventListener('mousemove', that.mousemove)
          // 解绑mouseup事件自身
          document.removeEventListener('mouseup', mouseup)
          // 添加到历史记录
          that.addHistoryColor(that.currentColor)
        }
  
        document.addEventListener('mouseup', mouseup, false)
  
        // 画板
        if (ele === that.colorPanel) {
          let top = e.clientY - ele.getBoundingClientRect().top
          that.updatedSlidePosition(ele, slide, leftWidth, top)
          return
        }
        // 色阶条或者透明度条
        that.updatedSlidePosition(ele, slide, leftWidth)
      })
    },
  
    /**
     * ============================ 底部的颜色历史记录功能 ============================
     * 1. 记录操作过程中的颜色，9种颜色
     */
  
    /**
     * 添加颜色到队列
     * @param {*} color 颜色值
     */
    addHistoryColor(color) {
      // 颜色列表
      this.historyColorQueue.enQueue(color)
      // 颜色列表  给dom元素设置背景颜色
      this.historyColorQueue.getQueue().forEach((color, index) => {
        this.historyColorArray[index].style.backgroundColor = color
        this.historyColorArray[index].style.border = '1px solid #ccc'
      })
    },
  
    /**
     * ============================ 渐变色操作功能 ============================
     * 1. 点击渐变条，添加一个色块
     * 2. 点击色块，再点击减少按钮，删除一个色块
     * 3. 旋转渐变方向
     *
     * return 将取到的结果展示到选中的展示块上，并返回以输出到input框中
     */
  
    /**
     * 排序和计算距离
     * @param {*} list 渐变数组
     * @returns 清洗后的数组
     */
    sortAndDistance(list) {
      // 排序
      list.sort(function (a, b) {
        return a.positionX - b.positionX
      })
      // 计算滑块之间的距离
      list.map((obj) => {
        obj.percentages = Math.round((obj.positionX / this.sliderBarWidth) * 100)
      })
  
      return list
    },
  
    // 渐变滑块是否被选中状态改变
    sliderStateChange(newSlider) {
      // 删除所有的被选中状态
      this.gradientDIVList.map((item) => {
        item.slider.classList.remove('slider-selected')
      })
      newSlider.classList.add('slider-selected')
      // 当前选择的滑块
      this.currentSelectedSlider = newSlider
      // 找出当前点击的滑块    获取到颜色值
      this.gradientDIVList.forEach((obj) => {
        if (obj.slider.isEqualNode(newSlider)) {
          this.currentSelectedSliderObj = obj
          //   this.currentColor = obj.color
        }
      })
    },
  
    /** 添加渐变滑块的函数
     * @param {*} position 渐变条的位置
     * @param {*} color 渐变条的颜色
     */
    addGradientSlider(position, color = '#fff') {
      let that = this
  
      // 添加一个色块
      let newGradientSlider = document.createElement('div')
      newGradientSlider.addEventListener('click', function (e) {
        e.stopPropagation()
        that.sliderStateChange(newGradientSlider)
      })
      newGradientSlider.classList.add(
        'blink-color-picker-linear-slider-bar-slide'
      )
      this.linearSliderBar.appendChild(newGradientSlider)
  
      // 添加到渐变条的数组中
      this.gradientDIVList.push({
        // 当前滑块
        slider: newGradientSlider,
        // 滑块的默认颜色
        color: color,
        // 距离渐变条的左侧距离
        positionX: position,
        // 百分比
        percentages: 0,
      })
  
      if (position === 0) {
        // position = newGradientSlider.offsetWidth / 2;
        position = 6
      } else if (position >= this.sliderBarWidth) {
        position = this.sliderBarWidth - 9
      }
  
      newGradientSlider.style.left = position + 'px'
  
      this.setLinearGradient()
  
      // 拖动事件
      newGradientSlider.addEventListener('mousedown', function (e) {
        e.stopPropagation()
        if (!that.currentColorModule.isEqualNode(that.showLinear)) {
          console.log('当前颜色模式不是线性渐变')
          return
          // throw "当前颜色模式不是线性渐变";
        }
        that.sliderStateChange(newGradientSlider)
  
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      })
  
      function onMouseMove(e) {
        let newLeft =
          e.clientX - that.linearSliderBar.getBoundingClientRect().left
        if (
          newLeft >= 0 &&
          newLeft <=
            that.linearSliderBar.offsetWidth - newGradientSlider.offsetWidth / 2
        ) {
          // 计算新的位置
          if (
            newLeft >=
            that.linearSliderBar.offsetWidth -
              newGradientSlider.offsetWidth / 2 -
              1
          ) {
            that.currentSelectedSliderObj.positionX =
              that.linearSliderBar.offsetWidth
          } else {
            that.currentSelectedSliderObj.positionX = newLeft
          }
          that.setLinearGradient()
  
          if (newLeft <= newGradientSlider.offsetWidth / 2) {
            newLeft = newGradientSlider.offsetWidth / 2
          } else if (
            newLeft >=
            that.linearSliderBar.offsetWidth -
              newGradientSlider.offsetWidth / 2 -
              1
          ) {
            newLeft =
              that.linearSliderBar.offsetWidth - newGradientSlider.offsetWidth / 2
          }
          newGradientSlider.style.left = newLeft + 'px'
        }
      }
  
      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    },
  
    // 获取线性渐变值
    setLinearGradient() {
      // 清洗数据
      this.gradientDIVList = this.sortAndDistance(this.gradientDIVList)
      let colorL = `${this.gradientDIVList
        .map((obj) => `${obj.color} ${obj.percentages}%`)
        .join(', ')}`
      let g = `linear-gradient(${this.currentDegree}deg, ${colorL})`
      this.linearSliderBar.style.background = `linear-gradient(${90}deg, ${colorL})`
      this.showLinear.style.background = g
      if (this.currentColorModule.isEqualNode(this.showLinear)) {
        this.colorInput.style.fontSize = '12px'
        this.colorInput.value = g
      }
      if (this.currentColorModule.isEqualNode(this.showLinear)) {
        this.getCurrentColor(this.colorInput.value)
        this.ele.style.background = this.colorInput.value
      }
    },
  
    // 删除选中滑块的函数
    deleteSelectedSlider() {
      if (!this.currentColorModule.isEqualNode(this.showLinear)) {
        console.error('当前颜色模式不是线性渐变')
        return
        // throw "当前颜色模式不是线性渐变";
      }
      if (this.gradientDIVList.length > 2) {
        if (!this.currentSelectedSlider) {
          // 获取到最后一个元素
          let dele = this.gradientDIVList.pop()
          this.linearSliderBar.removeChild(dele.slider)
        } else if (this.currentSelectedSlider) {
          let index = this.gradientDIVList.findIndex((sliderObj) =>
            sliderObj.slider.isEqualNode(this.currentSelectedSlider)
          )
          if (index !== -1) {
            this.linearSliderBar.removeChild(this.currentSelectedSlider)
            this.gradientDIVList.splice(index, 1)
            this.currentSelectedSlider = null
          }
        }
        this.setLinearGradient() // 更新渐变条
      } else {
        console.error('最少两个滑块')
        return
      }
    },
  
    // 选择渐变方向
    rotateGradient(deg = 90) {
      if (
        !this.currentColorModule.isEqualNode(this.showLinear) &&
        !this.eleColor.includes('linear-gradient')
      ) {
        console.error('当前颜色模式不是线性渐变')
        return
        // throw "当前颜色模式不是线性渐变";
      }
      // 旋转
      this.currentDegree = (this.currentDegree + deg) % 360
      this.setLinearGradient()
    },
  
    /**
     * ============================ 底部的颜色历史记录功能 ============================
     * 1. 点击拾色器，取到颜色后，关闭拾色器
     * 2. 将取到的颜色赋给色板和input框
     * 3. 有历史记录功能
     */
  
    /**
     * 拾色器添加历史颜色
     * @param {*} color 颜色值
     */
    addAbsorbHistoryColor(color) {
      // 添加到队列
      this.absorbHistoryColorQueue.enQueue(color)
      // 显示到页面中
      this.absorbHistoryColorQueue.getQueue().forEach((color, index) => {
        this.colorPickerBottomAbsorbArray[index].style.backgroundColor = color
      })
    },
  
    /**
     * ============================ 输入、出框功能 ============================
     * 1. 支持RGB、HEX、HSL、HSB格式输入
     * 2. 输入后，进行格式统一转换成HEX格式
     * 3. 右击复制功能
     */
  
    /**
     * 复制到剪切板
     * @param {*} text 需要复制的文本
     */
    copyToClipboard(text) {
      let input = this.colorInput // 获取input元素
      let inputValue = input.value // 保存当前input的值
      navigator.clipboard.writeText(text).then(
        function () {
          alert('复制成功')
          input.value = inputValue // 恢复input的值
        },
        function (err) {
          alert('复制失败')
          console.log('Async copy failed: ', err)
          return
        }
      )
    },
    // 销毁
    destroy() {
      this.controllerShow.remove()
    },
  }
  
  // window.XLColorPicker = XLColorPicker;
  
  export default XLColorPicker
  