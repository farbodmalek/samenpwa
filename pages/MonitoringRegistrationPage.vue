<template>
  <div>
    <header class="ham bg-primary" style="height: 50px">
      <div class="d-flex justify-content-between pt-1 px-2">
        <div class="px-1 py-2">
          <span class="px-1 font3 fw-bold text-white">
            {{ toPersianNumber(customer) }}</span
          >
          <span class="fw-bold text-white font-text">:شماره مشتری </span>
        </div>
        <div class="d-flex">
          <span class="px-2 py-2 fw-bold text-white font-header">
            {{ customerName }}</span
          >
          <a
            href="#"
            class="burger-btn d-block d-xl-none text-white position-relative mx-4"
            @click="goBack"
            ><img
              src="../assets\images\back.png  "
              class="position-absolute top-0 bottom-0"
              style="width: 50px; height: 50px; left: -15px"
            />
          </a>
        </div>
      </div>
    </header>
    <component
      :isBack="isBack"
      :is="currentComponent"
      @showComponent="showComponent"
      class="slide-in transition"
    />
    <P class="text-danger text-center">
      {{ Error }}
    </P>

    <div v-if="isModalVisible" class="modal-container">
      <div class="modal-home col-10">
        <p class="text-center">
          برای این پرونده ارجاع شده نظارتی انجام نشده است .پرداخت دستمزد منوط به
          اتمام مراحل است ایا باز مایل به خروج هستید؟
        </p>
        <div class="col-12 d-flex justify-content-center">
          <div class="col-12 d-flex justify-content-center gap-2">
            <button
              class="btn btn-primary rounded-5 font1 col-6 text-white bg-success py-3"
              type="button"
              @click="HomeButton"
            >
              بله
            </button>
            <button
              class="btn btn-primary rounded-5 font1 col-6 bg-danger text-white py-3"
              type="button"
              @click="closeModal"
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalPlanSurvey" class="modal-container">
      <div class="modal-home col-10">
        <p class="text-center">خطا در ارسال. یکی از روش های زیر انتخاب کنید</p>
        <div class="col-12 d-flex justify-content-center">
          <div class="col-12 d-flex justify-content-center gap-2">
            <button
              class="btn btn-primary rounded-5 font1 col-6 text-white bg-success py-3"
              type="button"
              @click="sendformRequestoffline"
            >
              ارسال افلاین
            </button>
            <button
              class="btn btn-primary rounded-5 font1 col-6 bg-danger text-white py-3"
              type="button"
              @click="sendformRequestonline"
            >
              ارسال آنلاین
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-if="sucssecsend" class="sucssecsend text-center pt-4">
      نظارت با موفقیت ارسال شد
    </p>
    <p v-if="sucssec" class="errorsucssec text-center pt-4">
      نظارت با موفقیت ثبت شد
    </p>
    <div v-if="closePlanSurvey" class="modal-container">
      <div class="modal-home col-10">
        <p class="text-center">
          نظارت با موفقیت ذخیره شد تا ساعت 24نظارت حتما به سرور ارسال نمایید
        </p>
        <div class="col-12 d-flex justify-content-center">
          <div class="col-12 d-flex justify-content-center gap-2">
            <nuxt-link to="/" class="col-9">
              <button
                class="btn btn-primary rounded-5 font1 col-12 text-white bg-success py-3"
                type="button"
              >
                بستن نظارت
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="overlay" v-if="isLoading">
    <div class="spinner-container">
      <div class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <p
    v-if="IsHaserequestModal"
    class="error text-center pt-2 pt-4"
  >
    درحال ارسال عکس لطفا صبر کنید
  </p>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Component1 from "~/pages/componenet/CustomerInformation.vue";
import Component2 from "~/pages/componenet/CompletionInformation.vue";
import Component3 from "~/pages/componenet/FinalRegistration.vue";
import Component4 from "~/pages/componenet/MapPage.vue";
import { ApplicationStatus } from "~/store/ApplicationStatus"
import {BaseUrl} from "~/store/BaseApi"


const route = useRouter();
const currentComponent = ref(Component1);
const data = localStorage.getItem("GetCartables");
const dataArray = JSON.parse(data);
const img = ref([]);
const sucssec = ref(false);
const sucssecsend = ref(false);
const target = route.currentRoute._value.query.cardName;
const number = route.currentRoute._value.query.loanEconomicTypeId;
let customerName = "";
const requestStatus= ApplicationStatus()
const IsHaserequestModal=ref(false)
let customer = "";
const isLoading = ref(false);
let isBack = ref(false);
let loanId = "";
const dataform = ref();
const modalPlanSurvey = ref(false);
const router = useRouter();
let key = "";
const Url=BaseUrl
const closePlanSurvey = ref(false);
const targetObject = dataArray.find((item) => item.id === Number(target));
if (targetObject) {
  customerName = targetObject.loanDetail.customerName;
  customer = targetObject.loanDetail.customerNumber;
  loanId = targetObject.loanId;
}

