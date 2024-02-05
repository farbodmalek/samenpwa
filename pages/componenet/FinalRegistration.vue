<template>
  <Carddetails />
  <form>
    <div>
      <!-- section فعال بودن طرح  -->
      <div class="flex-column px-1">
        <!-- header section  -->
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-4"
            >فعال بودن طرح</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>

        <div
          class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2 font-size"
        >
          <label class="col-4 p-1 font-size">
            <input
              type="radio"
              name="Plan "
              v-model="form.planActivationTypeId"
              :value="3"
            />
            <div
              class="front-end boxPlan px-2 border border-secondary col-12 rounded-4 py-3 font2"
              @click="setCurrentTab(3)"
            >
              <span> مهلت جهت انجام تعهدات </span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Plan "
              v-model="form.planActivationTypeId"
              :value="2"
            />
            <div
              class="front-end boxPlan px-2 border border-secondary col-12 rounded-4 py-3"
              @click="setCurrentTab(2)"
            >
              <span> غیر فعال </span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Plan "
              v-model="form.planActivationTypeId"
              :value="1"
            />

            <div
              class="front-end boxPlan px-2 border border-secondary col-12 rounded-4 py-3"
              @click="setCurrentTab(1)"
            >
              <span> فعال </span>
            </div>
          </label>
        </div>

        <div class="tab-content">
          <div v-if="currentTab === 3">
            <div
              class="d-flex justify-content-between mt-4 pt-1 px-2 col-12 text-center"
            >
              <Calendar
                :date="date"
                class="rounded-5"
                @send-date="handleReceivedDate"
              />
              <p class="py-2 fw-bold text-black data">
                  {{ form.endOfActivationDate }}:تاریخ اتمام مهلت فعال بودن
              </p>
            </div>
          </div>
          <div v-if="currentTab === 2"></div>
          <div v-if="currentTab === 1"></div>
        </div>
      </div>
      <p
        v-if="error && form.planActivationTypeId === null"
        class="error text-center pt-2 pt-4"
      >
        فعال بودن طرح نمی تواند خالی باشد
      </p>
      <!-- section مصوبه ساخت و ساز  -->
      <div class="flex-column">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-3" style="width: 130px"
            >مصوبه ساخت ساز</strong>
          <hr class="v-divider v-theme--light" />
        </div>
        <div class="px-3">
          <div
            class="middle col-12 mb-3 d-flex justify-content-center bg-white py-2 px-2 col-md-12 pb-4 pt-2 rounded-4">
            <label class="col-6 px-1" @click="BTab(0)">
              <input
                type="radio"
                name="Building"
                v-model="form.constructionApproval"
                :value="0"
              />
              <div
                class="back-end boxBuilding rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>ندارد</span>
              </div>
            </label>
            <label class="col-6 px-1" @click="BTab(1)">
              <input
                type="radio"
                name="Building"
                v-model="form.constructionApproval"
                :value="1"
              />
              <div
                class="front-end boxBuilding rounded-pill p-3 col-12 border border-end-0 px-1"
              >
                <span>دارد</span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <p
        v-if="error && form.constructionApproval === null"
        class="error text-center pt-2 pt-4"
      >
        مصوبه ساخت و ساز نمی تواند خالی باشد
      </p>
      <div v-if="BTabs === 1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr
            class="v-divider theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
          <strong class="mx-2 text-black text-center col-2">شرح عملیات</strong>
          <hr
            class="v-divider v-theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
        </div>
        <div class="mb-3 pt-3 text-end">
          <input
            type="text"
            class="form-control bg-white text-end"
            id="formGroupExampleInput"
            style="height: 75px"
            v-model="form.constructionPercentageProgress"
            placeholder="درصد پیشرفت"
            inputmode="numeric"
            @input="form.constructionPercentageProgress = convertPersianNumbersToEnglish(form.constructionPercentageProgress)"
          />
        </div>
        <div class="mb-3 pt-3">
          <textarea
            type="text"
            class="form-control bg-white text-end"
            id="formGroupExampleInput"
            style="height: 100px"
            v-model="form.constructionDescription"
            placeholder="شرح عملیات عمرانی"
          />
        </div>
      </div>

      <!-- section وضعیت تجهیزات -->
      <div class="flex-column px-1">
        <!-- header section  -->
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-8"
            >وضعیت تجهیرات طبق مصوبه و پرونده</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>
        <!-- choose tabs  -->
        <div
          class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2 font-size"
        >
          <label class="col-4 p-1">
            <input
              type="radio"
              name="Equipment "
                v-model="form.isEquipmentBought"
              :value="0"
            />
            <div
              class="front-end boxEquipment px-2 border border-secondary col-12 rounded-4 py-3"
              @click="setTabForEquipmentBought(3)"
            >
              <span> تجهزات ندارد </span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Equipment "
              v-model="form.isEquipmentBought"
              :value="0"
            />
            <div
              class="front-end boxEquipment px-2 border border-secondary col-12 rounded-4 py-3"
              @click="setTabForEquipmentBought(2)"
            >
              <span> خریداری نشده </span>
            </div>
          </label>

          <label class="col-4 p-1">
            <input
              type="radio"
              name="Equipment "
              v-model="form.isEquipmentBought"
              :value="1"
            />

            <div
              class="front-end boxEquipment px-2 border border-secondary col-12 rounded-4 py-3"
              @click="setTabForEquipmentBought(1)"
            >
              <span> خریداری شده </span>
            </div>
          </label>
        </div>

        <!-- tabs area  -->
        <div class="tab-content">
          <div v-if="Tab === 1">
            <div class="flex-column px-1">
              <div class="d-flex p-2 justify-content-between">
                <div class="middle mb-3 col-9 ms-4 rounded-5">
                  <label
                    class="col-6 border border-end-0 col-6 border-end-0 col-6"
                  >
                    <input
                      type="radio"
                      name="matching"
                      v-model="form.isFactorMatch"
                      :value="0"
                    />
                    <div
                      class="front-end col-12 boxmatching py-2 border-end-2 border border-secondary rounded-start-pill"
                    >
                      <span>خیر</span>
                    </div>
                  </label>

                  <label class="col-6 border">
                    <input
                      type="radio"
                      name="matching"
                      v-model="form.isFactorMatch"
                      :value="1"
                    />
                    <div
                      class="back-end boxmatching col-12 py-2 col-12 border-end-2 border border-secondary rounded-end-pill"
                    >
                      <span>بلی</span>
                    </div>
                  </label>
                </div>
                <p class="py-2 text-center text-start">تطابق با فاکتور  </p>
              </div>
              <!--form header-->
              <div class="col col-12 d-flex align-center pt-1">
                <hr
                  class="v-divider theme--light"
                  aria-orientation="horizontal"
                  role="separator"
                />
                <strong class="mx-2 text-black text-center col-3"
                  >نوع تجهیزات</strong
                >
                <hr
                  class="v-divider v-theme--light"
                  aria-orientation="horizontal"
                  role="separator"
                />
              </div>
              <!--tab form-->
              <div
                class="middle mb-3 d-flex col-12 font1 fw-bold bg-white px-2 py-2 font-size"
              >
                <label class="col-4 p-1">
                  <input
                    type="radio"
                    name="ownership "
                    v-model="form.equipmentTypeId"
                    :value="3"
                  />
                  <div
                    class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3 font2"
                  >
                    <span>بخشی نو و بخشی کارکرده</span>
                  </div>
                </label>

                <label class="col-4 p-1">
                  <input
                    type="radio"
                    name="ownership "
                    v-model="form.equipmentTypeId"
                    :value="2"
                  />
                  <div
                    class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
                  >
                    <span> کارکرده و دست دو </span>
                  </div>
                </label>

                <label class="col-4 p-1">
                  <input
                    type="radio"
                    name="ownership "
                    v-model="form.equipmentTypeId"
                    :value="1"
                  />

                  <div
                    class="front-end boxownership px-2 border border-secondary col-12 rounded-4 py-3"
                  >
                    <span> جدید نو </span>
                  </div>
                </label>
              </div>
              <!--input form-->
              <div class="col col-12 d-flex align-center pt-1">
                <hr
                  class="v-divider theme--light"
                  aria-orientation="horizontal"
                  role="separator"
                />
                <strong class="mx-2 text-black text-center col-3"
                  >شرح تجهیزات</strong
                >
                <hr
                  class="v-divider v-theme--light"
                  aria-orientation="horizontal"
                  role="separator"
                />
              </div>
              <div class="mb-3 pt-3">
                <textarea
                  type="text"
                  class="form-control bg-white text-end"
                  id="formGroupExampleInput"
                  style="height: 75px"
                  v-model="form.equipmentDescription"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        v-if="error && form.isEquipmentBought === null"
        class="error text-center pt-2 pt-4"
      >
        وضعیت تجهیرات نمیتواند خالی باشد
      </p>
      <!-- section گزارش -->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr class="v-divider theme--light" />
          <strong class="mx-2 text-black text-center col-8"
            >گزارش همیار نظارت و وصول مطالبات</strong
          >
          <hr class="v-divider v-theme--light" />
        </div>
        <div class="mb-3 pt-3">
          <textarea
            type="text"
            class="form-control bg-white text-end"
            v-model="form.surveyReport"
            style="height: 75px"

          />
        </div>
      </div>
      <p
        v-if="error && form.surveyReport.trim() === ''"
        class="error text-center pt-2 pt-4"
      >
        گزارش همیار نظارت نمی تواند خالی باشد
      </p>
      <!-- section پیشنهاد -->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr
            class="v-divider theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
          <strong class="mx-2 text-black text-center col-9"
            >پیشنهاد متقاضی جهت و بهبود کسب وکار</strong
          >
          <hr
            class="v-divider v-theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
        </div>
        <div class="mb-3 pt-3">
          <textarea
            type="text   "
            class="form-control bg-white text-end"
            id="formGroupExampleInput"
            style="height: 75px"
            v-model="form.customerOffer"
          />
        </div>
      </div>
      <p
        v-if="error && form.customerOffer === ''"
        class="error text-center pt-2 pt-4"
      >
        پیشنهاد متقاضی نمی تواند خالی باشد
      </p>
      <!-- section گرفتن عکس  -->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1">
          <hr
            class="v-divider theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
          <strong class="mx-2 text-black text-center col-4">گرفتن عکس </strong>
          <hr
            class="v-divider v-theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
        </div>
        <div>
          <div
            class="bg-white position-relative overflow-hidden"
            style="height: max-content"
          >
            <!-- Display each uploaded image along with a "Remove" button -->
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="d-flex"
            >
              <img
                :src="image.url"
                alt="Uploaded Image"
                style="height: 150px"
              />
              <div @click="removeImage(index)">
                <img
                  src="/img/icons8-delete-48.png"
                  class="text-danger d-flex px-1"
                />
              </div>
            </div>
            <div v-if="uploadProgress !== null" class="text-center pt-2">
              درحال ارسال{{ totalUploadedFiles }} عکس از 5 لطفا صبر کنید %{{
                uploadProgress
              }}
            </div>
            <p v-if="finishephoto" class="sendphoto text-center pt-2 pt-4">
              عکس ارسال شد
            </p>
            <p v-if="finisheErrorphoto" class="sendphoto text-center pt-2 pt-4">
              عکس ارسال نشد لطفا مجدد تلاش کنید
            </p>
            <!-- Input for selecting a new image -->
            <label
              for="fileInput"
              class="custom-file-upload btn btn-primary rounded-3 bg-secondary mt-5"
            >
              انتخاب عکس
            </label>
            <input
              id="fileInput"
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              multiple
              style="display: none"
            />
          </div>
        </div>
      </div>
      <p v-if="errorLength" class="error text-center pt-2 pt-4">
        حداقل 5 عکس بارگزاری کنید
      </p>
      <div
        v-if="InvalidFile"
        class="error text-center pt-2 pt-4 text-right"
        dir="rtl"
      >
        <p>نوع فایل باید jpg باشد</p>
      </div>
      <!-- section تایید  -->
      <div class="flex-column px-1">
        <div class="col col-12 d-flex align-center pt-1 pb-1">
          <hr
            class="v-divider theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
          <strong class="mx-2 text-black text-center col-2">تایید ثبت</strong>
          <hr
            class="v-divider v-theme--light"
            aria-orientation="horizontal"
            role="separator"
          />
        </div>
        <!--    <div-->
        <!--        class="px-1 col col-12 d-flex align-center pt-1 px-2 d-flex justify-content-between"-->
        <!--    >-->
        <!--      <strong class="mx-2 text-black text-center py-2 col-11"-->
        <!--      ></strong-->
        <!--      >-->
        <!--      <input type="checkbox" class="px-5" v-model="form.confirmation"/>-->
        <!--    </div>-->
        <div
          class="px-1 col col-12 align-center pt-1 px-2 justify-content-between"
        >
          <div class="col-12 d-flex gap-5">
            <p class="mx-2 text-black text-center py-2font-checkbox col-9">
              کلیه اطلاعات فوق را با دقت و رعایت حقوق صندوق و امانتداری تکمیل
              کرده ام و در صورت شدن هر گونه انحرافی عواقب ناشی از ان را میپذیرم
            </p>
            <input type="checkbox" class="py-2" v-model="form.confirmation" />
          </div>
        </div>
      </div>
      <p
        v-if="error && form.confirmation === null"
        class="error text-center pt-2 pt-4"
      >
        شرایط ثبت نظارت حتما باید انتخاب شود
      </p>
      <p
        v-if="IsHaserequestModal"
        class="error text-center pt-2 pt-4"
      >
      درحال ارسال عکس لطفا صبر کنید
      </p>


      <!-- button ثبت نظارت    -->
      <div class="d-grid col-11 mx-auto py-3 mt-4 mb2">
        <button
          class="btn btn-primary rounded-pill p-3 btn-disabled"
          type="button"
          @click="validateRadioSelection"
        >
          ثبت نظارت
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Carddetails from "./CardHeader.vue";
import Calendar from "./Calendar.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { BTabs } from "bootstrap-vue-next";
import { ApplicationStatus } from "~/store/ApplicationStatus"
import {BaseUrl} from "~/store/BaseApi"


