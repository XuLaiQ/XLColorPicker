<template>
  <div ref="pickerContainer"></div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { ColorFormat, XLColorPicker } from './xl-color-picker.ts';

let opt = defineProps({
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
})

let colorPicker = ref<XLColorPicker | null>(null);
let initColor = opt.modelValue;

const emit = defineEmits(["update:modelValue", "change"])

const pickerContainer = ref<HTMLElement | null>(null);

function getRandomId(len: number = 6) {
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
  if (pickerContainer.value) {
    pickerContainer.value.appendChild(pickerDIV);
  }
  return pwd;
}

function getCurrentColor(color: String) {
  emit("change", color);
  emit("update:modelValue", color);
}

function init(color: String) {
  colorPicker.value = new XLColorPicker({
    eleColor: color || "linear-gradient(0deg, #a850d7 0%, #24afeb 100%)",
    id: getRandomId(), //"#colorPicker",
    canMove: opt.canMove, //选择器位置是否可以拖拽
    getCurrentColor: getCurrentColor,  // 获取输出框的颜色
    eleWidth: opt.width,  // 宽度
    eleHeight: opt.height, // 高度
  });
}

onMounted(() => {
  init(initColor);
})

onUnmounted(() => {
  if (colorPicker.value) {
    colorPicker.value.destroy();
  }
})

</script>

<style scoped>

</style>