const Error = ref();
definePageMeta({
  layout: " ",
});

const submittedData = ref({
  survey: {
    numberOfJobsCreated: null,
    numberOfInsurdPerson: null,
    planId: null,
    cartableId: null,
    planActivationTypeId: null,
    endOfActivationDate: null,
    constructionApproval: null,
    constructionPercentageProgress: null,
    constructionDescription: null,
    isEquipmentBought: null,
    isFactorMatch: null,
    isValidPlanNo: null,
    equipmentTypeId: null,
    equipmentDescription: null,
    surveyReport: null,
    customerOffer: null,
    latitude: null,
    longitude: null,
    planLivestockSurvey: null,
    planGardenSurvey: null,
    planIndustrialSurvey: null,
    planServiceSurvey: null,
    surveyDate: null,
    userId: null,
    guidList: [],
  },
});
const isModalVisible = ref(false);

const showModal = () => {
  isModalVisible.value = true;
};
const HomeButton = () => {
  localStorage.removeItem("customerform");
  localStorage.removeItem("LiveStock");
  localStorage.removeItem("gardenig");
  localStorage.removeItem("completionform");
  localStorage.removeItem("FinalRegistrationform");
  router.push("/");
};

const closeModal = () => {
  isModalVisible.value = false;
};

const goBack = () => {
  if (currentComponent.value.__name === "CustomerInformation") {
    showModal();
  } else if (currentComponent.value.__name === "CompletionInformation") {
    currentComponent.value = Component1;
  } else if (currentComponent.value.__name === "FinalRegistration") {
    isBack.value = true;
    currentComponent.value = Component3;
    setTimeout(() => {
      currentComponent.value = Component2;
    }, 50);
  }
};
const showComponent = async (id, data) => {
  if (id === 1) {
    submittedData.value.loanPlan = data.value;
    submittedData.value.survey.isValidPlanNo = data.value.isValidPlanNo;
    currentComponent.value = Component2;
  }

  if (id === 2) {
    currentComponent.value = Component3;
    isBack.value = false;
    submittedData.value.loanPlan.insuranceTypeId = data.value.insuranceTypeId;
    submittedData.value.loanPlan.workShopCode = data.value.workShopCode;
    submittedData.value.survey.longitude =
      submittedData.value.loanPlan.longitude;
    submittedData.value.survey.latitude = submittedData.value.loanPlan.latitude;
    submittedData.value.survey.numberOfInsurdPerson =
      data.value.numberOfInsurdPerson;
    submittedData.value.survey.numberOfJobsCreated =
      data.value.numberOfJobsCreated;
    if (number == 3) {
      submittedData.value.survey.planServiceSurvey = {
        PresenceTypeId: data.value.PresenceTypeId,
        HasWorkPermission: data.value.HasWorkPermission,
        OwnerTypeId: data.value.OwnerTypeId,

      };
    }
    if (number == 4) {
      submittedData.value.survey.planIndustrialSurvey = {
        PresenceTypeId: data.value.PresenceTypeId,
        HasWorkPermission: data.value.HasWorkPermission,
        OwnerTypeId: data.value.OwnerTypeId,

      };
    }
    if (number == 1) {
      submittedData.value.survey.planLivestockSurvey = {
        LivestockBooklet: data.value.LivestockBooklet,
        LivestockLicense: data.value.LivestockLicense,
        LivestockInsurance: data.value.LivestockInsurance,
        InsuranceDate: data.value.InsuranceDate,
        NumberOfInsuredLivestock: data.value.NumberOfInsuredLivestock,
        LivestockTypeId:  data.value.LivestockTypeId ,
        NumberOfMaleLivestock:  data.value.NumberOfMaleLivestock ,
        NumberOfFemaleLivestock: data.value.NumberOfFemaleLivestock,
        livestockTypes: data.value.livestockType,
      };
    }
    if (number == 2) {
      submittedData.value.survey.planGardenSurvey = {
        OwnerTypeId: data.value.OwnerTypeId,
        ProductTypeId: data.value.ProductTypeId,
        LandArea: data.value.LandArea,
        CultivatedLandArea: data.value.CultivatedLandArea,
        HasAgriculturalInsurance: data.value.HasAgriculturalInsurance,
        EndOfAgriculturalInsurance: data.value.EndOfAgriculturalInsurance,
      };
    }
  }

  if (id === 3) {
    submittedData.value.survey.planActivationTypeId =
      data.value.planActivationTypeId;
    submittedData.value.survey.constructionApproval =
      data.value.constructionApproval;
    submittedData.value.survey.surveyReport = data.value.surveyReport;
    submittedData.value.survey.customerOffer = data.value.customerOffer;
    submittedData.value.survey.isEquipmentBought = data.value.isEquipmentBought;
    submittedData.value.survey.planActivationTypeId =
      data.value.planActivationTypeId;
    submittedData.value.survey.endOfActivationDate =
      data.value.endOfActivationDate;
    submittedData.value.survey.isFactorMatch = data.value.isFactorMatch;
    submittedData.value.survey.constructionPercentageProgress =
      data.value.constructionPercentageProgress;
    submittedData.value.survey.constructionDescription =
      data.value.constructionDescription;
    submittedData.value.survey.equipmentTypeId = data.value.equipmentTypeId;
    submittedData.value.survey.equipmentDescription =
      data.value.equipmentDescription;
    submittedData.value.survey.guidList = data.value.guidList;
    submittedData.value.survey.cartableId = data.value.cartableId;
    submittedData.value.survey.endOfActivationDate =
      data.value.endOfActivationDate;
    submittedData.value.survey.guidList = data.value.guidList;
    submittedData.value.survey.userId = data.value.userId;
    submittedData.value.survey.surveyDate = data.value.surveyDate;

    const currentUserId = target;
    const currentUsername = "example_user";
    key = `user_${currentUserId}_${currentUsername}`;
    const body = submittedData.value;
    const userDataString = JSON.stringify(body);

    const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
    const supervisoryInfo =JSON.parse(SupervisoryInfo)
    try {



      if(requestStatus.isHaserequest==false){
        isLoading.value = true;
        const config = { headers: { Authorization: "Bearer " + supervisoryInfo.token } };
        const response = await axios
          .post(
             `${Url + "api/survey/SetLoanPlanSurvey"}`,
            body,
            config
          )
          .then((response) => {
            sucssecsend.value = true;
            setTimeout(() => {
              sucssecsend.value = false;
              isLoading.value = false;
            }, 2000);
            if (response.status === 200 && response.data.result == null) {
              Error.value = response.data.serverErrors[0].hint;
              setTimeout(() => {
                Error.value = "";
                // router.push('/')
              }, 10000);
            } else {
              sucssec.value = true;
              setTimeout(() => {
                router.push("/");
                localStorage.removeItem("customerform");
                localStorage.removeItem("LiveStock");
                localStorage.removeItem("gardenig");
                localStorage.removeItem("completionform");
                localStorage.removeItem("FinalRegistrationform");
              }, 8000);
            }
          });
        isLoading.value = false;
      }else{
        IsHaserequestModal.value=true
        setTimeout(()=>{
          IsHaserequestModal.value=false
        },1500)
      }


    } catch (error) {
      isLoading.value = false;
      console.log(body)
      modalPlanSurvey.value = true;
      dataform.value = userDataString;
    }
  }
};

const sendformRequestoffline = () => {
  localStorage.setItem(key, dataform.value);
  localStorage.removeItem("customerform");
  localStorage.removeItem("LiveStock");
  localStorage.removeItem("gardenig");
  localStorage.removeItem("completionform");
  closePlanSurvey.value = true;
  // router.push('/')
};

const sendformRequestonline = async () => {
  modalPlanSurvey.value = false;


};

const toPersianNumber = (number) => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (digit) => persianNumbers[digit]);
};
</script>
<style lang="scss">
.font3 {
  font-size: 10px;
}

.title-header {
  width: 47px;
  background-color: #e5e5e5;
  height: 38px;
  top: 0;
  right: -8px;
  border-bottom-left-radius: 5px;
  border-top: 5px;
  padding: 5px 0px 0px 5px;
  font-size: 20px;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* پس زمینه تاریک پشت مدال */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-home {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.slide-in {
  transform: translateX(100%);
  transition: transform 0.5s ease-in-out;
}

.transition {
  transition: 10s;
  transition-behavior: normal;
  transition-duration: 1s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: all;
}

.errorsucssec {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: #00b515;
  color: white;
}

.sucssecsend {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: #fca40f;
  color: white;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.spinner-container {
  width: 100%;
  height: 100%;

  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