const router = useRouter();
const currentTab = ref(1);
const Tab = ref();
const Url=BaseUrl
const requestStatus= ApplicationStatus()

import axios from "axios";

const props = defineProps({
  isBack: {
    default: false,
    type: Boolean,
  },
});

const BTabs = ref(0);
const receivedDate = ref(null);
const errorLength = ref(false);
const InvalidFile = ref();
const emit = defineEmits(["showComponent"]);
const error = ref(false);
const calender = ref(false);
const data = localStorage.getItem("GetCartables");
const dataArray = JSON.parse(data);
let totalFileslength = 0;
let totalUploadedFiles = 0;
const uploadProgress = ref(null);
const SupervisoryInfo = localStorage.getItem("SupervisoryInfo");
const supervisoryInfo =JSON.parse(SupervisoryInfo)
const target = router.currentRoute._value.query.cardName;
const finishephoto = ref(false);
const finisheErrorphoto = ref(false);
const IsHaserequestModal=ref(false)
const handeleError = ref(false);
let customerName = ref("");
let lounId = ref("");
let customer = ref("");
const targetObject = dataArray.find((item) => item.id === Number(target));
if (targetObject) {
  customerName = targetObject.loanPlan;
  customer = targetObject;
  lounId = targetObject.loanPlan.loanId;
}

