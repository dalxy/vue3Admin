<template><div class="test2">儿子</div></template>
<script lang="ts" setup>
let aaa = [
  {
    eventPlanInfoList: [
      {
        repairModelList: [
          {
            costCenterDesc: null,
            planFinish: false,
            settlementTypeFinish: false,
            perceptionSymptomFinish: false
          },
          {
            planFinish: true,
            settlementTypeFinish: false,
            perceptionSymptomFinish: false
          }
        ]
      }
    ]
  },
  {
    eventPlanInfoList: [
      {
        repairModelList: [
          {
            costCenterDesc: null,
            planFinish: true,
            settlementTypeFinish: false,
            perceptionSymptomFinish: false
          },
          {
            planFinish: true,
            settlementTypeFinish: false,
            perceptionSymptomFinish: false
          }
        ]
      }
    ]
  }
];

aaa.forEach((item) => {
  item.eventPlanInfoList.forEach((event) => {
    // Check if all planFinish in repairModelList are true
    const allPlanFinishTrue = event.repairModelList.every(
      (repairModel) => repairModel.planFinish === true
    );

    // Add or update the bbb property based on the condition
    event.bbb = allPlanFinishTrue;
  });
});

console.log(aaa, 'aaaaaaaaa');

</script>
