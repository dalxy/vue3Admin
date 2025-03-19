<template>
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
      prop="phoneNumber"
      :rules="[{ required: true, message: '请输入手机号', trigger: 'change' }]"
    >
      <el-input
        v-model="phoneNumber"
        class="phone-number-input"
        placeholder="手机"
        @input="handlePhoneInput"
      >
        <template #prepend>+{{ getSelectedCountryCode }}</template>
      </el-input>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from "vue";

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
    name: "阿尔及利亚",
    nameEn: "Algeria",
    code: "DZ",
    phoneCode: "213",
    label: "阿尔及利亚 (Algeria) +213",
    spritePosition: "0 0"
  },
  {
    name: "阿富汗",
    nameEn: "Afghanistan",
    code: "AF",
    phoneCode: "93",
    label: "阿富汗 (افغانستان) +93",
    spritePosition: "0 -11px"
  },
  {
    name: "阿根廷",
    nameEn: "Argentina",
    code: "AR",
    phoneCode: "54",
    label: "阿根廷 (Argentina) +54",
    spritePosition: "0 -22px"
  },
  {
    name: "阿拉伯联合酋长国",
    nameEn: "United Arab Emirates",
    code: "AE",
    phoneCode: "971",
    label: "阿拉伯联合酋长国 (الإمارات العربية المتحدة) +971",
    spritePosition: "0 -33px"
  },
  {
    name: "阿鲁巴",
    nameEn: "Aruba",
    code: "AW",
    phoneCode: "297",
    label: "阿鲁巴 (Aruba) +297",
    spritePosition: "0 -44px"
  },
  {
    name: "阿曼",
    nameEn: "Oman",
    code: "OM",
    phoneCode: "968",
    label: "阿曼 (عُمان) +968",
    spritePosition: "0 -55px"
  },
  {
    name: "阿塞拜疆",
    nameEn: "Azerbaijan",
    code: "AZ",
    phoneCode: "994",
    label: "阿塞拜疆 (Azərbaycan) +994",
    spritePosition: "0 -66px"
  },
  {
    name: "阿森松岛",
    nameEn: "Ascension Island",
    code: "AC",
    phoneCode: "247",
    label: "阿森松岛 (Ascension Island) +247",
    spritePosition: "0 -77px"
  },
  {
    name: "埃及",
    nameEn: "Egypt",
    code: "EG",
    phoneCode: "20",
    label: "埃及 (Egypt) +20",
    spritePosition: "0 -88px"
  },
  {
    name: "埃塞俄比亚",
    nameEn: "Ethiopia",
    code: "ET",
    phoneCode: "251",
    label: "埃塞俄比亚 (Ethiopia) +251",
    spritePosition: "0 -99px"
  },
  {
    name: "爱尔兰",
    nameEn: "Ireland",
    code: "IE",
    phoneCode: "353",
    label: "爱尔兰 (Ireland) +353",
    spritePosition: "0 -110px"
  },
  {
    name: "爱沙尼亚",
    nameEn: "Estonia",
    code: "EE",
    phoneCode: "372",
    label: "爱沙尼亚 (Estonia) +372",
    spritePosition: "0 -121px"
  },
  {
    name: "安道尔",
    nameEn: "Andorra",
    code: "AD",
    phoneCode: "376",
    label: "安道尔 (Andorra) +376",
    spritePosition: "0 -132px"
  },
  {
    name: "安哥拉",
    nameEn: "Angola",
    code: "AO",
    phoneCode: "244",
    label: "安哥拉 (Angola) +244",
    spritePosition: "0 -143px"
  },
  {
    name: "安圭拉",
    nameEn: "Anguilla",
    code: "AI",
    phoneCode: "1264",
    label: "安圭拉 (Anguilla) +1264",
    spritePosition: "0 -154px"
  },
  {
    name: "安提瓜和巴布达",
    nameEn: "Antigua and Barbuda",
    code: "AG",
    phoneCode: "1268",
    label: "安提瓜和巴布达 (Antigua and Barbuda) +1268",
    spritePosition: "0 -165px"
  },
  {
    name: "奥地利",
    nameEn: "Austria",
    code: "AT",
    phoneCode: "43",
    label: "奥地利 (Austria) +43",
    spritePosition: "0 -176px"
  },
  {
    name: "澳大利亚",
    nameEn: "Australia",
    code: "AU",
    phoneCode: "61",
    label: "澳大利亚 (Australia) +61",
    spritePosition: "0 -187px"
  },
  {
    name: "澳门",
    nameEn: "Macao",
    code: "MO",
    phoneCode: "853",
    label: "澳门 (Macao) +853",
    spritePosition: "0 -198px"
  },
  {
    name: "巴巴多斯",
    nameEn: "Barbados",
    code: "BB",
    phoneCode: "1246",
    label: "巴巴多斯 (Barbados) +1246",
    spritePosition: "0 -209px"
  },
  {
    name: "巴布亚新几内亚",
    nameEn: "Papua New Guinea",
    code: "PG",
    phoneCode: "675",
    label: "巴布亚新几内亚 (Papua New Guinea) +675",
    spritePosition: "0 -220px"
  },
  {
    name: "巴哈马",
    nameEn: "Bahamas",
    code: "BS",
    phoneCode: "1242",
    label: "巴哈马 (Bahamas) +1242",
    spritePosition: "0 -231px"
  },
  {
    name: "巴基斯坦",
    nameEn: "Pakistan",
    code: "PK",
    phoneCode: "92",
    label: "巴基斯坦 (Pakistan) +92",
    spritePosition: "0 -242px"
  },
  {
    name: "巴拉圭",
    nameEn: "Paraguay",
    code: "PY",
    phoneCode: "595",
    label: "巴拉圭 (Paraguay) +595",
    spritePosition: "0 -253px"
  },
  {
    name: "巴勒斯坦",
    nameEn: "Palestine",
    code: "PS",
    phoneCode: "970",
    label: "巴勒斯坦 (Palestine) +970",
    spritePosition: "0 -264px"
  },
  {
    name: "巴林",
    nameEn: "Bahrain",
    code: "BH",
    phoneCode: "973",
    label: "巴林 (Bahrain) +973",
    spritePosition: "0 -275px"
  },
  {
    name: "巴拿马",
    nameEn: "Panama",
    code: "PA",
    phoneCode: "507",
    label: "巴拿马 (Panama) +507",
    spritePosition: "0 -286px"
  },
  {
    name: "巴西",
    nameEn: "Brazil",
    code: "BR",
    phoneCode: "55",
    label: "巴西 (Brazil) +55",
    spritePosition: "0 -297px"
  },
  {
    name: "白俄罗斯",
    nameEn: "Belarus",
    code: "BY",
    phoneCode: "375",
    label: "白俄罗斯 (Belarus) +375",
    spritePosition: "0 -308px"
  },
  {
    name: "百慕大",
    nameEn: "Bermuda",
    code: "BM",
    phoneCode: "1441",
    label: "百慕大 (Bermuda) +1441",
    spritePosition: "0 -319px"
  },
  {
    name: "保加利亚",
    nameEn: "Bulgaria",
    code: "BG",
    phoneCode: "359",
    label: "保加利亚 (Bulgaria) +359",
    spritePosition: "0 -330px"
  },
  {
    name: "北马里亚纳群岛",
    nameEn: "Northern Mariana Islands",
    code: "MP",
    phoneCode: "1670",
    label: "北马里亚纳群岛 (Northern Mariana Islands) +1670",
    spritePosition: "0 -341px"
  },
  {
    name: "贝宁",
    nameEn: "Benin",
    code: "BJ",
    phoneCode: "229",
    label: "贝宁 (Benin) +229",
    spritePosition: "0 -352px"
  },
  {
    name: "比利时",
    nameEn: "Belgium",
    code: "BE",
    phoneCode: "32",
    label: "比利时 (Belgium) +32",
    spritePosition: "0 -363px"
  },
  {
    name: "冰岛",
    nameEn: "Iceland",
    code: "IS",
    phoneCode: "354",
    label: "冰岛 (Iceland) +354",
    spritePosition: "0 -374px"
  },
  {
    name: "波多黎各",
    nameEn: "Puerto Rico",
    code: "PR",
    phoneCode: "1787",
    label: "波多黎各 (Puerto Rico) +1787",
    spritePosition: "0 -385px"
  },
  {
    name: "波兰",
    nameEn: "Poland",
    code: "PL",
    phoneCode: "48",
    label: "波兰 (Poland) +48",
    spritePosition: "0 -396px"
  },
  {
    name: "波斯尼亚和黑塞哥维那",
    nameEn: "Bosnia and Herzegovina",
    code: "BA",
    phoneCode: "387",
    label: "波斯尼亚和黑塞哥维那 (Bosnia and Herzegovina) +387",
    spritePosition: "0 -407px"
  },
  {
    name: "玻利维亚",
    nameEn: "Bolivia",
    code: "BO",
    phoneCode: "591",
    label: "玻利维亚 (Bolivia) +591",
    spritePosition: "0 -418px"
  },
  {
    name: "伯利兹",
    nameEn: "Belize",
    code: "BZ",
    phoneCode: "501",
    label: "伯利兹 (Belize) +501",
    spritePosition: "0 -429px"
  },
  {
    name: "博茨瓦纳",
    nameEn: "Botswana",
    code: "BW",
    phoneCode: "267",
    label: "博茨瓦纳 (Botswana) +267",
    spritePosition: "0 -440px"
  },
  {
    name: "不丹",
    nameEn: "Bhutan",
    code: "BT",
    phoneCode: "975",
    label: "不丹 (Bhutan) +975",
    spritePosition: "0 -451px"
  },
  {
    name: "布基纳法索",
    nameEn: "Burkina Faso",
    code: "BF",
    phoneCode: "226",
    label: "布基纳法索 (Burkina Faso) +226",
    spritePosition: "0 -462px"
  },
  {
    name: "布隆迪",
    nameEn: "Burundi",
    code: "BI",
    phoneCode: "257",
    label: "布隆迪 (Burundi) +257",
    spritePosition: "0 -473px"
  },
  {
    name: "朝鲜",
    nameEn: "North Korea",
    code: "KP",
    phoneCode: "850",
    label: "朝鲜 (North Korea) +850",
    spritePosition: "0 -484px"
  },
  {
    name: "赤道几内亚",
    nameEn: "Equatorial Guinea",
    code: "GQ",
    phoneCode: "240",
    label: "赤道几内亚 (Equatorial Guinea) +240",
    spritePosition: "0 -495px"
  },
  {
    name: "丹麦",
    nameEn: "Denmark",
    code: "DK",
    phoneCode: "45",
    label: "丹麦 (Denmark) +45",
    spritePosition: "0 -506px"
  },
  {
    name: "德国",
    nameEn: "Germany",
    code: "DE",
    phoneCode: "49",
    label: "德国 (Germany) +49",
    spritePosition: "0 -517px"
  },
  {
    name: "东帝汶",
    nameEn: "East Timor",
    code: "TL",
    phoneCode: "670",
    label: "东帝汶 (East Timor) +670",
    spritePosition: "0 -528px"
  },
  {
    name: "多哥",
    nameEn: "Togo",
    code: "TG",
    phoneCode: "228",
    label: "多哥 (Togo) +228",
    spritePosition: "0 -539px"
  },
  {
    name: "多米尼加",
    nameEn: "Dominican Republic",
    code: "DO",
    phoneCode: "1809",
    label: "多米尼加 (Dominican Republic) +1809",
    spritePosition: "0 -550px"
  },
  {
    name: "俄罗斯",
    nameEn: "Russia",
    code: "RU",
    phoneCode: "7",
    label: "俄罗斯 (Russia) +7",
    spritePosition: "0 -561px"
  },
  {
    name: "厄瓜多尔",
    nameEn: "Ecuador",
    code: "EC",
    phoneCode: "593",
    label: "厄瓜多尔 (Ecuador) +593",
    spritePosition: "0 -572px"
  },
  {
    name: "厄立特里亚",
    nameEn: "Eritrea",
    code: "ER",
    phoneCode: "291",
    label: "厄立特里亚 (Eritrea) +291",
    spritePosition: "0 -583px"
  },
  {
    name: "法国",
    nameEn: "France",
    code: "FR",
    phoneCode: "33",
    label: "法国 (France) +33",
    spritePosition: "0 -594px"
  },
  {
    name: "法罗群岛",
    nameEn: "Faroe Islands",
    code: "FO",
    phoneCode: "298",
    label: "法罗群岛 (Faroe Islands) +298",
    spritePosition: "0 -605px"
  },
  {
    name: "法属波利尼西亚",
    nameEn: "French Polynesia",
    code: "PF",
    phoneCode: "689",
    label: "法属波利尼西亚 (French Polynesia) +689",
    spritePosition: "0 -616px"
  },
  {
    name: "法属圭亚那",
    nameEn: "French Guiana",
    code: "GF",
    phoneCode: "594",
    label: "法属圭亚那 (French Guiana) +594",
    spritePosition: "0 -627px"
  },
  {
    name: "菲律宾",
    nameEn: "Philippines",
    code: "PH",
    phoneCode: "63",
    label: "菲律宾 (Philippines) +63",
    spritePosition: "0 -638px"
  },
  {
    name: "斐济",
    nameEn: "Fiji",
    code: "FJ",
    phoneCode: "679",
    label: "斐济 (Fiji) +679",
    spritePosition: "0 -649px"
  },
  {
    name: "芬兰",
    nameEn: "Finland",
    code: "FI",
    phoneCode: "358",
    label: "芬兰 (Finland) +358",
    spritePosition: "0 -660px"
  },
  {
    name: "佛得角",
    nameEn: "Cape Verde",
    code: "CV",
    phoneCode: "238",
    label: "佛得角 (Cape Verde) +238",
    spritePosition: "0 -671px"
  },
  {
    name: "冈比亚",
    nameEn: "Gambia",
    code: "GM",
    phoneCode: "220",
    label: "冈比亚 (Gambia) +220",
    spritePosition: "0 -682px"
  },
  {
    name: "刚果共和国",
    nameEn: "Republic of the Congo",
    code: "CG",
    phoneCode: "242",
    label: "刚果共和国 (Republic of the Congo) +242",
    spritePosition: "0 -693px"
  },
  {
    name: "刚果民主共和国",
    nameEn: "Democratic Republic of the Congo",
    code: "CD",
    phoneCode: "243",
    label: "刚果民主共和国 (Democratic Republic of the Congo) +243",
    spritePosition: "0 -704px"
  },
  {
    name: "哥伦比亚",
    nameEn: "Colombia",
    code: "CO",
    phoneCode: "57",
    label: "哥伦比亚 (Colombia) +57",
    spritePosition: "0 -715px"
  },
  {
    name: "哥斯达黎加",
    nameEn: "Costa Rica",
    code: "CR",
    phoneCode: "506",
    label: "哥斯达黎加 (Costa Rica) +506",
    spritePosition: "0 -726px"
  },
  {
    name: "格林纳达",
    nameEn: "Grenada",
    code: "GD",
    phoneCode: "1473",
    label: "格林纳达 (Grenada) +1473",
    spritePosition: "0 -737px"
  },
  {
    name: "格陵兰",
    nameEn: "Greenland",
    code: "GL",
    phoneCode: "299",
    label: "格陵兰 (Greenland) +299",
    spritePosition: "0 -748px"
  },
  {
    name: "格鲁吉亚",
    nameEn: "Georgia",
    code: "GE",
    phoneCode: "995",
    label: "格鲁吉亚 (Georgia) +995",
    spritePosition: "0 -759px"
  },
  {
    name: "古巴",
    nameEn: "Cuba",
    code: "CU",
    phoneCode: "53",
    label: "古巴 (Cuba) +53",
    spritePosition: "0 -770px"
  },
  {
    name: "瓜德罗普",
    nameEn: "Guadeloupe",
    code: "GP",
    phoneCode: "590",
    label: "瓜德罗普 (Guadeloupe) +590",
    spritePosition: "0 -781px"
  },
  {
    name: "关岛",
    nameEn: "Guam",
    code: "GU",
    phoneCode: "1671",
    label: "关岛 (Guam) +1671",
    spritePosition: "0 -792px"
  },
  {
    name: "圭亚那",
    nameEn: "Guyana",
    code: "GY",
    phoneCode: "592",
    label: "圭亚那 (Guyana) +592",
    spritePosition: "0 -803px"
  },
  {
    name: "哈萨克斯坦",
    nameEn: "Kazakhstan",
    code: "KZ",
    phoneCode: "7",
    label: "哈萨克斯坦 (Kazakhstan) +7",
    spritePosition: "0 -814px"
  },
  {
    name: "海地",
    nameEn: "Haiti",
    code: "HT",
    phoneCode: "509",
    label: "海地 (Haiti) +509",
    spritePosition: "0 -825px"
  },
  {
    name: "韩国",
    nameEn: "South Korea",
    code: "KR",
    phoneCode: "82",
    label: "韩国 (South Korea) +82",
    spritePosition: "0 -836px"
  },
  {
    name: "荷兰",
    nameEn: "Netherlands",
    code: "NL",
    phoneCode: "31",
    label: "荷兰 (Netherlands) +31",
    spritePosition: "0 -847px"
  },
  {
    name: "黑山",
    nameEn: "Montenegro",
    code: "ME",
    phoneCode: "382",
    label: "黑山 (Montenegro) +382",
    spritePosition: "0 -858px"
  },
  {
    name: "洪都拉斯",
    nameEn: "Honduras",
    code: "HN",
    phoneCode: "504",
    label: "洪都拉斯 (Honduras) +504",
    spritePosition: "0 -869px"
  },
  {
    name: "基里巴斯",
    nameEn: "Kiribati",
    code: "KI",
    phoneCode: "686",
    label: "基里巴斯 (Kiribati) +686",
    spritePosition: "0 -880px"
  },
  {
    name: "吉布提",
    nameEn: "Djibouti",
    code: "DJ",
    phoneCode: "253",
    label: "吉布提 (Djibouti) +253",
    spritePosition: "0 -891px"
  },
  {
    name: "吉尔吉斯斯坦",
    nameEn: "Kyrgyzstan",
    code: "KG",
    phoneCode: "996",
    label: "吉尔吉斯斯坦 (Kyrgyzstan) +996",
    spritePosition: "0 -902px"
  },
  {
    name: "几内亚",
    nameEn: "Guinea",
    code: "GN",
    phoneCode: "224",
    label: "几内亚 (Guinea) +224",
    spritePosition: "0 -913px"
  },
  {
    name: "几内亚比绍",
    nameEn: "Guinea-Bissau",
    code: "GW",
    phoneCode: "245",
    label: "几内亚比绍 (Guinea-Bissau) +245",
    spritePosition: "0 -924px"
  },
  {
    name: "加拿大",
    nameEn: "Canada",
    code: "CA",
    phoneCode: "1",
    label: "加拿大 (Canada) +1",
    spritePosition: "0 -935px"
  },
  {
    name: "加纳",
    nameEn: "Ghana",
    code: "GH",
    phoneCode: "233",
    label: "加纳 (Ghana) +233",
    spritePosition: "0 -946px"
  },
  {
    name: "加蓬",
    nameEn: "Gabon",
    code: "GA",
    phoneCode: "241",
    label: "加蓬 (Gabon) +241",
    spritePosition: "0 -957px"
  },
  {
    name: "柬埔寨",
    nameEn: "Cambodia",
    code: "KH",
    phoneCode: "855",
    label: "柬埔寨 (Cambodia) +855",
    spritePosition: "0 -968px"
  },
  {
    name: "捷克",
    nameEn: "Czech Republic",
    code: "CZ",
    phoneCode: "420",
    label: "捷克 (Czech Republic) +420",
    spritePosition: "0 -979px"
  },
  {
    name: "津巴布韦",
    nameEn: "Zimbabwe",
    code: "ZW",
    phoneCode: "263",
    label: "津巴布韦 (Zimbabwe) +263",
    spritePosition: "0 -990px"
  },
  {
    name: "喀麦隆",
    nameEn: "Cameroon",
    code: "CM",
    phoneCode: "237",
    label: "喀麦隆 (Cameroon) +237",
    spritePosition: "0 -1001px"
  },
  {
    name: "卡塔尔",
    nameEn: "Qatar",
    code: "QA",
    phoneCode: "974",
    label: "卡塔尔 (Qatar) +974",
    spritePosition: "0 -1012px"
  },
  {
    name: "开曼群岛",
    nameEn: "Cayman Islands",
    code: "KY",
    phoneCode: "1345",
    label: "开曼群岛 (Cayman Islands) +1345",
    spritePosition: "0 -1023px"
  },
  {
    name: "科摩罗",
    nameEn: "Comoros",
    code: "KM",
    phoneCode: "269",
    label: "科摩罗 (Comoros) +269",
    spritePosition: "0 -1034px"
  },
  {
    name: "科特迪瓦",
    nameEn: "Ivory Coast",
    code: "CI",
    phoneCode: "225",
    label: "科特迪瓦 (Ivory Coast) +225",
    spritePosition: "0 -1045px"
  },
  {
    name: "科威特",
    nameEn: "Kuwait",
    code: "KW",
    phoneCode: "965",
    label: "科威特 (Kuwait) +965",
    spritePosition: "0 -1056px"
  },
  {
    name: "克罗地亚",
    nameEn: "Croatia",
    code: "HR",
    phoneCode: "385",
    label: "克罗地亚 (Croatia) +385",
    spritePosition: "0 -1067px"
  },
  {
    name: "肯尼亚",
    nameEn: "Kenya",
    code: "KE",
    phoneCode: "254",
    label: "肯尼亚 (Kenya) +254",
    spritePosition: "0 -1078px"
  },
  {
    name: "库克群岛",
    nameEn: "Cook Islands",
    code: "CK",
    phoneCode: "682",
    label: "库克群岛 (Cook Islands) +682",
    spritePosition: "0 -1089px"
  },
  {
    name: "拉脱维亚",
    nameEn: "Latvia",
    code: "LV",
    phoneCode: "371",
    label: "拉脱维亚 (Latvia) +371",
    spritePosition: "0 -1100px"
  },
  {
    name: "莱索托",
    nameEn: "Lesotho",
    code: "LS",
    phoneCode: "266",
    label: "莱索托 (Lesotho) +266",
    spritePosition: "0 -1111px"
  },
  {
    name: "老挝",
    nameEn: "Laos",
    code: "LA",
    phoneCode: "856",
    label: "老挝 (Laos) +856",
    spritePosition: "0 -1122px"
  },
  {
    name: "黎巴嫩",
    nameEn: "Lebanon",
    code: "LB",
    phoneCode: "961",
    label: "黎巴嫩 (Lebanon) +961",
    spritePosition: "0 -1133px"
  },
  {
    name: "立陶宛",
    nameEn: "Lithuania",
    code: "LT",
    phoneCode: "370",
    label: "立陶宛 (Lithuania) +370",
    spritePosition: "0 -1144px"
  },
  {
    name: "利比里亚",
    nameEn: "Liberia",
    code: "LR",
    phoneCode: "231",
    label: "利比里亚 (Liberia) +231",
    spritePosition: "0 -1155px"
  },
  {
    name: "利比亚",
    nameEn: "Libya",
    code: "LY",
    phoneCode: "218",
    label: "利比亚 (Libya) +218",
    spritePosition: "0 -1166px"
  },
  {
    name: "列支敦士登",
    nameEn: "Liechtenstein",
    code: "LI",
    phoneCode: "423",
    label: "列支敦士登 (Liechtenstein) +423",
    spritePosition: "0 -1177px"
  },
  {
    name: "留尼旺",
    nameEn: "Reunion",
    code: "RE",
    phoneCode: "262",
    label: "留尼旺 (Reunion) +262",
    spritePosition: "0 -1188px"
  },
  {
    name: "卢森堡",
    nameEn: "Luxembourg",
    code: "LU",
    phoneCode: "352",
    label: "卢森堡 (Luxembourg) +352",
    spritePosition: "0 -1199px"
  },
  {
    name: "卢旺达",
    nameEn: "Rwanda",
    code: "RW",
    phoneCode: "250",
    label: "卢旺达 (Rwanda) +250",
    spritePosition: "0 -1210px"
  },
  {
    name: "罗马尼亚",
    nameEn: "Romania",
    code: "RO",
    phoneCode: "40",
    label: "罗马尼亚 (Romania) +40",
    spritePosition: "0 -1221px"
  },
  {
    name: "马达加斯加",
    nameEn: "Madagascar",
    code: "MG",
    phoneCode: "261",
    label: "马达加斯加 (Madagascar) +261",
    spritePosition: "0 -1232px"
  },
  {
    name: "马尔代夫",
    nameEn: "Maldives",
    code: "MV",
    phoneCode: "960",
    label: "马尔代夫 (Maldives) +960",
    spritePosition: "0 -1243px"
  },
  {
    name: "马耳他",
    nameEn: "Malta",
    code: "MT",
    phoneCode: "356",
    label: "马耳他 (Malta) +356",
    spritePosition: "0 -1254px"
  },
  {
    name: "马拉维",
    nameEn: "Malawi",
    code: "MW",
    phoneCode: "265",
    label: "马拉维 (Malawi) +265",
    spritePosition: "0 -1265px"
  },
  {
    name: "马来西亚",
    nameEn: "Malaysia",
    code: "MY",
    phoneCode: "60",
    label: "马来西亚 (Malaysia) +60",
    spritePosition: "0 -1276px"
  },
  {
    name: "马里",
    nameEn: "Mali",
    code: "ML",
    phoneCode: "223",
    label: "马里 (Mali) +223",
    spritePosition: "0 -1287px"
  },
  {
    name: "马其顿",
    nameEn: "Macedonia",
    code: "MK",
    phoneCode: "389",
    label: "马其顿 (Macedonia) +389",
    spritePosition: "0 -1298px"
  },
  {
    name: "马绍尔群岛",
    nameEn: "Marshall Islands",
    code: "MH",
    phoneCode: "692",
    label: "马绍尔群岛 (Marshall Islands) +692",
    spritePosition: "0 -1309px"
  },
  {
    name: "马提尼克",
    nameEn: "Martinique",
    code: "MQ",
    phoneCode: "596",
    label: "马提尼克 (Martinique) +596",
    spritePosition: "0 -1320px"
  },
  {
    name: "马约特",
    nameEn: "Mayotte",
    code: "YT",
    phoneCode: "262",
    label: "马约特 (Mayotte) +262",
    spritePosition: "0 -1331px"
  },
  {
    name: "毛里求斯",
    nameEn: "Mauritius",
    code: "MU",
    phoneCode: "230",
    label: "毛里求斯 (Mauritius) +230",
    spritePosition: "0 -1342px"
  },
  {
    name: "毛里塔尼亚",
    nameEn: "Mauritania",
    code: "MR",
    phoneCode: "222",
    label: "毛里塔尼亚 (Mauritania) +222",
    spritePosition: "0 -1353px"
  },
  {
    name: "美国",
    nameEn: "United States",
    code: "US",
    phoneCode: "1",
    label: "美国 (United States) +1",
    spritePosition: "0 -1364px"
  },
  {
    name: "美属萨摩亚",
    nameEn: "American Samoa",
    code: "AS",
    phoneCode: "1684",
    label: "美属萨摩亚 (American Samoa) +1684",
    spritePosition: "0 -1375px"
  },
  {
    name: "美属维尔京群岛",
    nameEn: "U.S. Virgin Islands",
    code: "VI",
    phoneCode: "1340",
    label: "美属维尔京群岛 (U.S. Virgin Islands) +1340",
    spritePosition: "0 -1386px"
  },
  {
    name: "蒙古",
    nameEn: "Mongolia",
    code: "MN",
    phoneCode: "976",
    label: "蒙古 (Mongolia) +976",
    spritePosition: "0 -1397px"
  },
  {
    name: "蒙特塞拉特",
    nameEn: "Montserrat",
    code: "MS",
    phoneCode: "1664",
    label: "蒙特塞拉特 (Montserrat) +1664",
    spritePosition: "0 -1408px"
  },
  {
    name: "孟加拉国",
    nameEn: "Bangladesh",
    code: "BD",
    phoneCode: "880",
    label: "孟加拉国 (Bangladesh) +880",
    spritePosition: "0 -1419px"
  },
  {
    name: "秘鲁",
    nameEn: "Peru",
    code: "PE",
    phoneCode: "51",
    label: "秘鲁 (Peru) +51",
    spritePosition: "0 -1430px"
  },
  {
    name: "密克罗尼西亚",
    nameEn: "Micronesia",
    code: "FM",
    phoneCode: "691",
    label: "密克罗尼西亚 (Micronesia) +691",
    spritePosition: "0 -1441px"
  },
  {
    name: "缅甸",
    nameEn: "Myanmar",
    code: "MM",
    phoneCode: "95",
    label: "缅甸 (Myanmar) +95",
    spritePosition: "0 -1452px"
  },
  {
    name: "摩尔多瓦",
    nameEn: "Moldova",
    code: "MD",
    phoneCode: "373",
    label: "摩尔多瓦 (Moldova) +373",
    spritePosition: "0 -1463px"
  },
  {
    name: "摩洛哥",
    nameEn: "Morocco",
    code: "MA",
    phoneCode: "212",
    label: "摩洛哥 (Morocco) +212",
    spritePosition: "0 -1474px"
  },
  {
    name: "摩纳哥",
    nameEn: "Monaco",
    code: "MC",
    phoneCode: "377",
    label: "摩纳哥 (Monaco) +377",
    spritePosition: "0 -1485px"
  },
  {
    name: "莫桑比克",
    nameEn: "Mozambique",
    code: "MZ",
    phoneCode: "258",
    label: "莫桑比克 (Mozambique) +258",
    spritePosition: "0 -1496px"
  },
  {
    name: "墨西哥",
    nameEn: "Mexico",
    code: "MX",
    phoneCode: "52",
    label: "墨西哥 (Mexico) +52",
    spritePosition: "0 -1507px"
  },
  {
    name: "纳米比亚",
    nameEn: "Namibia",
    code: "NA",
    phoneCode: "264",
    label: "纳米比亚 (Namibia) +264",
    spritePosition: "0 -1518px"
  },
  {
    name: "南非",
    nameEn: "South Africa",
    code: "ZA",
    phoneCode: "27",
    label: "南非 (South Africa) +27",
    spritePosition: "0 -1529px"
  },
  {
    name: "南苏丹",
    nameEn: "South Sudan",
    code: "SS",
    phoneCode: "211",
    label: "南苏丹 (South Sudan) +211",
    spritePosition: "0 -1540px"
  },
  {
    name: "瑙鲁",
    nameEn: "Nauru",
    code: "NR",
    phoneCode: "674",
    label: "瑙鲁 (Nauru) +674",
    spritePosition: "0 -1551px"
  },
  {
    name: "尼泊尔",
    nameEn: "Nepal",
    code: "NP",
    phoneCode: "977",
    label: "尼泊尔 (Nepal) +977",
    spritePosition: "0 -1562px"
  },
  {
    name: "尼加拉瓜",
    nameEn: "Nicaragua",
    code: "NI",
    phoneCode: "505",
    label: "尼加拉瓜 (Nicaragua) +505",
    spritePosition: "0 -1573px"
  },
  {
    name: "尼日尔",
    nameEn: "Niger",
    code: "NE",
    phoneCode: "227",
    label: "尼日尔 (Niger) +227",
    spritePosition: "0 -1584px"
  },
  {
    name: "尼日利亚",
    nameEn: "Nigeria",
    code: "NG",
    phoneCode: "234",
    label: "尼日利亚 (Nigeria) +234",
    spritePosition: "0 -1595px"
  },
  {
    name: "纽埃",
    nameEn: "Niue",
    code: "NU",
    phoneCode: "683",
    label: "纽埃 (Niue) +683",
    spritePosition: "0 -1606px"
  },
  {
    name: "挪威",
    nameEn: "Norway",
    code: "NO",
    phoneCode: "47",
    label: "挪威 (Norway) +47",
    spritePosition: "0 -1617px"
  },
  {
    name: "诺福克岛",
    nameEn: "Norfolk Island",
    code: "NF",
    phoneCode: "672",
    label: "诺福克岛 (Norfolk Island) +672",
    spritePosition: "0 -1628px"
  },
  {
    name: "帕劳",
    nameEn: "Palau",
    code: "PW",
    phoneCode: "680",
    label: "帕劳 (Palau) +680",
    spritePosition: "0 -1639px"
  },
  {
    name: "葡萄牙",
    nameEn: "Portugal",
    code: "PT",
    phoneCode: "351",
    label: "葡萄牙 (Portugal) +351",
    spritePosition: "0 -1650px"
  },
  {
    name: "日本",
    nameEn: "Japan",
    code: "JP",
    phoneCode: "81",
    label: "日本 (Japan) +81",
    spritePosition: "0 -1661px"
  },
  {
    name: "瑞典",
    nameEn: "Sweden",
    code: "SE",
    phoneCode: "46",
    label: "瑞典 (Sweden) +46",
    spritePosition: "0 -1672px"
  },
  {
    name: "瑞士",
    nameEn: "Switzerland",
    code: "CH",
    phoneCode: "41",
    label: "瑞士 (Switzerland) +41",
    spritePosition: "0 -1683px"
  },
  {
    name: "萨尔瓦多",
    nameEn: "El Salvador",
    code: "SV",
    phoneCode: "503",
    label: "萨尔瓦多 (El Salvador) +503",
    spritePosition: "0 -1694px"
  },
  {
    name: "萨摩亚",
    nameEn: "Samoa",
    code: "WS",
    phoneCode: "685",
    label: "萨摩亚 (Samoa) +685",
    spritePosition: "0 -1705px"
  },
  {
    name: "塞尔维亚",
    nameEn: "Serbia",
    code: "RS",
    phoneCode: "381",
    label: "塞尔维亚 (Serbia) +381",
    spritePosition: "0 -1716px"
  },
  {
    name: "塞拉利昂",
    nameEn: "Sierra Leone",
    code: "SL",
    phoneCode: "232",
    label: "塞拉利昂 (Sierra Leone) +232",
    spritePosition: "0 -1727px"
  },
  {
    name: "塞内加尔",
    nameEn: "Senegal",
    code: "SN",
    phoneCode: "221",
    label: "塞内加尔 (Senegal) +221",
    spritePosition: "0 -1738px"
  },
  {
    name: "塞浦路斯",
    nameEn: "Cyprus",
    code: "CY",
    phoneCode: "357",
    label: "塞浦路斯 (Cyprus) +357",
    spritePosition: "0 -1749px"
  },
  {
    name: "塞舌尔",
    nameEn: "Seychelles",
    code: "SC",
    phoneCode: "248",
    label: "塞舌尔 (Seychelles) +248",
    spritePosition: "0 -1760px"
  },
  {
    name: "沙特阿拉伯",
    nameEn: "Saudi Arabia",
    code: "SA",
    phoneCode: "966",
    label: "沙特阿拉伯 (Saudi Arabia) +966",
    spritePosition: "0 -1771px"
  },
  {
    name: "圣巴泰勒米",
    nameEn: "Saint Barthélemy",
    code: "BL",
    phoneCode: "590",
    label: "圣巴泰勒米 (Saint Barthélemy) +590",
    spritePosition: "0 -1782px"
  },
  {
    name: "圣诞岛",
    nameEn: "Christmas Island",
    code: "CX",
    phoneCode: "61",
    label: "圣诞岛 (Christmas Island) +61",
    spritePosition: "0 -1793px"
  },
  {
    name: "圣多美和普林西比",
    nameEn: "Sao Tome and Principe",
    code: "ST",
    phoneCode: "239",
    label: "圣多美和普林西比 (Sao Tome and Principe) +239",
    spritePosition: "0 -1804px"
  },
  {
    name: "圣赫勒拿",
    nameEn: "Saint Helena",
    code: "SH",
    phoneCode: "290",
    label: "圣赫勒拿 (Saint Helena) +290",
    spritePosition: "0 -1815px"
  },
  {
    name: "圣基茨和尼维斯",
    nameEn: "Saint Kitts and Nevis",
    code: "KN",
    phoneCode: "1869",
    label: "圣基茨和尼维斯 (Saint Kitts and Nevis) +1869",
    spritePosition: "0 -1826px"
  },
  {
    name: "圣卢西亚",
    nameEn: "Saint Lucia",
    code: "LC",
    phoneCode: "1758",
    label: "圣卢西亚 (Saint Lucia) +1758",
    spritePosition: "0 -1837px"
  },
  {
    name: "圣马丁",
    nameEn: "Saint Martin",
    code: "MF",
    phoneCode: "590",
    label: "圣马丁 (Saint Martin) +590",
    spritePosition: "0 -1848px"
  },
  {
    name: "圣马力诺",
    nameEn: "San Marino",
    code: "SM",
    phoneCode: "378",
    label: "圣马力诺 (San Marino) +378",
    spritePosition: "0 -1859px"
  },
  {
    name: "圣皮埃尔和密克隆",
    nameEn: "Saint Pierre and Miquelon",
    code: "PM",
    phoneCode: "508",
    label: "圣皮埃尔和密克隆 (Saint Pierre and Miquelon) +508",
    spritePosition: "0 -1870px"
  },
  {
    name: "圣文森特和格林纳丁斯",
    nameEn: "Saint Vincent and the Grenadines",
    code: "VC",
    phoneCode: "1784",
    label: "圣文森特和格林纳丁斯 (Saint Vincent and the Grenadines) +1784",
    spritePosition: "0 -1881px"
  },
  {
    name: "斯里兰卡",
    nameEn: "Sri Lanka",
    code: "LK",
    phoneCode: "94",
    label: "斯里兰卡 (Sri Lanka) +94",
    spritePosition: "0 -1892px"
  },
  {
    name: "斯洛伐克",
    nameEn: "Slovakia",
    code: "SK",
    phoneCode: "421",
    label: "斯洛伐克 (Slovakia) +421",
    spritePosition: "0 -1903px"
  },
  {
    name: "斯洛文尼亚",
    nameEn: "Slovenia",
    code: "SI",
    phoneCode: "386",
    label: "斯洛文尼亚 (Slovenia) +386",
    spritePosition: "0 -1914px"
  },
  {
    name: "斯瓦尔巴和扬马延",
    nameEn: "Svalbard and Jan Mayen",
    code: "SJ",
    phoneCode: "47",
    label: "斯瓦尔巴和扬马延 (Svalbard and Jan Mayen) +47",
    spritePosition: "0 -1925px"
  },
  {
    name: "斯威士兰",
    nameEn: "Swaziland",
    code: "SZ",
    phoneCode: "268",
    label: "斯威士兰 (Swaziland) +268",
    spritePosition: "0 -1936px"
  },
  {
    name: "苏丹",
    nameEn: "Sudan",
    code: "SD",
    phoneCode: "249",
    label: "苏丹 (Sudan) +249",
    spritePosition: "0 -1947px"
  },
  {
    name: "苏里南",
    nameEn: "Suriname",
    code: "SR",
    phoneCode: "597",
    label: "苏里南 (Suriname) +597",
    spritePosition: "0 -1958px"
  },
  {
    name: "所罗门群岛",
    nameEn: "Solomon Islands",
    code: "SB",
    phoneCode: "677",
    label: "所罗门群岛 (Solomon Islands) +677",
    spritePosition: "0 -1969px"
  },
  {
    name: "索马里",
    nameEn: "Somalia",
    code: "SO",
    phoneCode: "252",
    label: "索马里 (Somalia) +252",
    spritePosition: "0 -1980px"
  },
  {
    name: "塔吉克斯坦",
    nameEn: "Tajikistan",
    code: "TJ",
    phoneCode: "992",
    label: "塔吉克斯坦 (Tajikistan) +992",
    spritePosition: "0 -1991px"
  },
  {
    name: "泰国",
    nameEn: "Thailand",
    code: "TH",
    phoneCode: "66",
    label: "泰国 (Thailand) +66",
    spritePosition: "0 -2002px"
  },
  {
    name: "坦桑尼亚",
    nameEn: "Tanzania",
    code: "TZ",
    phoneCode: "255",
    label: "坦桑尼亚 (Tanzania) +255",
    spritePosition: "0 -2013px"
  },
  {
    name: "汤加",
    nameEn: "Tonga",
    code: "TO",
    phoneCode: "676",
    label: "汤加 (Tonga) +676",
    spritePosition: "0 -2024px"
  },
  {
    name: "特克斯和凯科斯群岛",
    nameEn: "Turks and Caicos Islands",
    code: "TC",
    phoneCode: "1649",
    label: "特克斯和凯科斯群岛 (Turks and Caicos Islands) +1649",
    spritePosition: "0 -2035px"
  },
  {
    name: "特立尼达和多巴哥",
    nameEn: "Trinidad and Tobago",
    code: "TT",
    phoneCode: "1868",
    label: "特立尼达和多巴哥 (Trinidad and Tobago) +1868",
    spritePosition: "0 -2046px"
  },
  {
    name: "突尼斯",
    nameEn: "Tunisia",
    code: "TN",
    phoneCode: "216",
    label: "突尼斯 (Tunisia) +216",
    spritePosition: "0 -2057px"
  },
  {
    name: "图瓦卢",
    nameEn: "Tuvalu",
    code: "TV",
    phoneCode: "688",
    label: "图瓦卢 (Tuvalu) +688",
    spritePosition: "0 -2068px"
  },
  {
    name: "土耳其",
    nameEn: "Turkey",
    code: "TR",
    phoneCode: "90",
    label: "土耳其 (Turkey) +90",
    spritePosition: "0 -2079px"
  },
  {
    name: "土库曼斯坦",
    nameEn: "Turkmenistan",
    code: "TM",
    phoneCode: "993",
    label: "土库曼斯坦 (Turkmenistan) +993",
    spritePosition: "0 -2090px"
  },
  {
    name: "托克劳",
    nameEn: "Tokelau",
    code: "TK",
    phoneCode: "690",
    label: "托克劳 (Tokelau) +690",
    spritePosition: "0 -2101px"
  },
  {
    name: "瓦利斯和富图纳",
    nameEn: "Wallis and Futuna",
    code: "WF",
    phoneCode: "681",
    label: "瓦利斯和富图纳 (Wallis and Futuna) +681",
    spritePosition: "0 -2112px"
  },
  {
    name: "瓦努阿图",
    nameEn: "Vanuatu",
    code: "VU",
    phoneCode: "678",
    label: "瓦努阿图 (Vanuatu) +678",
    spritePosition: "0 -2123px"
  },
  {
    name: "危地马拉",
    nameEn: "Guatemala",
    code: "GT",
    phoneCode: "502",
    label: "危地马拉 (Guatemala) +502",
    spritePosition: "0 -2134px"
  },
  {
    name: "委内瑞拉",
    nameEn: "Venezuela",
    code: "VE",
    phoneCode: "58",
    label: "委内瑞拉 (Venezuela) +58",
    spritePosition: "0 -2145px"
  },
  {
    name: "文莱",
    nameEn: "Brunei",
    code: "BN",
    phoneCode: "673",
    label: "文莱 (Brunei) +673",
    spritePosition: "0 -2156px"
  },
  {
    name: "乌干达",
    nameEn: "Uganda",
    code: "UG",
    phoneCode: "256",
    label: "乌干达 (Uganda) +256",
    spritePosition: "0 -2167px"
  },
  {
    name: "乌克兰",
    nameEn: "Ukraine",
    code: "UA",
    phoneCode: "380",
    label: "乌克兰 (Ukraine) +380",
    spritePosition: "0 -2178px"
  },
  {
    name: "乌拉圭",
    nameEn: "Uruguay",
    code: "UY",
    phoneCode: "598",
    label: "乌拉圭 (Uruguay) +598",
    spritePosition: "0 -2189px"
  },
  {
    name: "乌兹别克斯坦",
    nameEn: "Uzbekistan",
    code: "UZ",
    phoneCode: "998",
    label: "乌兹别克斯坦 (Uzbekistan) +998",
    spritePosition: "0 -2200px"
  },
  {
    name: "西班牙",
    nameEn: "Spain",
    code: "ES",
    phoneCode: "34",
    label: "西班牙 (Spain) +34",
    spritePosition: "0 -2211px"
  },
  {
    name: "希腊",
    nameEn: "Greece",
    code: "GR",
    phoneCode: "30",
    label: "希腊 (Greece) +30",
    spritePosition: "0 -2222px"
  },
  {
    name: "新加坡",
    nameEn: "Singapore",
    code: "SG",
    phoneCode: "65",
    label: "新加坡 (Singapore) +65",
    spritePosition: "0 -2233px"
  },
  {
    name: "新喀里多尼亚",
    nameEn: "New Caledonia",
    code: "NC",
    phoneCode: "687",
    label: "新喀里多尼亚 (New Caledonia) +687",
    spritePosition: "0 -2244px"
  },
  {
    name: "新西兰",
    nameEn: "New Zealand",
    code: "NZ",
    phoneCode: "64",
    label: "新西兰 (New Zealand) +64",
    spritePosition: "0 -2255px"
  },
  {
    name: "匈牙利",
    nameEn: "Hungary",
    code: "HU",
    phoneCode: "36",
    label: "匈牙利 (Hungary) +36",
    spritePosition: "0 -2266px"
  },
  {
    name: "叙利亚",
    nameEn: "Syria",
    code: "SY",
    phoneCode: "963",
    label: "叙利亚 (Syria) +963",
    spritePosition: "0 -2277px"
  },
  {
    name: "牙买加",
    nameEn: "Jamaica",
    code: "JM",
    phoneCode: "1876",
    label: "牙买加 (Jamaica) +1876",
    spritePosition: "0 -2288px"
  },
  {
    name: "亚美尼亚",
    nameEn: "Armenia",
    code: "AM",
    phoneCode: "374",
    label: "亚美尼亚 (Armenia) +374",
    spritePosition: "0 -2299px"
  },
  {
    name: "也门",
    nameEn: "Yemen",
    code: "YE",
    phoneCode: "967",
    label: "也门 (Yemen) +967",
    spritePosition: "0 -2310px"
  },
  {
    name: "伊拉克",
    nameEn: "Iraq",
    code: "IQ",
    phoneCode: "964",
    label: "伊拉克 (Iraq) +964",
    spritePosition: "0 -2321px"
  },
  {
    name: "伊朗",
    nameEn: "Iran",
    code: "IR",
    phoneCode: "98",
    label: "伊朗 (Iran) +98",
    spritePosition: "0 -2332px"
  },
  {
    name: "以色列",
    nameEn: "Israel",
    code: "IL",
    phoneCode: "972",
    label: "以色列 (Israel) +972",
    spritePosition: "0 -2343px"
  },
  {
    name: "意大利",
    nameEn: "Italy",
    code: "IT",
    phoneCode: "39",
    label: "意大利 (Italy) +39",
    spritePosition: "0 -2354px"
  },
  {
    name: "印度",
    nameEn: "India",
    code: "IN",
    phoneCode: "91",
    label: "印度 (India) +91",
    spritePosition: "0 -2365px"
  },
  {
    name: "印度尼西亚",
    nameEn: "Indonesia",
    code: "ID",
    phoneCode: "62",
    label: "印度尼西亚 (Indonesia) +62",
    spritePosition: "0 -2376px"
  },
  {
    name: "英国",
    nameEn: "United Kingdom",
    code: "GB",
    phoneCode: "44",
    label: "英国 (United Kingdom) +44",
    spritePosition: "0 -2387px"
  },
  {
    name: "英属维尔京群岛",
    nameEn: "British Virgin Islands",
    code: "VG",
    phoneCode: "1284",
    label: "英属维尔京群岛 (British Virgin Islands) +1284",
    spritePosition: "0 -2398px"
  },
  {
    name: "约旦",
    nameEn: "Jordan",
    code: "JO",
    phoneCode: "962",
    label: "约旦 (Jordan) +962",
    spritePosition: "0 -2409px"
  },
  {
    name: "越南",
    nameEn: "Vietnam",
    code: "VN",
    phoneCode: "84",
    label: "越南 (Vietnam) +84",
    spritePosition: "0 -2420px"
  },
  {
    name: "赞比亚",
    nameEn: "Zambia",
    code: "ZM",
    phoneCode: "260",
    label: "赞比亚 (Zambia) +260",
    spritePosition: "0 -2431px"
  },
  {
    name: "乍得",
    nameEn: "Chad",
    code: "TD",
    phoneCode: "235",
    label: "乍得 (Chad) +235",
    spritePosition: "0 -2442px"
  },
  {
    name: "直布罗陀",
    nameEn: "Gibraltar",
    code: "GI",
    phoneCode: "350",
    label: "直布罗陀 (Gibraltar) +350",
    spritePosition: "0 -2453px"
  },
  {
    name: "智利",
    nameEn: "Chile",
    code: "CL",
    phoneCode: "56",
    label: "智利 (Chile) +56",
    spritePosition: "0 -2464px"
  },
  {
    name: "中非共和国",
    nameEn: "Central African Republic",
    code: "CF",
    phoneCode: "236",
    label: "中非共和国 (Central African Republic) +236",
    spritePosition: "0 -2475px"
  },
  {
    name: "中国",
    nameEn: "China",
    code: "CN",
    phoneCode: "86",
    label: "中国 (China) +86",
    spritePosition: "0 -2486px"
  }
];

const selectedCountry = ref("CN");
const phoneNumber = ref("");

const getSelectedCountryCode = computed(() => {
  const country = countries.find((c) => c.code === selectedCountry.value);
  return country ? country.phoneCode : "";
});

const emit = defineEmits(["update:modelValue"]);

const handlePhoneInput = (value: string) => {
  // 只允许输入数字
  phoneNumber.value = value.replace(/[^\d]/g, "");
  emit("update:modelValue", {
    countryCode: selectedCountry.value,
    phoneNumber: phoneNumber.value
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

// 暴露给父组件的值
defineExpose({
  phoneNumber,
  selectedCountry,
  countries
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