const date = ref(customer.endOfActivationDate);
const fileInput = ref([]);
const uploadedImages = ref([]);
const key = `user_${target} `;
const FinalRegistrationform = localStorage.getItem("FinalRegistrationform");
const FinalRegistrationForm = FinalRegistrationform
  ? JSON.parse(FinalRegistrationform)
  : {};
const currentDate = new Date();
const options = { timeZone: 'Asia/Tehran' };
const iranTime = currentDate.toLocaleString('en-US', options);

const GetALLSurveysList = localStorage.getItem("GetSurveysList");
const SurveysList = JSON.parse(GetALLSurveysList);
const LastSurveyIndex = SurveysList.findIndex((item) => item.id === Number(targetObject.loanId));

const LasteSurvey = LastSurveyIndex !== -1 ? SurveysList[LastSurveyIndex] : null;
const form = ref({
  constructionApproval: FinalRegistrationForm.hasOwnProperty("constructionApproval") ? FinalRegistrationForm.constructionApproval : LasteSurvey ? LasteSurvey.constructionApproval : null,
  surveyReport: FinalRegistrationForm.hasOwnProperty("surveyReport") ? FinalRegistrationForm.surveyReport :LasteSurvey ? LasteSurvey.surveyReport: "",
  customerOffer: FinalRegistrationForm.hasOwnProperty("customerOffer") ? FinalRegistrationForm.customerOffer :LasteSurvey ? LasteSurvey.customerOffer : "",
  isEquipmentBought: FinalRegistrationForm.hasOwnProperty("isEquipmentBought") ? FinalRegistrationForm.isEquipmentBought :LasteSurvey ? LasteSurvey.isEquipmentBought: null,
  planActivationTypeId: FinalRegistrationForm.hasOwnProperty("planActivationTypeId") ? FinalRegistrationForm.planActivationTypeId :LasteSurvey ? LasteSurvey.planActivationTypeId: null,
  endOfActivationDate: FinalRegistrationForm.hasOwnProperty("endOfActivationDate") ? FinalRegistrationForm.endOfActivationDate :LasteSurvey ? LasteSurvey.endOfActivationDate: null,
  isFactorMatch: FinalRegistrationForm.hasOwnProperty("isFactorMatch") ? FinalRegistrationForm.isFactorMatch :LasteSurvey ? LasteSurvey.isFactorMatch: null,
  constructionPercentageProgress: FinalRegistrationForm.hasOwnProperty("constructionPercentageProgress") ? FinalRegistrationForm.constructionPercentageProgress :LasteSurvey ? LasteSurvey.constructionPercentageProgress: null,
  constructionDescription: FinalRegistrationForm.hasOwnProperty("constructionDescription") ? FinalRegistrationForm.constructionDescription :LasteSurvey ? LasteSurvey.constructionDescription: null,
  equipmentTypeId: FinalRegistrationForm.hasOwnProperty("equipmentTypeId") ? FinalRegistrationForm.equipmentTypeId :LasteSurvey ? LasteSurvey.equipmentTypeId: null,
  equipmentDescription: FinalRegistrationForm.hasOwnProperty("equipmentDescription") ? FinalRegistrationForm.equipmentDescription :LasteSurvey ? LasteSurvey.equipmentDescription: null,
  planId: null,
  confirmation: null,
  cartableId: customerName.cartableId,
  latitude: "28.1716102",
  longitude: "56.2659146",
  planLivestockSurvey: null,
  planGardenSurvey: null,
  planIndustrialSurvey: null,
  planServiceSurvey: null,
  surveyDate: iranTime,
  userId: customer.userId,
  guidList: [],
});




