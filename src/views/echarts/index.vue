<template>
  <div class="echarts-container">
    <el-card class="phone-card">
      <template #header>
        <div class="card-header">
          <span>手机号码输入示例</span>
        </div>
      </template>

      <PhoneInput ref="phoneInputRef" />

      <div class="submit-section">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>

      <div v-if="submittedData" class="result-section">
        <el-alert title="提交的数据" type="success" :closable="false" show-icon>
          <p>国家代码: {{ submittedData.country }}</p>
          <p>
            电话号码: +{{ submittedData.countryCode }}{{ submittedData.phone }}
          </p>
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PhoneInput from "@/components/PhoneInput.vue";
import { ElMessage } from "element-plus";

const phoneInputRef = ref();
const submittedData = ref<{
  country: string;
  countryCode: string;
  phone: string;
} | null>(null);

const handleSubmit = () => {
  if (!phoneInputRef.value) return;

  const phone = phoneInputRef.value.phoneNumber;
  const country = phoneInputRef.value.selectedCountry;

  if (!phone) {
    ElMessage.warning("请输入手机号码");
    return;
  }

  // 获取国家代码
  const countryData = phoneInputRef.value.countries.find(
    (c: any) => c.code === country
  );
  const countryCode = countryData?.phoneCode || "";

  submittedData.value = {
    country,
    countryCode,
    phone
  };

  ElMessage.success("提交成功");
};
</script>

<style scoped>
.echarts-container {
  padding: 20px;
}

.phone-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-section {
  margin-top: 20px;
  text-align: right;
}

.result-section {
  margin-top: 20px;
}

.result-section p {
  margin: 8px 0;
  font-size: 14px;
}
</style>
