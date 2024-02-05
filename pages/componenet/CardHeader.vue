<template>
  <div>
    <img
      class="d-block card-img img-fluid"
      src="/img/service.jpg"
      alt=""
      v-if="loanSurvey==3"
    />
    <img
      class="d-block card-img img-fluid"
      src="/img/industrial.jpg"
      alt=""
      v-if="loanSurvey==4"
    />  <img
    class="d-block card-img img-fluid"
    src="/img/gardening.jpg"
    alt=""
    v-if="loanSurvey==2"
  />  <img
    class="d-block card-img img-fluid"
    src="/img/agriculture.jpg"
    alt=""
    v-if="loanSurvey==1"
  />
    <!-- card details header -->
    <div class="px-2">
      <div class="d-flex overflow-hidden border-black" style="width: 100%">
        <div
          class="rounded-bottom border border-primary m-1 bg-white"
          style="width: 25%"
        >
          <div style="width: 5rem; height: 5rem" class="">
            <div class="text-center text-black font4 py-3 px-1 ">
              <span class="d-block text-center pb-2 numfont ">{{  formatNumberWithCommas(numberOfDelayedInstallment.toLocaleString('fa-IR'))}}</span>
              <strong class="font1 fw-bold  ">تعداد اقساط پرداخت نشده </strong>
            </div>
          </div>
        </div>    <div


        class="rounded-bottom border border-primary m-1 bg-white"
        style="width: 25%"
      >
        <div style="width: 5rem; height: 5rem" class="">
          <div class="text-center text-black font4 py-3 px-1 ">
            <span class="d-block text-center pb-2 numfont ">{{ formatNumberWithCommas(totalDelayedAmount.toLocaleString('fa-IR'))}}</span>
            <strong class="font1 fw-bold">کل معوقات</strong>
          </div>
        </div>
      </div>
        <div


        class="rounded-bottom border border-primary m-1 bg-white"
        style="width: 25%"
      >
        <div style="width: 5rem; height: 5rem" class="">
          <div class="text-center text-black font4 py-3 px-1 ">
            <span class="d-block text-center pb-2 numfont ">{{   formatNumberWithCommas(eachInstallmentAmount.toLocaleString('fa-IR')) }}</span>
            <strong class="font1 fw-bold">مبلغ هر قسط</strong>
          </div>
        </div>
      </div>
        <div


        class="rounded-bottom border border-primary m-1 bg-white"
        style="width: 25%"
      >
        <div style="width: 5rem; height: 5rem" class="">
          <div class="text-center text-black font4 py-3 px-1 ">
            <span class="d-block text-center pb-2 numfont ">{{ formatNumberWithCommas(loanAmount.toLocaleString('fa-IR')) }}</span>
            <strong class="font1 fw-bold">مبلغ تسهیلات</strong>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route =useRouter()
const data = localStorage.getItem('GetCartables');
const dataArray = JSON.parse(data);
const target =route.currentRoute._value.query.cardName;
const loanSurvey =route.currentRoute._value.query.loanEconomicTypeId;


let loanAmount = ref(0);
let numberOfDelayedInstallment = ref(0);
let eachInstallmentAmount = ref(0);
let totalDelayedAmount = ref(0);

let TotalArrears = ref(0);
const targetObject = dataArray.find(item => item.id === Number(target));

if (targetObject) {
  loanAmount = targetObject.loanDetail.loanAmount ;
  eachInstallmentAmount = targetObject.loanDetail.eachInstallmentAmount  ;
  totalDelayedAmount=targetObject.loanDetail.totalDelayedAmount
  numberOfDelayedInstallment=targetObject.loanDetail.numberOfDelayedInstallment

}
const formatNumberWithCommas = (value) => {
  if (value === null || value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


</script>
<style lang="scss">


@media screen and (max-width: 395px) { // iPhone 13 width
  .numfont {
   font-size: 13px;
    text-align: start;
  }

  // Add any other necessary media query styles
}

</style>
