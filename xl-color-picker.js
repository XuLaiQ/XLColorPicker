//  循环队列存储历史颜色
class ColorCircularQueue {
    /**
     * 构造函数，初始化
     * @param {*} k 队列容量
     */
    constructor(k) {
        // 容量
        this.capacity = k;
        // 存储数据的数组
        this.elements = new Array(k);
        // 队尾指针
        this.rear = -1;
        // 队首指针
        this.front = 0;
        // 记录队列中元素的数量
        this.count = 0;
    }

    /**
     * 插入元素
     * @param {*} value 插入值
     */
    enQueue(value) {
        if (this.count === this.capacity) {
            // 队列已满，移除第一个元素
            this.front = (this.front + 1) % this.capacity;
        } else {
            // 增加计数
            this.count++;
        }
        // 插入新元素到数组末尾
        this.rear = (this.rear + 1) % this.capacity;
        this.elements[this.rear] = value;
    }

    // 移除队首元素
    deQueue() {
        if (this.isEmpty()) {
            return false;
        }
        // 将 front 移动到下一个元素
        this.front = (this.front + 1) % this.capacity;
        // 减少计数
        this.count--;
        return true;
    }

    // 获取队首元素
    Front() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.elements[this.front];
    }

    // 获取队尾元素
    Rear() {
        if (this.isEmpty()) {
            return -1;
        }
        return this.elements[this.rear];
    }

    /**
     * 判断队列是否为空
     * @returns 布尔值
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * 判断队列是否已满
     * @returns 布尔值
     */
    isFull() {
        return this.count === this.capacity;
    }

    /**
     * 清除队列
     */
    clear() {
        this.elements = new Array(this.capacity);
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    /**
     * 打印队列
     * @returns 直接输出
     */
    print() {
        console.log('队列中元素：');
        if (this.isEmpty()) {
            console.log('队列为空');
            return;
        }
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += this.elements[(this.front + i) % this.capacity] + ' ';
        }
        console.log(str);
    }

    /**
     * 获取队列
     * @returns 数组格式（当前队列中的所有元素） 
     */
    getQueue() {
        let temArray = new Array(this.capacity);
        if (this.isEmpty()) {
            console.log('队列为空');
            return;
        }
        for (let i = 0; i < this.count; i++) {
            temArray[i] = this.elements[(this.front + i) % this.capacity];
        }
        return temArray;
    }
}

/**
 * ============================ 颜色格式转换功能 ============================
 * 根据参数将颜色转换为对应的颜色格式（暂时只支持HEX/RGB/RGBA/HSL/HSLA）
 * @param {string} options.color 待转换的颜色值
 * @param {string} options.format 转换颜色的格式
 */
