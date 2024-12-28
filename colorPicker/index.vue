<template>
  <div style="text-align: center">
    <h1>这是取色器的测试页面</h1>

    <div id="xl-color" style="margin: 10px;height: 100px">{{ color }}</div>

    <div style="display: flex;justify-content: center">
      <GradientColorPicker
          @change="getColor"
          :width="30"
          :height="30"
          v-model="color"/>

      <GradientColorPicker
          @change="getColor1"
          :width="30"
          :height="30"
          style="margin-left: 30px"
          v-model="color1"/>
    </div>

    <div id="xl-color1" style="margin: 10px;height: 100px">{{ color1 }}</div>

    <div style="display: flex;justify-content: center">
      <GradientColorPicker1
          @change="getColor2"
          :width="30"
          :height="30"
          style="margin-left: 30px"
          v-model="color2"/>
    </div>

    <div id="xl-color2" style="margin: 10px;height: 100px">{{ color2 }}</div>
  </div>
</template>

<script setup lang="ts">
import GradientColorPicker from "@/components/colorPicker/gradient-color-picker.vue";
import GradientColorPicker1 from "@/components/colorPicker/gradient-color-picker-ts.vue";
import {ref} from "vue";
import { ColorFormat, XLColorPicker } from './xl-color-picker.ts'; // 假设代码保存为 colorFormat.ts

let color = ref("#16b0b4")
let color1 = ref("#003e67")
let color2 = ref("#674300")

function getColor(color: string) {
  document.getElementById("xl-color")!.style.background = color
  // console.log(color)
}

function getColor1(color: string) {
  document.getElementById("xl-color1")!.style.background = color
  // console.log(color)
}

function getColor2(color: string) {
  document.getElementById("xl-color2")!.style.background = color
  // console.log(color)
}

// console.log(ColorFormat)
// // Usage Example
const result = ColorFormat.colorFormat({ color: '#06f6d9', format: 'hsla' });
// Type guard to check if result is of type ColorResult
if (result && 'complete' in result) {
  console.log(result.complete);  // This will now be safe to access
} else {
  console.error('Invalid color conversion result');
}


</script>

<style scoped>

</style>
