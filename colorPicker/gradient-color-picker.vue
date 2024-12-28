<template>
  <div ref="pickerContainer"></div>
</template>

<script>
import XLColorPicker from "./xl-color-picker-m.js";
export default {
  props: {
    "modelValue": {
      type: String,
      default: ""
    },
    "canMove": {
      type: Boolean,
      default: true
    },
    "width": {
      type: Number,
      default: 20
    },
    "height": {
      type: Number,
      default: 20
    }
  },
  emits: ["change", "update:modelValue"],
  data() {
    return {
      colorPicker: null,
      initColor: this.modelValue
    };
  },
  methods: {
    // 获取DOM的随机ID
    getRandomId: function (len = 6) {
      let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz";
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      let maxPos = chars.length;
      let pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      let pickerDIV = document.createElement("div");
      // 绑定id
      pickerDIV.id = pwd;

      this.$refs.pickerContainer.appendChild(pickerDIV);
      return pwd;
    },

    getCurrentColor: function (color) {
      this.$emit("change", color);
      this.$emit("update:modelValue", color);
      // console.log("getCurrentColor", color);
    },
    init(color) {
      this.colorPicker = new XLColorPicker({
        eleColor: color || "linear-gradient(0deg, #a850d7 0%, #24afeb 100%)",
        id: this.getRandomId(), //"#colorPicker",
        canMove: this.canMove, //选择器位置是否可以拖拽
        getCurrentColor: this.getCurrentColor,  // 获取输出框的颜色
        eleWidth: this.width,  // 宽度
        eleHeight: this.height, // 高度
      });
    },
  },
  mounted() {
    this.init(this.initColor);
  },
  beforeUnmount() {
    this.colorPicker.destroy();
  }
};</script>
<style></style>
