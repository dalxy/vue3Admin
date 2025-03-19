<template>
  <div class="phone-input-container">
    <el-select v-model="selectedCountry" filterable class="country-select" placeholder="选择国家">
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
          <span>{{ country.name }} ({{ country.nameEn }}) +{{ country.phoneCode }}</span>
        </span>
      </el-option>
    </el-select>
    
    <el-input
      v-model="phoneNumber"
      class="phone-number-input"
      placeholder="手机"
      @input="handlePhoneInput"
    >
      <template #prepend>+{{ getSelectedCountryCode }}</template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Country {
  name: string
  nameEn: string
  code: string
  phoneCode: string
  label: string
  spritePosition: string
}

const countries: Country[] = [
  {
    name: '阿尔及利亚',
    nameEn: 'Algeria',
    code: 'DZ',
    phoneCode: '213',
    label: '阿尔及利亚 (Algeria) +213',
    spritePosition: '0 0'
  },
  {
    name: '阿富汗',
    nameEn: 'Afghanistan',
    code: 'AF',
    phoneCode: '93',
    label: '阿富汗 (افغانستان) +93',
    spritePosition: '0 -11px'
  },
  {
    name: '阿根廷',
    nameEn: 'Argentina',
    code: 'AR',
    phoneCode: '54',
    label: '阿根廷 (Argentina) +54',
    spritePosition: '0 -22px'
  },
  {
    name: '阿拉伯联合酋长国',
    nameEn: 'United Arab Emirates',
    code: 'AE',
    phoneCode: '971',
    label: '阿拉伯联合酋长国 (الإمارات العربية المتحدة) +971',
    spritePosition: '0 -33px'
  },
  {
    name: '阿鲁巴',
    nameEn: 'Aruba',
    code: 'AW',
    phoneCode: '297',
    label: '阿鲁巴 (Aruba) +297',
    spritePosition: '0 -44px'
  },
  {
    name: '阿曼',
    nameEn: 'Oman',
    code: 'OM',
    phoneCode: '968',
    label: '阿曼 (عُمان) +968',
    spritePosition: '0 -55px'
  },
  {
    name: '阿塞拜疆',
    nameEn: 'Azerbaijan',
    code: 'AZ',
    phoneCode: '994',
    label: '阿塞拜疆 (Azərbaycan) +994',
    spritePosition: '0 -66px'
  },
  {
    name: '阿森松岛',
    nameEn: 'Ascension Island',
    code: 'AC',
    phoneCode: '247',
    label: '阿森松岛 (Ascension Island) +247',
    spritePosition: '0 -77px'
  }
]

const selectedCountry = ref('AF')
const phoneNumber = ref('')

const getSelectedCountryCode = computed(() => {
  const country = countries.find(c => c.code === selectedCountry.value)
  return country ? country.phoneCode : ''
})

const handlePhoneInput = (value: string) => {
  // 只允许输入数字
  phoneNumber.value = value.replace(/[^\d]/g, '')
}

const getFlagStyle = (countryCode: string) => {
  const country = countries.find(c => c.code === countryCode)
  if (!country) return {}
  
  return {
    backgroundImage: 'url(/src/assets/flags4.png)',
    backgroundPosition: country.spritePosition
  }
}

// 暴露给父组件的值
defineExpose({
  phoneNumber,
  selectedCountry,
  countries
})
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