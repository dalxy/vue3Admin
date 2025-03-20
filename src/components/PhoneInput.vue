<template>
  <el-form ref="formRef" :model="form">
    <div class="phone-input-container">
      <el-select
        v-model="selectedCountry"
        filterable
        class="country-select"
        placeholder="选择国家"
      >
        <template #prefix>
          <span class="flag-icon" :style="getFlagStyle(selectedCountry)"></span>
        </template>
        <el-option
          v-for="country in countries"
          :key="country.code"
          :label="country.label"
          :value="country.code"
        >
          <span class="country-option">
            <span class="flag-icon" :style="getFlagStyle(country.code)"></span>
            <span
              >{{ country.name }} ({{ country.nameEn }}) +{{
                country.phoneCode
              }}</span
            >
          </span>
        </el-option>
      </el-select>

      <el-form-item
        prop="phone"
        :rules="rules.phone"
      >
        <el-input
          v-model="form.phone"
          class="phone-number-input"
          :placeholder="selectedCountry === 'US' ? '234-567-8901' : '手机'"
          @input="handlePhoneInput"
        >
          <template #prepend>+{{ getSelectedCountryCode }}</template>
        </el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, watch } from "vue";

interface Country {
  name: string;
  nameEn: string;
  code: string;
  phoneCode: string;
  label: string;
  spritePosition: string;
}

const countries: Country[] = [
  {
    name: "中国",
    nameEn: "China",
    code: "CN",
    phoneCode: "86",
    label: "+86",
    spritePosition: "0 -825px"
  },
  {
    name: "美国",
    nameEn: "United States",
    code: "US",
    phoneCode: "1",
    label: "+1",
    spritePosition: "0 -44px"
  },
  {
    name: "台湾",
    nameEn: "Taiwan",
    code: "TW",
    phoneCode: "886",
    label: "+886",
    spritePosition: "0 -506px"
  }
];

const selectedCountry = ref("CN");
const form = ref({
  phone: ""
});
const formRef = ref();

const getSelectedCountryCode = computed(() => {
  const country = countries.find((c) => c.code === selectedCountry.value);
  return country ? country.phoneCode : "";
});

const emit = defineEmits(["update:modelValue"]);

const handlePhoneInput = (value: string) => {
  // 只允许输入数字
  form.value.phone = value.replace(/[^\d]/g, "");
  emit("update:modelValue", {
    countryCode: selectedCountry.value,
    phoneNumber: form.value.phone
  });
};

// 添加手机号验证规则
const phoneValidationRules = {
  US: /^[2-9]\d{9}$/,
  CN: /^1[3-9]\d{9}$/,
  TW: /^09\d{8}$/
};

// 验证手机号的方法
const validatePhone = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请输入手机号'));
    return;
  }

  const pattern = phoneValidationRules[selectedCountry.value as keyof typeof phoneValidationRules];
  if (!pattern) {
    callback();
    return;
  }

  if (!pattern.test(value)) {
    switch (selectedCountry.value) {
      case 'US':
        callback(new Error('请输入正确的美国手机号，格式如: 234-567-8901'));
        break;
      case 'CN':
        callback(new Error('请输入正确的中国手机号，需要11位数字'));
        break;
      case 'TW':
        callback(new Error('请输入正确的台湾手机号，格式如: 0912345678'));
        break;
      default:
        callback(new Error('请输入正确的手机号'));
    }
    return;
  }
  callback();
};

// 动态验证规则
const rules = computed(() => ({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'change' },
    { validator: validatePhone, trigger: 'change' }
  ]
}));

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: boolean) => {
      resolve(valid);
    });
  });
};

const getFlagStyle = (countryCode: string) => {
  const country = countries.find((c) => c.code === countryCode);
  if (!country) return {};

  return {
    backgroundImage: "url(/src/assets/flags4.png)",
    backgroundPosition: country.spritePosition
  };
};

// 重置表单字段和验证
const resetFields = () => {
  formRef.value?.resetFields();
};

// 监听国家变化
watch(selectedCountry, () => {
  resetFields();
});

// 暴露给父组件的值
defineExpose({
  phoneNumber: computed(() => form.value.phone),
  selectedCountry,
  countries,
  validate,
  formRef,
  resetFields
});
</script>

<style scoped>
.phone-input-container {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.country-select {
  width: 200px;
  flex-shrink: 0;
}

.phone-number-input {
  flex: 1;
}

.country-option {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.flag-icon {
  display: inline-block;
  width: 16px;
  height: 11px;
  background-repeat: no-repeat;
  vertical-align: middle;
}

.country-code {
  color: #999;
  margin-left: auto;
}

:deep(.el-input-group__prepend) {
  padding: 0 8px;
  min-width: 50px;
}

:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-select .el-input__wrapper) {
  background-color: transparent;
  box-shadow: none;
  padding: 0;
}

:deep(.el-input__wrapper) {
  padding-left: 0;
}

:deep(.el-input__inner) {
  padding-left: 4px;
}

:deep(.el-select__popper) {
  width: 240px !important;
}

:deep(.el-select-dropdown__item) {
  height: auto;
  padding: 8px 12px;
}

:deep(.el-input .el-input__wrapper) {
  padding-right: 8px;
}

:deep(.el-select .el-input__prefix) {
  margin-left: 8px;
}

:deep(.el-input__prefix-inner) {
  display: flex;
  align-items: center;
}
</style>