const handleReceivedDate = (date) => {
  form.value.endOfActivationDate = date;
};

const validateRadioSelection = () => {
  if (
    form.value.constructionApproval === null ||
    form.value.customerOffer === null||
    form.value.surveyReport== "" ||
    form.value.isEquipmentBought === null ||
    form.value.confirmation === null ||
    form.value.planActivationTypeId === null
  ) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 2000);
  } else {
    if (totalUploadedFiles < 5 && form.value.guidList.length <= 5) {
      errorLength.value = true;
      setTimeout(() => {
        errorLength.value = false;
      }, 2000);
    } else {
      error.value = false;
      emit("showComponent", 3, form);
    }
  }
};

watch(
  props,
  (value) => {
    if (props.isBack === true) {
      localStorage.setItem("FinalRegistrationform", JSON.stringify(form.value));
    }
  },
  { deep: true, immediate: true }
);

const opencal = () => {
  calender.value = true;
};

const setCurrentTab = (tabNumber) => {
  currentTab.value = tabNumber;
};

const setTabForEquipmentBought = (Number) => {

  Tab.value = Number;
};
setTabForEquipmentBought(form.value.isEquipmentBought)



const BTab = (Num) => {
  BTabs.value = Num;
};

BTab(form.value.constructionApproval)

const file = () => {};


