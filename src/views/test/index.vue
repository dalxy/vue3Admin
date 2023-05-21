<template>
  <div class="test">我是父亲</div>
  <test2 />
</template>
<script lang="ts" setup>
import axios from "axios";

axios({
  method: "post",
  url: "https://103.102.200.38/graphql",
  headers: {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Authorization: {
      Cookie:
        "kpf=PC_WEB; clientid=3; did=web_7d17a6efb7b9c200a82bc72071af7a3d; ktrace-context=1|MS43NjQ1ODM2OTgyODY2OTgyLjM5NjYzMTUxLjE2ODQ1NTU3MDYxMjQuNTI2OTE2|MS43NjQ1ODM2OTgyODY2OTgyLjc5OTk4Njk5LjE2ODQ1NTU3MDYxMjQuNTI2OTE3|0|graphql-server|webservice|false|NA; kpn=KUAISHOU_VISION"
    },
    Connection: "keep-alive",
    "Content-Length": "1571",
    "Content-Type": "application/json",

    Host: "www.kuaishou.com",
    Origin: "https://www.kuaishou.com",
    Referer: "https://www.kuaishou.com/?isHome=1",
    "Sec-Ch-Ua":
      "'Google Chrome';v='113', 'Chromium';v='113', 'Not-A.Brand';v='24'",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "'Windows'",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"
  }
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
</script>
