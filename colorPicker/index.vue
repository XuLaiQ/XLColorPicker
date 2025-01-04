<template>
  <div style="text-align: center">
    <h1>这是取色器的测试页面</h1>
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

    <div class="color-gird-test">
      <div :style="{background: color}">{{ color }}</div>
      <div :style="{background: color1}">{{ color1 }}</div>
    </div>

    <div style="display: flex;justify-content: center">
      <GradientColorPicker1
          @change="getColor2"
          :width="30"
          :height="30"
          style="margin-left: 30px"
          v-model="color2"/>
      <GradientColorPicker1
          @change="getColor2"
          :width="30"
          :height="30"
          style="margin-left: 30px"
          v-model="color3"/>
    </div>
    <div class="color-gird-test">
      <div :style="{background: color2}">{{ color2 }}</div>
      <div :style="{background: color3}">{{ color3 }}</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import GradientColorPicker from "@/components/colorPicker/gradient-color-picker.vue";
import GradientColorPicker1 from "@/components/colorPicker/gradient-color-picker-ts.vue";
import {ref} from "vue";

let color = ref("linear-gradient(0deg, #a850d7 0%, #fff 49%, #24afeb 100%)")
let color1 = ref("#003e67")
let color2 = ref("#674300")
let color3 = ref("linear-gradient(180deg, #0de552ff 0%, #1b1ee7ff 94%)")

function getColor(color: string) {
  // document.getElementById("xl-color")!.style.background = color
  // console.log(color)
}

function getColor1(color: string) {
  // document.getElementById("xl-color1")!.style.background = color
  // console.log(color)
}

function getColor2(color: string) {
  // document.getElementById("xl-color2")!.style.background = color
}

</script>

<style scoped>
.color-gird-test {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  height: 300px;
  width: 100%;
  margin: 10px 0;
}
</style>