const handleFileUpload = async (event) => {
  const files = fileInput.value.files;
  InvalidFile.value = false;
  totalFileslength = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    totalUploadedFiles++;

    if (!file.type.startsWith("image/jpeg")) {
      console.error("Invalid file type. Please upload a JPEG image.");
      InvalidFile.value = true;
      setTimeout(() => {
        InvalidFile.value = false;
      }, 2000);
      totalUploadedFiles--;
      return;
    }

    const compressedFile = await compressImage(file);
    uploadedImages.value.push({
      url: compressedFile.dataURL,
      file: compressedFile,
    });
    sendFileToServer(compressedFile);
  }
};

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the desired maximum dimensions
        const maxWidth = 800;
        const maxHeight = 600;

        // Calculate the new dimensions to maintain the aspect ratio
        let newWidth = img.width;
        let newHeight = img.height;
        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = (img.width * maxHeight) / img.height;
        }

        // Set the canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert the canvas content to a Blob with adjustable quality
        canvas.toBlob(
          (blob) => {
            // Create a new compressed file with the Blob
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
            });
            resolve({
              dataURL: URL.createObjectURL(compressedFile),
              file: compressedFile,
            });
          },
          "image/jpeg",
          0.8 // Adjust the quality as needed
        );
      };
    };

    reader.readAsDataURL(file);
  });
};

