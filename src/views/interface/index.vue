<template>
  <div class="container">
    <div class="interface">
      <div class="discreteness">
        <a-button class="button" type="primary" @click="addInput"
          >添加input</a-button
        >
        <a-button type="primary" class="button" @click="addInputNumber"
          >添加数字input</a-button
        >
        <a-button type="primary" class="button" @click="addRadio"
          >添加radio</a-button
        >
      </div>
      <div class="content">
        <div class="interface-list">
          <div v-for="(item, index) in interfaceList" :key="index">
            <a-input
              v-if="item['type'] === 'input'"
              v-model:value="item['value']"
              style="width: 200px; margin-bottom: 10px"
              placeholder="Basic usage"
            />
            <a-input-number
              v-else-if="item['type'] === 'inputNumber'"
              v-model:value="item['value']"
              style="width: 200px; margin-bottom: 10px"
              placeholder="Basic usage"
            />
            <a-radio
              style="width: 200px; margin-bottom: 10px"
              v-else-if="item['type'] === 'radio'"
              v-model:value="item['value']"
              >Radio</a-radio
            >
          </div>
        </div>
        <div class="submit-button">
          <a-button type="primary" @click="submit">提交</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InterfaceList {
  type: string;
  value: string | number | boolean;
}
const interfaceList = ref<InterfaceList[]>([]);
const addInput = () => {
  console.log(11111);
  interfaceList.value.push({ type: "input", value: "" });
};
const addInputNumber = () => {
  interfaceList.value.push({ type: "input", value: 0 });
};
const addRadio = () => {
  interfaceList.value.push({ type: "radio", value: true });
};
const submit = () => {
  console.log("ok");
};
</script>

<style scoped lang="scss">
$min-box-height: 87.3vh;
.interface {
  display: flex;
  .button {
    width: 200px;
    margin-bottom: 10px;
  }
  .discreteness {
    width: 100%;
    min-height: $min-box-height;
    align-items: center;
    display: flex;
    border-right: 0.5px solid black;
    flex-direction: column;
  }
  .content {
    width: 100%;
    border-left: 0.5px solid black;
    min-height: $min-box-height;
    position: relative;
    .interface-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 82vh;
      overflow-y: auto;
    }
    .submit-button {
      position: fixed;
      bottom: 16px;
      right: 16px;
    }
  }
}
</style>