let colorFormat = function (options) {
    return new _colorFormat(options);
};
let _colorFormat = function (options) {
    let result,
        color = options && options.color && options.color.replace(/\s/g, "").toLowerCase() || "#fff", // color ：默认值为 "#fff"
        format = options && options.format && options.format.replace(/\s/g, "").toLowerCase() || "rgb", // format ：默认值为 "rgb"
        rgbType = format.indexOf("rgba") == -1 ? 0 : 1, // rgbType 0表示rgb，1表示rgba
        hslType = format.indexOf("hsla") == -1 ? 0 : 1; // hslType 0表示hsl，1表示hsla
    if (color.indexOf("#") > -1) {
        if (format == "hex") { // hex 转 hex
            result = this.hexToRgb(color);
            result = this.rgbToHex(result);
        } else if (format.indexOf("rgb") > -1) { // hex 转 rgb/rgba
            result = this.hexToRgb(color, rgbType);
        } else if (format.indexOf("hsl") > -1) { // hex 转 hsl/hsla
            result = this.hexToRgb(color);
            result = this.rgbToHsl(result, hslType);
        }
    } else if (color.indexOf("rgb") > -1) {
        result = this.getRgb(color, rgbType); // rgb 转 rgb/rgba
        if (format == "hex") { // rgb/rgba 转 hex
            result = this.rgbToHex(result);
        } else if (format.indexOf("hsl") > -1) { // rgb/rgba 转 hsl
            result = this.rgbToHsl(result, hslType);
        }
    } else if (color.indexOf("hsl") > -1) {
        result = this.getHsl(color, hslType);
        result = this.hslToRgb(result, rgbType); // hsl 转 rgb/rgba
        if (format == "hex") { // hsl 转 hex
            result = this.rgbToHex(result);
        } else if (format.indexOf("hsl") > -1) { // hsl 转 hsl/hsla
            result = this.rgbToHsl(result, hslType);
        }
    } else {
        let defineColor = this.defineColor,
            resultRgb;
        for (let i = 0, len = defineColor.length; i < len; i++) {
            if (color == defineColor[i].name) {
                resultRgb = defineColor[i].hex;
                break;
            }
        }
        if (resultRgb && resultRgb.length > 0) {
            if (format == "hex") { // hex 转 hex
                result = this.hexToRgb(resultRgb);
                result = this.rgbToHex(result);
            } else if (format.indexOf("rgb") > -1) { // hex 转 rgb/rgba
                result = this.hexToRgb(resultRgb, rgbType);
            } else if (format.indexOf("hsl") > -1) { // hex 转 hsl/hsla
                result = this.hexToRgb(resultRgb);
                result = this.rgbToHsl(result, hslType);
            }
        } else {
            alert("参数color暂未定义");
        }
    }
    return result;
};
_colorFormat.prototype = {
    constructor: this,
    defineColor: [
        { name: "red", hex: "#f00" },
        { name: "orange", hex: "#ffa500" },
        { name: "yellow", hex: "#ff0" },
        { name: "green", hex: "#0f0" },
        { name: "cyan", hex: "#0ff" },
        { name: "blue", hex: "#00f" },
        { name: "violet", hex: "#ee82ee" },
        { name: "black", hex: "#000" },
        { name: "white", hex: "#fff" }
    ],
    getRgb: function (rgb, type) {
        /**
         * 传入字符串的rgb，如 "rgb(255,0,255)" ，获取rgb的各个参数值
         */
        rgb = rgb.toLowerCase();
        let flag = rgb.indexOf("rgba") == -1 ? 0 : 1; // flag 0表示rgb，1表示rgba
        rgb = flag ? rgb.replace("rgba", "") : rgb.replace("rgb", "");
        rgb = rgb.replace(/\s/g, "").split(",");
        let red = Number(rgb[0].slice(1)),
            green = Number(rgb[1]),
            blue = flag ? Number(rgb[2]) : Number(rgb[2].slice(0, -1)),
            opacity = flag ? (Number(rgb[3].slice(0, -1)) > 1 ? 1 : Number(rgb[3].slice(0, -1))) : 1;
        return {
            r: red,
            g: green,
            b: blue,
            o: opacity,
            complete: type ?
                ("rgba(" + [red, green, blue, opacity].join(",") + ")") :
                ("rgb(" + [red, green, blue].join(",") + ")")
        }
    },
    getHsl: function (hsl, type) {
        /**
         * 传入字符串的hsl，如 "hsl(300,100%,50%)" ，获取hsl的各个参数值
         */
        hsl = hsl.toLowerCase();
        let flag = hsl.indexOf("hsla") == -1 ? 0 : 1; // flag 0表示hsl，1表示hsla
        hsl = flag ? hsl.replace("hsla", "") : hsl.replace("hsl", "");
        hsl = hsl.replace(/\s/g, "").split(",");
        let h = Number(hsl[0].slice(1)),
            s = parseInt(hsl[1]),
            l = flag ? parseInt(hsl[2]) : parseInt(hsl[2].slice(0, -1)),
            opacity = flag ? (Number(hsl[3].slice(0, -1)) > 1 ? 1 : Number(hsl[3].slice(0, -1))) : 1;
        return {
            h: h,
            s: s / 100,
            l: l / 100,
            o: opacity,
            complete: type ?
                ("hsla(" + [h, s, l, opacity].join(",") + ")") :
                ("hsl(" + [h, s, l].join(",") + ")")
        }
    },
    rgbToHex: function (rgb) {
        /**
         * 传入通过getRgb获取的rgb对象，将其转换为hex格式
         */
        let red = Number(rgb.r).toString(16),
            green = Number(rgb.g).toString(16),
            blue = Number(rgb.b).toString(16),
            opacity = Math.round(rgb.o * 255).toString(16),
            simpleType = 0; // 转换之后的HEX是否可以简化，也就是说6位转为3位，或者8位转为4位
        red.length < 2 && (red = 0 + red);
        green.length < 2 && (green = 0 + green);
        blue.length < 2 && (blue = 0 + blue);
        opacity.length < 2 && (opacity = 0 + opacity);
        red[0] == red[1] && green[0] == green[1] && blue[0] == blue[1] && opacity[0] == opacity[1] && (simpleType = 1);
        return {
            r: red,
            g: green,
            b: blue,
            o: opacity,
            complete: simpleType ?
                ("#" + red[0] + green[0] + blue[0] + (rgb.o == 1 ? "" : opacity)) :
                ("#" + red + green + blue + (rgb.o == 1 ? "" : opacity))
        }
    },
    rgbToHsl: function (rgb, type) {
        /**
         * 传入通过getRgb获取的rgb对象，将其转换为hsl格式
         */
        let r = Number(rgb.r) / 255,
            g = Number(rgb.g) / 255,
            b = Number(rgb.b) / 255,
            o = Number(rgb.o),
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l < 0.5 ? d / (max + min) : d / (2 - max - min);
            switch (max) {
                case r: h = (g - b) / d; break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h = h * 60;
            h = h < 0 ? h + 360 : h;
        }
        h = Math.round(h);
        s = Math.round(s * 100) + "%";
        l = Math.round(l * 100) + "%";
        return {
            h: h,
            s: s,
            l: l,
            o: o,
            complete: type ?
                ("hsla(" + [h, s, l, o].join(",") + ")") :
                ("hsl(" + [h, s, l].join(",") + ")")
        }
    },
    hexToRgb: function (hex, type) {
        /**
         * 传入hex格式，如 "#ff00ff" ，转换为rgb格式
         */
        hex = hex.replace("#", "");
        let red, green, blue, opacity;
        let hexsplit = hex.split("");
        if (hex.length == 3) {
            red = parseInt(hexsplit[0] + hexsplit[0], 16);
            green = parseInt(hexsplit[1] + hexsplit[1], 16);
            blue = parseInt(hexsplit[2] + hexsplit[2], 16);
            opacity = 1;
        } else if (hex.length == 4) {
            red = parseInt(hexsplit[0] + hexsplit[0], 16);
            green = parseInt(hexsplit[1] + hexsplit[1], 16);
            blue = parseInt(hexsplit[2] + hexsplit[2], 16);
            opacity = Math.round(parseInt(hexsplit[3] + hexsplit[3], 16) / 255 * 100) / 100;
        } else if (hex.length == 6) {
            red = parseInt(hexsplit[0] + hexsplit[1], 16);
            green = parseInt(hexsplit[2] + hexsplit[3], 16);
            blue = parseInt(hexsplit[4] + hexsplit[5], 16);
            opacity = 1;
        } else if (hex.length == 8) {
            red = parseInt(hexsplit[0] + hexsplit[1], 16);
            green = parseInt(hexsplit[2] + hexsplit[3], 16);
            blue = parseInt(hexsplit[4] + hexsplit[5], 16);
            opacity = Math.round(parseInt(hexsplit[6] + hexsplit[7], 16) / 255 * 100) / 100;
        }
        return {
            r: red,
            g: green,
            b: blue,
            o: opacity,
            complete: type ?
                ("rgba(" + [red, green, blue, opacity].join(",") + ")") :
                ("rgb(" + [red, green, blue].join(",") + ")")
        }
    },
    hslToRgb: function (hsl, type) {
        /**
         * 传入通过getHsl获取的Hsl对象，将其转换为rgb格式
         */
        let h = Number(hsl.h),
            s = Number(hsl.s),
            l = Number(hsl.l),
            o = Number(hsl.o),
            r, g, b;
        if (s == 0) {
            r = g = b = l;
        } else {
            let temp2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
                temp1 = 2 * l - temp2;
            h /= 360;
            let hue2rgb = function (p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            r = hue2rgb(temp1, temp2, h + 1 / 3);
            g = hue2rgb(temp1, temp2, h);
            b = hue2rgb(temp1, temp2, h - 1 / 3);
        }
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        return {
            r: r,
            g: g,
            b: b,
            o: o,
            complete: type ?
                ("rgba(" + [r, g, b, o].join(",") + ")") :
                ("rgb(" + [r, g, b].join(",") + ")")
        }
    }
};
// 最后将插件对象暴露给全局对象
// window.colorFormat = colorFormat;


// =================================================================

// 初始化参数
let option = {
    isShow: false,  // 是否显示取色器
    canMove: true,  // 是否可以拖拽取色器
    isDragging: false,  // 是否正在拖拽
    startX: 0,  // 鼠标按下时的X坐标
    startY: 0,  // 鼠标按下时的Y坐标

    id: '',  // 传入的DOM  id
    ele: null,  // id对应的DOM对象
    eleWidth: 30, // 对应DOM的宽度
    eleHeight: 30, // 对应DOM的高度
    eleColor: '#d8d8d8',  // 对应DOM的颜色

    pickerWidth: 300,  // 颜色选择器宽度
    pickerHeight: 500,  // 颜色选择器高度

    curruntColorModule: "",  // 当前选择的是原色还是渐变色
    currentColor: '',  // 记录当前的颜色
    bottomHistory: 9, // 底部历史记录条数
    absorbHistory: 2, // 吸管取色历史记录条数

    sliderBarWidth: 0,  // 渐变条宽度
    gradientDIVList: [],  // 渐变条操作数组
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
    currentDegree: 180,  // 渐变方向，默认为从上到下

    colorPanelCursorLabel: false,  // 色板的游标取色功能
    colorPickerBottomSaturationLabel: false,  // 色阶柱选择功能
    colorPickerBottomAlphaLabel: false,  // 透明度选择功能

    originalColor: "#ff0000",  // 原始颜色
    leftSliderColor: "#ff0000",  // 渐变条左侧滑块颜色
    rightSliderColor: "#0900f5", // 渐变条右侧滑块颜色

    // 获取到输入框的值
    getCurrentColor: function (color) { },
}

// 构造函数
function XLColorPicker(options) {
    // 合并参数
    this.option = Object.assign(option, options);
    Object.keys(this.option).forEach(key => {
        this[key] = this.option[key];
    });

    this.init();
}

// 原型方法
XLColorPicker.prototype = {
    // 初始化
    init() {
        // 先初始化DOM
        this.initDom();

        // 初始化事件
        this.initEvent();
        // 初始化取色器块
        this.initmodule();

        // 给dom元素绑定事件
        this.bindEvent();

        // 给渐变条添加两个滑块
        this.addGradientSlider(0, this.leftSliderColor);
        this.addGradientSlider(this.sliderBarWidth, this.rightSliderColor);

        /**
         * ============================ 色板的游标取色功能 ============================
         * 1. 拖拽取色功能
         * 2. 点击取色功能
         * colorPanelCursor
         * return 将取到的颜色值返回到选中的展示块上，和将其以hex格式输出到inout框中
         */
        this.mousedown(this.colorPanel, this.colorPanelCursor, this.colorPanelCursorLabel)
        /**
         * ============================ 色阶柱选择功能 ============================
         * 1. 点击或者拖拽色阶柱
         * 2. 实现色板、展示板、输出值的实时改变
         */
        this.mousedown(this.colorPickerBottomSaturation, this.colorPickerBottomSaturationSlide, this.colorPickerBottomSaturationLabel)

        /**
         * ============================ 透明度选择功能 ============================
         * 1. 点击透明度条，控制当前颜色的透明度
         * 2. 有拖拽功能
         * 3. 展示块颜色会随着该值的改变而改变
         */
        this.mousedown(this.colorPickerBottomAlpha, this.colorPickerBottomAlphaSlide, this.colorPickerBottomAlphaLabel);
    },

    // 设置指定页面的操作块
    initmodule() {
        let that = this;

        // 获取颜色选择器对应的DOM对象
        this.ele = document.querySelector(this.id);

        // 添加样式
        this.ele.style.cursor = "pointer";
        this.ele.style.width = this.eleWidth + "px";
        this.ele.style.height = this.eleHeight + "px";
        this.ele.style.backgroundColor = this.eleColor;

        // 添加点击事件
        this.ele.addEventListener('click', function (e) {
            // 获取坐标
            that.startX = that.ele.offsetWidth + that.ele.getBoundingClientRect().left + 10;
            that.startY = that.ele.getBoundingClientRect().top;

            // 显示取色器
            that.isShow = !that.isShow;

            // 根据isShow的值显示或隐藏取色器
            that.isShow ? that.show() : that.hide();

            // 更新位置
            that.checkPosition(that.startX, that.startY);
        })
    },


    // 获取DOM的随机ID
    getRandomId(len = 8) {
        var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz";
        // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        var maxPos = chars.length;
        var pwd = "";
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },


    // 初始化dom
    initDom() {
        let temColorPicker = document.createElement("div");
        let html = `
                <!-- 颜色选择器 -->
                <div class="xl-color-picker">

                    <!-- 标题 -->
                    <div class="xl-color-picker-title">
                    <label>颜色</label>
                    <label class="xl-color-picker-close">X</label>
                    </div>

                    <!-- 原色还是线性渐变选择模块 -->
                    <div class="xl-color-picker-type">
                    <!-- 原色 -->
                    <div class="xl-color-picker-type-item xl-color-picker-type-item-color" data-type="color" id="show-original"></div>
                    <!-- 渐变色 -->
                    <div class="xl-color-picker-type-item xl-color-picker-type-item-linear" data-type="linear" id="show-linear"></div>
                    </div>

                    <!-- 渐变条操作 -->
                    <div class="xl-color-picker-linear-slider">
                    <!-- 整个渐变条 -->
                    <div class="xl-color-picker-linear-slider-bar">
                    </div>
                    <!-- 按钮新增-减少 -->
                    <div class="xl-color-picker-linear-slider-button">
                        <!-- <button class="add">+</button> -->
                        <button class="decline">-</button>
                    </div>

                    <!-- 渐变方向旋转 -->
                    <div class="xl-color-picker-linear-slider-rotate">
                               <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAgCAYAAACVU7GwAAAAAXNSR0IArs4c6QAAA6hJREFUWEe9mF+IVFUcx3+/M+sisW5K+7IPEayQSQjKvoSk5FMa5J+X8jUjKsGHnZ3zu3sT2VGEnfM7I0uCySKohJBgf8DAiiKiiHrKEBJZBDXIHnSpJV3Bdc6vPUt3u3Nndu697s6clwtzfuf7+8y55/z+XIQcg5lfAYCdALBJRPoQ8SkAeAIR74rIFAD45zkR+XpkZOT3HNJ1ppi2cHR0tLenp+eAc24fIg6k2cfmP0fE41rrb3KsmTdtCcXM7wLAAQBYn1c4Zn8WAN4nol+zaiwKZYw5hojFrEIpdn97La31mSx6TaGY+QoAbGgi8BcAfOuc+xgAfnPO3S4UCg+dc4NKqUFEHBQR/3y2mXMRORwEQTkNrAGKme8AQF9i4W0ROdXd3T0xNDT0Z5qotfZtAKiIyOomtq8R0YVWGnVQzPw9AGxJLPjQOXco720aHx9fPTs7+ykAbMsLtgBljDmKiAfjAohY1lofTtuZVvPGmN2I+FnC5kpXV9cLxWLxQbO181DGmPVKqZ9FpDdm9BMRbV4KULTWGKMRkRNaARElf/s/JDDzBwDgr//8EJF7zrmtYRheXg4or2GtvSgir8b0/lBKbSyVSneTPnDu6q9CxFtzsWRNNImI72mtx5YLyOtUKpUNSqkfAODJmO6bRHS6Acpau0dE/IGMdmkyCIJ1ywkUaTHzSQB4J6Z9kYh2NUAx83kAeD02cYyISu2AqlQqe5VSH8W1iaghLPnX9wsibooMa7XatjAMv2sHVLVafcY5d23uba6M9JVSz5dKpatxf8jMPps/Hf1YKBTWDQ8PT7YDymsy8xcAsD2m3xBMPdR9X37EzlRvEAT/LBXKWrvXOfdcUkcpJSKykGp86ml2ptoC5R0ZY/Yj4omcf/Cttr8+a+1BETmaEaxIROMdOegZy6BRIjri4f1OdSQkWGtPi8gbi+xYlYh0NIcdDp4+Me9OgJ0lojrYjqUZDzIxMbFienr6q1g5c2lmZmZXuVx+VBen/osdbU/IkdNqtdrnnPNgtVqt9nIYhr6arRsdKV2STpl5rScKw/BmszPWssjLWlNnvO6ZzdpWDnuCsbGxlx4nj7arcdgDACUR8ZXri0T0Y+ZtWqwZzdNi9ff335+amhpwzg34Dto5tx0RdyQgdhDRl1nBOtWMep7U1moheLaiX6a2/SQR7c+6S/NpJs14CR84PkHEI1pr323nGqlQcbVFPgWtAIBJEZlExOsAcAMRbz7O15bI17/4ccRN1QbYSQAAAABJRU5ErkJggg=="
                                    alt="Base64 Image" width="20px" id="rotate" />
                    </div>
                    </div>


                    <!-- 颜色面板 -->
                    <div class="xl-color-picker-panel">
                    <!-- 白色 黑色背景 -->
                    <div class="xl-color-picker-panel-white"></div>
                    <div class="xl-color-picker-panel-black"></div>
                    <!-- 游标 -->
                    <div class="xl-color-picker-panel-cursor"></div>
                    </div>

                    <!-- 颜色选择器底部 -->
                    <div class="xl-color-picker-bottom">
                    <!-- 左边 吸取颜色 -->
                    <div class="xl-color-picker-bottom-left">
                        <!-- 吸取颜色图标 -->
                        <div class="xl-color-picker-bottom-left-absorb">
                                  <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAaVJREFUWEftli9PxDAYxp9OEiQGhQYklmBwmK293HkU4SOQYOEzkBOEP45L1tXwAfBIQKMwaNzthZJrUo52HV13Z2gy1WW/p8/7vk/HsOTFlszHv4DeHBBCrBPRrpRy0lTmXgQURbHDGLsFsAlgIqUc+UR0EpDn+VaWZVxKeWYAQog9IroBsGFBvSKiBczgd18n3AZwLKW8yPP8IMuyawBrjhM7RUQLEEKcENG5BdI2XwFY8dlNREdVVY3t/WgB+iOc80MAly2z5IUxtl+W5VtKAUMAugyh9UpEg6qqHudfjHaAc94W/s4YG5Rl+eBSGSXAAdezrp95Nz7quh4qpe6TjaELbubcsTdKGkRN8FlTagd0aez1PaKdHYiEG+6pHVZ/noIIuM6E1dmIPtV1PVJKPUc1YQzc1F2H1XQ6VT64FtQ4BV3goWAw+14Bi4B7HVgU3ClgkXCfAPLd45zz+TkPBk2oF371AOfcCPhxf/cBb+1AX/A2AvQ7+pKx47Wz7Y1JaJXAVb6k8LYOGCHJ4cEkDHVwiv2oH5IU4GAUp4Q0fWvpDnwCEdzjIQcHB4wAAAAASUVORK5CYII="
                                    alt="Base64 Image" width="30px" id="absorb" />
                        </div>
                        <!-- 颜色方块 上面展示吸取颜色（白色） 下面显示历史颜色（黑色） -->
                        <div class="xl-color-picker-bottom-left-color">
                        <div class="xl-color-picker-bottom-left-color-top absorb-history"></div>
                        <div class="xl-color-picker-bottom-left-color-bottom absorb-history"></div>
                        </div>
                    </div>

                    <!-- 右边 色阶柱和透明度柱 -->
                    <div class="xl-color-picker-bottom-right">
                        <!-- 色阶 -->
                        <div class="xl-color-picker-bottom-right-saturation">
                        <!-- 色阶滑块 -->
                        <div class="xl-color-picker-bottom-right-saturation-slide"></div>
                        </div>
                        <!-- 透明度 -->
                        <div class="xl-color-picker-bottom-right-alpha">
                        <!-- 背景色 -->
                        <div class="xl-color-picker-bottom-right-alpha-show"></div>
                        <!-- 透明度滑块 -->
                        <div class="xl-color-picker-bottom-right-alpha-slide"></div>
                        </div>
                    </div>
                    </div>

                    <!-- 颜色输出和输入框 支持输入RGB, HEX, HSL, HSB, 输出统一为 HEX -->
                    <div class="xl-color-picker-input">
                    <!-- 输入框 输出框 -->
                    <input class="xl-color-picker-input-color" placeholder="输入颜色值，如：#fff" spellcheck="false" />
                    </div>

                    <!-- 历史颜色展示 -->
                    <div class="xl-color-picker-history">
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    <div class="xl-color-picker-history-color"></div>
                    </div>
                    <!-- 底部留白 -->
                    <div class="xl-color-picker-bottom-blank"></div>
                </div>
            `

        let css = `
            /* 使用flex布局 */
            /* 主体标签 */
            .xl-color-picker {
                --bg: linear-gradient(45deg, rgba(0, 0, 0, 0.4) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.4)),
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

            .xl-color-picker.canmove {
                cursor: move;
            }

            /* =========标题标签========= */
            .xl-color-picker .xl-color-picker-title {
                flex: 0.6;
                padding: 10px;
                font-weight: bold;
                border-bottom: 1px solid #ccc;
                user-select: none;
            }

            .xl-color-picker .xl-color-picker-close {
                float: right;
                cursor: pointer;
            }

            /* =========原色还是线性渐变选择模块========= */
            .xl-color-picker .xl-color-picker-type {
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
            .xl-color-picker .xl-color-picker-type-item {
                border-radius: 10% 10%;
                height: 75%;
                width: 10%;
                margin-left: 10%;
                cursor: pointer;
            }

            /* 原色 */
            .xl-color-picker .xl-color-picker-type-item-color {
                background-color: #d8d8d8;
            }

            /* 渐变色 */
            .xl-color-picker .xl-color-picker-type-item-linear {
                margin-left: 10%;
            }


            .xl-color-picker .xl-color-picker-type-item-color::after,
            .xl-color-picker .xl-color-picker-type-item-linear::after {
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

            .xl-color-picker .xl-color-picker-type-item-linear::after {
                left: 27.2%;
            }

            .xl-color-picker .xl-color-picker-type-item.active::after {
                display: block;
            }

            /* =========渐变条操作========= */
            .xl-color-picker .xl-color-picker-linear-slider {
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                background-color: #fafafa;
            }

            /* 渐变条 */
            .xl-color-picker .xl-color-picker-linear-slider-bar {
                width: 70%;
                margin: 0 1%;
                height: 1rem;
                border-radius: 1rem;
                position: relative;
                cursor: pointer;
                /* border: 1px solid #ccc; */
            }

            .xl-color-picker .xl-color-picker-linear-slider-bar-slide {
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
            .xl-color-picker .slider-selected {
                /* 增大阴影以突出显示 */
                box-shadow: 0 0 0 5px #fff,
                    inset 0 0 2px 2px rgb(0 0 0 / 0%),
                    0 0 4px 4px rgb(0 0 0 / 70%);

                transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
            }

            /* 添加和减少按钮 */
            .xl-color-picker .xl-color-picker-linear-slider-button {
                display: flex;
                flex-direction: row;
                width: auto;
                margin-left: 3%;
                user-select: none;
            }

            .xl-color-picker .xl-color-picker-linear-slider-button .add,
            .xl-color-picker .xl-color-picker-linear-slider-button .decline {
                cursor: pointer;
            }

            .xl-color-picker .xl-color-picker-linear-slider-button .decline {
                margin-left: 10%;
            }

            /* 旋转 */
            .xl-color-picker .xl-color-picker-linear-slider-rotate {
                margin-left: 5%;
                margin-top: 1%;
                cursor: pointer;
                user-select: none;
            }

            /* =========颜色面板========= */
            .xl-color-picker .xl-color-picker-panel {
                flex: 5;
                width: 100%;
                position: relative;
                background-color: #ff0000;
                cursor: pointer;
            }

            /* 黑白背景 */
            .xl-color-picker .xl-color-picker-panel>.xl-color-picker-panel-white,
            .xl-color-picker .xl-color-picker-panel>.xl-color-picker-panel-black {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
            }

            .xl-color-picker .xl-color-picker-panel-white {
                background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
            }

            .xl-color-picker .xl-color-picker-panel-black {
                background: linear-gradient(0deg, #000, transparent);
            }

            /* 游标 */
            .xl-color-picker .xl-color-picker-panel-cursor {
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
            .xl-color-picker .xl-color-picker-bottom {
                flex: 0.5;
                display: flex;
                flex-direction: row;
                margin-top: 3%;
                margin-bottom: 3%;
            }

            /* 颜色选择器底部左侧 */
            .xl-color-picker .xl-color-picker-bottom-left {
                flex: 2;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }

            /* 拾色器 */
            .xl-color-picker .xl-color-picker-bottom-left-absorb {
                cursor: pointer;
                width: 100%;
                height: 50%;
                background-color: #fff;
                user-select: none;
            }

            .xl-color-picker .xl-color-picker-bottom-left-absorb img {
                margin: 0 auto;
                margin-left: 20px;
            }

            .xl-color-picker .xl-color-picker-bottom-left-color {
                width: 100%;
                height: 100%;
            }

            .xl-color-picker .xl-color-picker-bottom-left-color-top,
            .xl-color-picker .xl-color-picker-bottom-left-color-bottom {
                width: 90%;
                height: 50%;
                margin: auto;
                border: 1px solid #ccc;
            }

            .xl-color-picker .xl-color-picker-bottom-left-color-top {
                background-color: #b3b3b3;
                border-top-left-radius: 20%;
                border-top-right-radius: 20%;
                border-bottom: none;
            }

            .xl-color-picker .xl-color-picker-bottom-left-color-bottom {
                background-color: #000;
                border-bottom-left-radius: 20%;
                border-bottom-right-radius: 20%;
                border-top: none;
            }

            /* 颜色选择器底部右侧 */
            .xl-color-picker .xl-color-picker-bottom-right {
                flex: 4;
                margin: 0 5%;
            }

            /* 色阶 */
            .xl-color-picker .xl-color-picker-bottom-right-saturation {
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

            .xl-color-picker .xl-color-picker-bottom-right-saturation-slide {
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
            .xl-color-picker .xl-color-picker-bottom-right-alpha {
                width: 100%;
                margin-top: 3%;
                height: 1rem;
                background: var(--bg);
                background-size: 10px 10px;
                background-position: 0 0, 5px 5px;
                border-radius: 1rem;
                position: relative;
                cursor: pointer;
            }

            .xl-color-picker .xl-color-picker-bottom-right-alpha-show {
                width: 100%;
                height: 1rem;
                border-radius: 1rem;
                background: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
            }

            .xl-color-picker .xl-color-picker-bottom-right-alpha-slide {
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
            .xl-color-picker .xl-color-picker-input {
                width: auto;
                flex: 0.6;
                display: flex;
                margin: 1% 2%;
            }

            .xl-color-picker .xl-color-picker-input-color {
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
            .xl-color-picker .xl-color-picker-history {
                flex: 0.7;
                display: flex;
                flex-direction: row;
                width: auto;
                margin: 1% 5%;
                align-items: center;
            }

            /* 历史颜色展示内部标签 */
            .xl-color-picker .xl-color-picker-history-color {
                border-radius: 10% 10%;
                height: 75%;
                width: 10%;
                margin-left: 1%;
                background-color: rgba(243, 242, 242, 0.277);
                border: 1px solid transparent;
            }

            /* 底部留白 */
            .xl-color-picker .xl-color-picker-bottom-blank {
                flex: 0.5;
            }
            `
        // 将html添加到页面中
        temColorPicker.innerHTML = html;
        temColorPicker.classList.add("controllerShow");

        let elementId = this.getRandomId();
        temColorPicker.id = elementId;

        // 创建style标签并添加到head中
        let style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);

        document.body.appendChild(temColorPicker);

        // 获取到操作的dom
        let dom = {
            controllerShow: document.querySelector(`#${temColorPicker.id}`),  // 父级div
            close: document.querySelector(`#${temColorPicker.id} .xl-color-picker-close`),  // 关闭
            colorPicker: document.querySelector(`#${temColorPicker.id} .xl-color-picker`),  // 颜色选择器
            // 原色还是线性渐变选择模块
            showOriginal: document.querySelector(`#${temColorPicker.id} #show-original`), // 原始颜色的dom
            showLinear: document.querySelector(`#${temColorPicker.id} #show-linear`), // 渐变色的dom
            // 渐变条操作
            linearSliderBar: document.querySelector(`#${temColorPicker.id} .xl-color-picker-linear-slider-bar`),  // 渐变条
            linearSliderBarSlide: document.querySelector(`#${temColorPicker.id} .xl-color-picker-linear-slider-bar-slide`),  // 渐变条滑块
            linearSliderBarSlideAdd: document.querySelector(`#${temColorPicker.id} .add`),  // 新增
            linearSliderBarSlideDecline: document.querySelector(`#${temColorPicker.id} .decline`),  // 减少
            rotate: document.querySelector(`#${temColorPicker.id} #rotate`),  // 渐变方向旋转

            // 颜色面板
            colorPanel: document.querySelector(`#${temColorPicker.id} .xl-color-picker-panel`),  // 颜色面板
            colorPanelCursor: document.querySelector(`#${temColorPicker.id} .xl-color-picker-panel-cursor`),  // 颜色面板游标

            // 颜色选择器底部
            colorPickerBottomAbsorb: document.querySelector(`#${temColorPicker.id} #absorb`), // 吸收图标
            colorPickerBottomAbsorbArray: document.querySelectorAll(`#${temColorPicker.id} .absorb-history`), // 吸收历史颜色
            colorPickerBottomSaturation: document.querySelector(`#${temColorPicker.id} .xl-color-picker-bottom-right-saturation`), // 色阶
            colorPickerBottomSaturationSlide: document.querySelector(`#${temColorPicker.id} .xl-color-picker-bottom-right-saturation-slide`), // 色阶滑块
            colorPickerBottomAlpha: document.querySelector(`#${temColorPicker.id} .xl-color-picker-bottom-right-alpha`), // 透明度
            colorPickerBottomAlphaSlide: document.querySelector(`#${temColorPicker.id} .xl-color-picker-bottom-right-alpha-slide`), // 透明度滑块

            // 颜色输出和输入框
            colorInput: document.querySelector(`#${temColorPicker.id} .xl-color-picker-input-color`),

            // 历史颜色列表展示
            historyColorArray: document.querySelectorAll(`#${temColorPicker.id} .xl-color-picker-history-color`),
        };

        // 将所有dom挂载到this上
        Object.keys(dom).forEach(key => this[key] = dom[key]);
    },

    // 初始化事件
    initEvent() {
        this.colorPicker.style.width = `${this.pickerWidth}px`
        this.colorPicker.style.height = `${this.pickerHeight}px`
        // 历史记录初始化
        this.historyColorQueue = new ColorCircularQueue(this.bottomHistory);
        this.absorbHistoryColorQueue = new ColorCircularQueue(this.absorbHistory);

        this.sliderBarWidth = this.linearSliderBar.offsetWidth;

        this.currentColor = this.originalColor;

        // 全局设置当前的模式，是原色还是渐变色
        this.curruntColorModule = this.showOriginal;
        this.curruntColorModule.classList.add('active');


        // 是否可以移动
        if (this.canMove) {
            this.colorPicker.classList.add("canmove");
        }
        // 最初是否显示
        this.isShow ? this.show() : this.hide();
    },

    // 显示
    show() {
        this.controllerShow.style.display = "block";
    },

    // 隐藏
    hide() {

        this.controllerShow.style.display = "none";
    },

    // 绑定事件
    bindEvent() {
        let that = this;

        // 颜色选择器拖动
        if (this.canMove) {
            this.colorPicker.addEventListener('mousedown', function (e) {
                if (getComputedStyle(e.target).cursor === 'move') {
                    // 记录鼠标按下时的位置
                    that.isDragging = true;
                    that.startX = e.clientX - that.colorPicker.getBoundingClientRect().left;
                    that.startY = e.clientY - that.colorPicker.getBoundingClientRect().top;
                }
            });

            document.addEventListener('mousemove', function (e) {
                if (that.isDragging) {
                    // 更新元素的位置
                    let x = e.clientX - that.startX;
                    let y = e.clientY - that.startY;
                    that.checkPosition(x, y);
                }
            });

            document.addEventListener('mouseup', function () {
                that.isDragging = false;
            });
        }

        // 点击不是颜色选择器的其他地方隐藏颜色选择器
        document.addEventListener('mousedown', function (e) {
            if (that.isShow) {
                if (e.target !== that.colorPicker && !that.colorPicker.contains(e.target) && e.target !== that.ele) {
                    that.hide();
                    that.isShow = !that.isShow;
                }
            }
        });

        // 关闭按钮
        this.close.addEventListener('click', function () {
            that.hide();
            that.isShow = !that.isShow;
        });

        // 为每个选择项添加点击事件监听器   选原色还是渐变色
        this.showOriginal.addEventListener('click', function () {
            that.curruntColorModule = this;
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
                that.showLinear.classList.remove('active');
            }
        });

        this.showLinear.addEventListener('click', function () {
            that.curruntColorModule = this;
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
                that.showOriginal.classList.remove('active');
            }
        });


        // =====================================================
        // 监听渐变条的点击事件
        this.linearSliderBar.addEventListener("click", function (e) {
            // 阻止冒泡
            e.stopPropagation();
            if (!that.curruntColorModule.isEqualNode(that.showLinear)) return;
            // 检查点击位置是否已经有滑块
            let clickPosition = e.clientX - that.linearSliderBar.getBoundingClientRect().left;
            that.addGradientSlider(clickPosition);
        });

        // 删除选中滑块的按钮
        this.linearSliderBarSlideDecline.addEventListener("click", function (e) {
            that.deleteSelectedSlider();
        });

        // 旋转按钮
        this.rotate.addEventListener("click", function (e) {
            //  默认旋转90度
            that.rotateGradient();
        });

        // ======================================
        // 实现拾色器功能
        this.colorPickerBottomAbsorb.addEventListener("click", () => {
            if (!window.EyeDropper) {
                resultElement.textContent = "你的浏览器不支持 EyeDropper API";
                return;
            }

            const eyeDropper = new EyeDropper();

            eyeDropper
                .open()
                .then((result) => {
                    console.log("取色", result.sRGBHex);
                    let resultColor = result.sRGBHex;
                    // 添加到历史记录
                    that.addAbsorbHistoryColor(resultColor);
                    that.addHistoryColor(resultColor);
                    // 赋值到输入框
                    that.setColorInputValue(resultColor);
                })
                .catch((e) => {
                    console.log("取色失败", e);
                });
        });


        // ===================================
        // 监听颜色输入框的失去焦点事件
        this.colorInput.addEventListener('blur', function (e) {
            // 获取输入框的值
            let color = that.colorInput.value;

            // 校验颜色格式，RGB、HEX、HSL、HSB、HSLA、RGBA格式
            if (!that.isValidColor(color.trim())) {
                that.colorInput.value = "";
                // 抛出异常
                throw Error("输入的颜色格式不正确");
            }
            console.log("dasdsad");


            // 颜色格式转换
            let hexColor = colorFormat({ color, format: 'hex' }).complete;

            if (hexColor === null || hexColor === undefined) {
                that.setColorInputValue("");
                // 提示错误信息
                throw Error("输入的颜色格式不正确");
            }

            // 设置input的值
            that.setColorInputValue(hexColor);

            let hsla = colorFormat({ color, format: 'hsla' }).complete;

            // 获取h,s,l,a
            let { hue, saturation, lightness, opacity } = that.extractHSLAValues(hsla);

            // 转换成百分比
            hue = (360 - hue) / 360 * 100;
            opacity = opacity * 100;

            // 预防滑块位置超出范围
            if (hue <= 4) {
                hue = 4;
            }
            if (opacity <= 4) {
                opacity = 4;
            }

            // 改变H色调柱滑块位置
            that.colorPickerBottomSaturationSlide.style.left = (hue === 100 ? 96 : hue) + "%";

            // 改变S,L位置,色板的游标位置
            that.colorPanelCursor.style.left = saturation + "%";
            that.colorPanelCursor.style.top = lightness + "%";

            // 改变A透明度滑块位置
            that.colorPickerBottomAlphaSlide.style.left = (opacity === 100 ? 96 : opacity) + "%";

            // 改变色板颜色
            that.colorPanel.style.backgroundColor = hsla;

            // 保存当前颜色
            that.currentColor = hsla;
        })

        // 监听右击事件
        this.colorInput.addEventListener('contextmenu', function (e) {
            // 阻止默认事件
            e.preventDefault();
            if (that.colorInput.value) {
                // 复制到剪切板
                that.copyToClipboard(that.colorInput.value);
            } else {
                alert('请输入颜色值');
            }
        })

    },

    // 取色器的位置不能超过浏览器窗口
    checkPosition(x, y) {
        // 获取屏幕的宽度和高度
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        // 获取元素的宽度和高度
        let colorPickerWidth = this.colorPicker.offsetWidth;
        let colorPickerHeight = this.colorPicker.offsetHeight;

        // 限制元素不超出屏幕的右边和底边
        let maxX = screenWidth - colorPickerWidth;
        let maxY = screenHeight - colorPickerHeight;

        // 设置元素的新位置，并确保它不超出屏幕
        this.colorPicker.style.left = Math.min(Math.max(0, x), maxX) + 'px';
        this.colorPicker.style.top = Math.min(Math.max(0, y), maxY) + 'px';
    },

    /**
     * 提取出hsla格式的字符串中的值
     * @param {*} str hsla格式的颜色值
     * @returns hue (色调),saturation (饱和度),lightness (亮度),opacity (透明度)
     */
    extractHSLAValues(str) {
        if (typeof str !== 'string') {
            throw Error('Invalid input type');
        }
        const regex = /hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d+(?:\.\d+)?)\)/;
        const match = str.match(regex);
        if (match) {
            return {
                hue: match[1],
                saturation: match[2],
                lightness: match[3],
                opacity: match[4]
            };
        } else {
            throw Error('Invalid hsla format');
        }
    },

    /**
     * 判断输入的颜色是否合法
     * @param {*} color 输入值 
     * @returns boolean
     */
    isValidColor(color) {
        // HEX 颜色格式
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        // RGB 颜色格式
        const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
        // RGBA 颜色格式
        const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0\.\d+)\)$/;
        // HSL 颜色格式
        const hslRegex = /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;
        // HSLA 颜色格式
        const hslaRegex = /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(0|1|0\.\d+)\)$/;
        // HSB/HSV 颜色格式 (假设输入的是 HSB，HSV 通常用在图形软件中)
        const hsbRegex = /^hsb\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/;

        return (
            hexRegex.test(color) ||
            rgbRegex.test(color) ||
            rgbaRegex.test(color) ||
            hslRegex.test(color) ||
            hslaRegex.test(color) ||
            hsbRegex.test(color)
        );
    },

    /**
     * 设置颜色输入框的值
     * @param {*} value 颜色值
     */
    setColorInputValue(value) {
        // 颜色块的背景颜色
        if (this.curruntColorModule === this.showOriginal) {
            this.colorInput.value = value;
            this.curruntColorModule.style.background = value;
        } else if (this.curruntColorModule === this.showLinear) {
            this.colorInput.style.fontSize = "12px";

            // 线性渐变
            if (this.currentSelectedSliderObj) {
                this.currentSelectedSliderObj.color = value;
                this.setLinearGradient();
            } else {
                console.log("没有选择滑块");
                throw Error("没有选择滑块");
            }
        }
        this.getCurrentColor(this.colorInput.value);

        this.ele.style.background = this.colorInput.value;
        // 更新当前颜色
        this.currentColor = value;
    },

    /**
     * 更新curruntColor当前颜色
     * @param {*} param0 h = 0, s, l, a = 1
     */
    updateCurrentColor({ h = 0, s, l, a = 1 }) {
        // 当前颜色转换成hsla格式
        let hsla = colorFormat({ color: this.currentColor, format: 'hsla' }).complete;

        let { hue, saturation, lightness, opacity } = this.extractHSLAValues(hsla);

        hue = h === 0 ? (hue === undefined ? h : hue) : h;
        saturation = s === undefined ? saturation : s;
        lightness = l === undefined ? lightness : l;
        opacity = a === 1 ? (opacity === undefined ? a : opacity) : a;

        let color = "hsla(" + hue + "," + saturation + "%," + lightness + "%," + opacity + ")";

        // 转换为hex格式
        color = colorFormat({ color, format: 'hex' }).complete;
        this.setColorInputValue(color);
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
        let s, l;
        s = Math.round(left / w * 100);

        l = Math.round(((top / h) * 100 + ((w - left) / w) * 100)) / 2;
        return { s, l };
    },

    /**
     * 更新滑块位置
     * @param {*} element 滑块元素
     * @param {*} left 左边距
     * @param {*} ...arg 高度
     */
    updatedSlidePosition(ele, slide, left, ...args) {
        let [top] = args;
        // 判断是否是dom节点元素
        if (!(slide instanceof Element) && !(ele) instanceof Element) return;
        let width = ele.offsetWidth;  // 当前元素的宽度
        let height = ele.offsetHeight; // 当前元素的高度
        // 获取h,s,l,a 当前颜色转换成hsla格式
        let hsla = colorFormat({ color: this.currentColor, format: 'hsla' }).complete;

        let { hue, saturation, lightness, opacity } = this.extractHSLAValues(hsla);

        // 色阶
        if (slide.isEqualNode(this.colorPickerBottomSaturationSlide)) {
            hue = Math.round(left / width * 360);
            this.updateCurrentColor({ h: hue });

            // 更新色板颜色
            let color = "hsla(" + hue + "," + 100 + "%," + 50 + "%," + 1 + ")";

            this.colorPanel.style.backgroundColor = color;
        }
        // 透明度
        else if (slide.isEqualNode(this.colorPickerBottomAlphaSlide)) {
            opacity = (left / width).toFixed(2);
            this.updateCurrentColor({ a: opacity });
            // 更新色板颜色
            let color = "hsla(" + hue + "," + saturation + "%," + lightness + "%," + opacity + ")";

            this.colorPanel.style.backgroundColor = color;
        }

        // 如果有top参数（传入height参数了）  画板
        if (top !== undefined) {
            let { s, l } = this.calculateSL(width, height, left, height - top);

            // 更新颜色值
            this.updateCurrentColor({ s: s, l: l });
            // 移动滑块
            if (top <= slide.offsetHeight / 2) {
                top = slide.offsetHeight / 2;
            }
            slide.style.top = top + "px";
        }

        // 判断滑块是否出界
        if (left <= slide.offsetWidth) {
            left = slide.offsetWidth / 2;
        } else if (left >= width) {
            left = width - (slide.offsetWidth / 2);
        }
        // 改变滑块的位置
        slide.style.left = left + "px";
    },

    /**
     * 鼠标移动事件
     * @param {*} e 鼠标事件
     * @param {*} ele 移动元素条
     * @param {*} slide 滑块元素
     * @param {*} availableLabel 是否可用
     */
    mousemove(e, ele, slide, availableLabel) {
        let that = this;
        if (!availableLabel) return;
        let width = ele.offsetWidth;  // 当前元素的宽度
        let height = ele.offsetHeight; // 当前元素的高度
        let left = e.clientX - ele.getBoundingClientRect().left;
        let right = e.clientX - ele.getBoundingClientRect().left - width;
        // 判断是否是色板
        if (ele.isEqualNode(that.colorPanel)) {
            let top = e.clientY - ele.getBoundingClientRect().top;
            let bottom = e.clientY - ele.getBoundingClientRect().top - height;
            if (left <= 0) {  // 最左
                if (top <= 0) {
                    that.updatedSlidePosition(ele, slide, 0, 0)
                }
                else if (bottom >= 0) {
                    that.updatedSlidePosition(ele, slide, 0, height)
                }
                else {
                    that.updatedSlidePosition(ele, slide, 0, top)
                }
            } else if (right >= 0) {  // 最右
                if (top <= 0) {
                    that.updatedSlidePosition(ele, slide, width, 0)
                }
                else if (bottom >= 0) {
                    that.updatedSlidePosition(ele, slide, width, height)
                }
                else {
                    that.updatedSlidePosition(ele, slide, width, top)
                }
            } else {  // 中间
                if (top <= 0) {
                    that.updatedSlidePosition(ele, slide, left, 0);
                } else if (bottom >= 0) {
                    that.updatedSlidePosition(ele, slide, left, height)
                } else {
                    that.updatedSlidePosition(ele, slide, left, top)
                }
            }
        }
        else {
            // 判断鼠标移动位置是否已经超出了box的范围，从而设置滑块的进度
            if (left <= 0) {  // 最左
                that.updatedSlidePosition(ele, slide, 0);
            } else if (right >= 0) {  // 最右
                that.updatedSlidePosition(ele, slide, width);
            } else {  // 中间
                that.updatedSlidePosition(ele, slide, e.clientX - ele.getBoundingClientRect().left);
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
        let that = this;
        ele.addEventListener('mousedown', function (e) {
            availableLabel = true;
            // 当前点击位置的相对于条的宽度
            let leftWidth = e.clientX - ele.getBoundingClientRect().left;


            document.addEventListener('mousemove', function (e) {
                that.mousemove(e, ele, slide, availableLabel);
            }, false);


            // 定义鼠标抬起的处理函数
            function mouseup(e) {
                availableLabel = false;
                // 解绑mousemove事件
                document.removeEventListener('mousemove', that.mousemove);
                // 解绑mouseup事件自身
                document.removeEventListener('mouseup', mouseup);
                // 添加到历史记录
                that.addHistoryColor(that.currentColor);
            }

            document.addEventListener('mouseup', mouseup, false);

            // 画板
            if (ele === that.colorPanel) {
                let top = e.clientY - ele.getBoundingClientRect().top;
                that.updatedSlidePosition(ele, slide, leftWidth, top)
                return;
            }
            // 色阶条或者透明度条 
            that.updatedSlidePosition(ele, slide, leftWidth)
        });
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
        this.historyColorQueue.enQueue(color);
        // 颜色列表  给dom元素设置背景颜色
        this.historyColorQueue.getQueue().forEach((color, index) => {
            this.historyColorArray[index].style.backgroundColor = color;
            this.historyColorArray[index].style.border = "1px solid #ccc";
        });
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
            return a.positionX - b.positionX;
        })
        // 计算滑块之间的距离
        list.map((obj) => {
            obj.percentages = Math.round((obj.positionX / this.sliderBarWidth) * 100);
        })

        return list;
    },


    /** 添加渐变滑块的函数
     * @param {*} position 渐变条的位置
     * @param {*} color 渐变条的颜色
     */
    addGradientSlider(position, color = '#fff') {
        let that = this;
        // 添加一个色块
        let newGradientSlider = document.createElement("div");
        newGradientSlider.addEventListener("click", function (e) {
            e.stopPropagation();

            // 删除所有的被选中状态
            that.gradientDIVList.map(item => {
                item.slider.classList.remove("slider-selected");
            })
            newGradientSlider.classList.add("slider-selected")
            that.currentSelectedSlider = newGradientSlider;
            that.gradientDIVList.forEach(obj => {
                if (obj.slider.isEqualNode(newGradientSlider)) {
                    that.currentSelectedSliderObj = obj;
                }
            });
        });
        newGradientSlider.classList.add("xl-color-picker-linear-slider-bar-slide");
        this.linearSliderBar.appendChild(newGradientSlider);

        // 添加到渐变条的数组中
        this.gradientDIVList.push({
            // 当前滑块
            'slider': newGradientSlider,
            // 滑块的默认颜色
            'color': color,
            // 距离渐变条的左侧距离
            'positionX': position,
            // 百分比
            'percentages': 0,
        });

        if (position === 0) {
            // position = newGradientSlider.offsetWidth / 2;
            position = 6;
        } else if (position >= this.sliderBarWidth) {
            position = this.sliderBarWidth - 9;
        }

        newGradientSlider.style.left = position + "px";

        this.setLinearGradient();

        // 拖动事件
        newGradientSlider.addEventListener('mousedown', function (e) {
            e.stopPropagation();
            if (!that.curruntColorModule.isEqualNode(that.showLinear)) {
                throw "当前颜色模式不是线性渐变";
            }
            newGradientSlider.classList.add("slider-selected")
            // 当前选择的滑块
            that.currentSelectedSlider = newGradientSlider;
            // 找出当前点击的滑块    获取到颜色值
            that.gradientDIVList.forEach(obj => {
                if (obj.slider.isEqualNode(newGradientSlider)) {
                    that.currentSelectedSliderObj = obj;
                }
            });
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            let newLeft = e.clientX - that.linearSliderBar.getBoundingClientRect().left;
            if (newLeft >= 0 && newLeft <= that.linearSliderBar.offsetWidth - newGradientSlider.offsetWidth / 2) {
                // 计算新的位置
                if (newLeft >= that.linearSliderBar.offsetWidth - newGradientSlider.offsetWidth / 2 - 1) {
                    that.currentSelectedSliderObj.positionX = that.linearSliderBar.offsetWidth
                } else {
                    that.currentSelectedSliderObj.positionX = newLeft;
                }
                that.setLinearGradient();

                if (newLeft <= newGradientSlider.offsetWidth / 2) {
                    newLeft = newGradientSlider.offsetWidth / 2;
                } else if (newLeft >= that.linearSliderBar.offsetWidth - newGradientSlider.offsetWidth / 2 - 1) {
                    newLeft = that.linearSliderBar.offsetWidth - (newGradientSlider.offsetWidth / 2);
                }
                newGradientSlider.style.left = newLeft + 'px';
            }
        }

        function onMouseUp() {
            newGradientSlider.classList.remove("slider-selected")
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    },


    // 获取线性渐变值
    setLinearGradient() {
        // 清洗数据
        this.gradientDIVList = this.sortAndDistance(this.gradientDIVList);
        let colorL = `${this.gradientDIVList.map(obj => `${obj.color} ${obj.percentages}%`).join(', ')}`;
        let g = `linear-gradient(${this.currentDegree}deg, ${colorL})`
        this.linearSliderBar.style.background = `linear-gradient(${90}deg, ${colorL})`;
        this.showLinear.style.background = g;
        if (this.curruntColorModule.isEqualNode(this.showLinear)) {
            this.colorInput.style.fontSize = "12px";
            this.colorInput.value = g;
        }
    },

    // 删除选中滑块的函数
    deleteSelectedSlider() {
        if (this.gradientDIVList.length > 2) {
            if (!this.currentSelectedSlider) {
                // 获取到最后一个元素
                let dele = this.gradientDIVList.pop();
                this.linearSliderBar.removeChild(dele.slider);
            } else if (this.currentSelectedSlider) {
                let index = this.gradientDIVList.findIndex(sliderObj => sliderObj.slider.isEqualNode(this.currentSelectedSlider));
                if (index !== -1) {
                    this.linearSliderBar.removeChild(this.currentSelectedSlider);
                    this.gradientDIVList.splice(index, 1);
                    this.currentSelectedSlider = null;
                }
            }
            this.setLinearGradient(); // 更新渐变条
        } else {
            console.log("最少两个滑块");
            return;
        }
    },

    // 选择渐变方向
    rotateGradient(deg = 90) {
        // 旋转
        this.currentDegree = (this.currentDegree + deg) % 360;
        this.setLinearGradient();
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
        this.absorbHistoryColorQueue.enQueue(color);
        // 显示到页面中
        this.absorbHistoryColorQueue.getQueue().forEach((color, index) => {
            this.colorPickerBottomAbsorbArray[index].style.backgroundColor = color;
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
        navigator.clipboard.writeText(text).then(function () {
            alert('复制成功');
        }, function (err) {
            alert('复制失败');
            console.error('Async copy failed: ', err);
        });
    },

    // 销毁
    destroy() {
        this.controllerShow.remove();
    }
}

// window.XLColorPicker = XLColorPicker;

export default XLColorPicker;