const sendFileToServer = async (file) => {

  const formData = new FormData();
  formData.append("image", file.file);


  const config = {
    headers: {
      Authorization: "Bearer " + supervisoryInfo.token,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      uploadProgress.value = progress;
    },
  };

  try {
    requestStatus.isHaserequest=true
    const response = await axios.post(
   `${Url + "api/Upload/uploadSurveyImage"}`,
      formData,
      config,
      lounId
    );
    form.value.guidList.push(response.data.results[0]);

    if ((response.status = 200 && response.data.serverErrors == null)) {
      finishephoto.value = true;

      uploadProgress.value = null;
      setTimeout(() => {
        finishephoto.value = false;
      }, 2000);
    } else {
      finisheErrorphoto.value = true;
    }
;  requestStatus.isHaserequest=false
  } catch (error) {
    requestStatus.isHaserequest=false
    saveImageToIndexedDB(file);
  }
};

const DB_NAME = '"offlineImagesDB"';
const DB_VERSION = 1;
let db;
const openDatabase = () => {
  const request = window.indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = (event) => {
    console.error("Error opening indexedDB:", event);
  };

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore("offlineImages", { autoIncrement: true });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    // Call the function to get the list of saved images after the database is opened
    getSavedImagesFromIndexedDB();
  };
};

// Function to fetch a list of saved images from IndexedDB
const getSavedImagesFromIndexedDB = () => {
  // Check if db is defined
  if (!db) {
    console.error("IndexedDB is not initialized.");
    return;
  }

  const transaction = db.transaction(["offlineImages"], "readonly");
  const objectStore = transaction.objectStore("offlineImages");
  const images = [];

  // Open a cursor to iterate over the stored images
  const request = objectStore.openCursor();
  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      images.push(cursor.value.file);
      cursor.continue();
    } else {
      // All images retrieved, you can now work with the 'images' array
    }
  };

  request.onerror = (event) => {
    console.error("Error fetching images from IndexedDB:", event);
  };
};

// Call the function to open the database
openDatabase();

const saveImageToIndexedDB = (file) => {
  const transaction = db.transaction([`offlineImages`], "readwrite");
  const objectStore = transaction.objectStore("offlineImages");
  const request = objectStore.add({
    file: file,
    userId: target,
    lounId: lounId,
  });
  request.onsuccess = () => {};
  request.onerror = (event) => {
    console.error("Error saving image to IndexedDB:", event);
  };
};

const removeImage = (index) => {
  const removedImage = uploadedImages.value[index];
  uploadedImages.value.splice(index, 1);
  totalUploadedFiles--;
  form.value.guidList.splice(index, 1);
  removeImageFromDB(removedImage.file);
};

const removeImageFromDB = (file) => {
  const transaction = db.transaction(["offlineImages"], "readwrite");
  const objectStore = transaction.objectStore("offlineImages");
  const request = objectStore.openCursor();
  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const storedFile = cursor.value.file;
      if (storedFile.name === file.name) {
        cursor.delete();

        return;
      }
      cursor.continue();
    }
  };
  request.onerror = (event) => {
    console.error("Error finding image in IndexedDB:", event);
  };
};
</script>

<style lang="scss">
#custom-button {
  padding: 10px;
  color: white;
  background-color: #009578;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
}

#custom-button:hover {
  background-color: #00b28f;
}

#custom-text {
  margin-left: 10px;
  font-family: sans-serif;
  color: #aaa;
}

.font2 {
  font-size: 9px;
}

.tab-buttons {
  display: flex;
}

.tab-buttons button {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px;
  border: none;
  cursor: pointer;
}

.tab-buttons button.activeTab {
  background-color: lightblue;
}

.tab-content {
  margin-top: 20px;
}

$font: "Inter", sans-serif;
$white: #fff;
$green: #fca40f;

.middle {
  text-align: center;
  flex-wrap: wrap;

  h1 {
    font-family: $font;
    color: $white;
  }

  input[type="radio"] {
    display: none;

    &:checked {
      + .boxBuilding {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxEquipment {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxPlan {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxTypeEٍquipment {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }

      + .boxmatching {
        background-color: $green;
        color: white;
        //span {
        //  color: white;
        //  transform: translateY(70px);
        //  &:before {
        //    transform: translateY(0px);
        //    opacity: 1;
        //  }
        //}
      }
    }
  }

  .boxBuilding {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxEquipment {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxPlan {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxmatching {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxTypeEٍquipment {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }
}

.error {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0;
  /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 1s forwards;
  background-color: red;
  color: white;
}

@keyframes moveUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.sendphoto {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0;
  /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: #00b515;
  color: white;
}

.moz {
  color: var(--bs-btn-disabled-color);
  pointer-events: none;
  background-color: var(--bs-btn-disabled-bg);
  border-color: var(--bs-btn-disabled-border-color);
  opacity: var(--bs-btn-disabled-opacity);
}
</style>
