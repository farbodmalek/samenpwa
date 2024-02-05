<template>
  <div class="position-relative z-1" v-if="mapopen">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 100vh; width: 100%"

    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
        :lat-lng="form.lat && form.lng ? [form.lat, form.lng] : markerLocation"
        :draggable="false "
        @update:lat-lng="updateLocation"
      ></l-marker>
      <l-circle

        :lat-lng="form.lat && form.lng ? [form.lat, form.lng] : circleLocation"
        :radius="DISTANCE_METERS_Shadow"
      ></l-circle>
    </l-map>
    <div class="mt-3 position-absolute top-0 z-index col-12" v-if="modalMap">
      <div class="col col-11 bg-white px-2 ms-3 rounded-5 text-black">
        <div class="text-center col-12 pt-4 pb-3">
          <span class="px-2">افزودن ادرس محل طرح</span>
          <i class="bi bi-geo-alt"></i>
        </div>
        <div class="mb-1 col-12 px-2">
          <input
            label="national ID "
            type="input"
            placeholder=" نام روستا  (اگر محل طرح روستا باشد )"
            class="form-control text-end mb-3 bg-light text-black border-black"
            style="height: 65px"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="form.Namevilleg"

          />
          <input
            type="input"
            class="form-control text-end pt-0 bg-light border-black text-black"
            id="exampleInputPassword1"
            placeholder="ادرس طرح"
            style="height: 65px"
            v-model="form.address"
          />
        </div>

        <div class="d-grid col-12 mx-auto pt-3 pb-2">
          <button class="btn btn-primary rounded-pill p-4" type="button" @click="backtoCustomerInformation">
            ثبت
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
        <p v-if="Error" class="error  text-center pt-4">
          برای دسترسی به موقعیت جغرافیایی، لطفاً اجازه دسترسی به مکان را بدهید.
        </p>
        <p v-if="errordistance" class="error  text-center pt-4 error  text-center pt-4">فاصله نقطه انتخاب شده تا ادرس طرح بیشتر از 200 متر است </p>

      </div>
    </div>
  </div>

  <Carddetails v-if="close"/>
  <!-- section one  -->
  <form v-if="close">
    <div
      class="col col-12 d-flex align-center pt-1 flex-column mb-2 text-black "
    >
      <!-- form gender -->
      <div class="d-flex p-2 justify-content-between">
        <div class="middle col-9 d-flex mb-3 ms-2 ">
          <label class="col-6">
            <input
              type="radio"
              name="gender"
              :value="true"
              v-model="form.genderType"
            />
            <div
              class="front-end border-end-2 border border-secondary rounded-start-pill box col-12 py-1"
            >
              <span>زن</span>
            </div>
          </label>

          <label class="col-6">
            <input
              type="radio"
              name="gender"
              :value="false"
              v-model="form.genderType"
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary rounded-end-pill py-1"
            >
              <span>مرد</span>
            </div>
          </label>

        </div>
        <p class="py-2 text-center text-start fw-bold text-black me-2">جنسیت</p>
      </div>
      <p
        v-if="error && form.genderType === null"
        class="error text-center pt-4"
      >
        جنسیت نمیتواند خالی باشد
      </p>
      <!-- form palce -->
      <div class="d-flex p-2 justify-content-between">
        <div class="middle col-9 d-flex mb-3 ms-2">
          <label class="col-6">
            <input
              type="radio"
              name="place"
              v-model="form.residentTypeId"
              :value="2"
            />
            <div
              class="front-end border-end-2 border border-secondary rounded-start-pill box col-12 py-1"
            >
              <span>روستایی</span>
            </div>
          </label>

          <label class="col-6">
            <input
              type="radio"
              name="place"
              class="moz"
              v-model="form.residentTypeId"
              :value="1"
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary rounded-end-pill py-1"
            >
              <span>شهری</span>
            </div>
          </label>

        </div>
        <p class="py-2 text-center text-start fw-bold text-black me-2">
          محل اجرا
        </p>
      </div>
      <p v-if="error && form.residentTypeId===0" class="error text-center pt-4">
        محل اجرا نمیتواند خالی باشد
      </p>
      <!-- form maritalStatus -->
      <div class="d-flex p-2 justify-content-between">
        <div class="middle col-9 d-flex mb-3 ms-2">
          <label class="col-6">
            <input
              type="radio"
              name="maritalStatus"
              v-model="form.maritalStatusId"
              :value="true"
            />
            <div
              class="front-end border-end-2 border border-secondary rounded-start-pill box col-12 py-1"
            >
              <span>متاهل</span>
            </div>
          </label>

          <label class="col-6">
            <input
              type="radio"
              name="maritalStatus"
              v-model="form.maritalStatusId "
              :value="false "
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary rounded-end-pill py-1"
            >
              <span>مجرد</span>
            </div>
          </label>

        </div>
        <p class="py-2 text-center text-start fw-bold text-black me-2">وضعیت</p>
      </div>
      <p v-if="error && form.maritalStatusId===null" class="error  text-center pt-2">
        وضعیت تاهل نمیتواند خالی باشد
      </p>
      <!-- form provider -->
      <div class="d-flex p-2 justify-content-between">
        <div class="middle col-9 d-flex mb-3 ms-2">
          <label class="col-6">
            <input
              type="radio"
              name="provider"
              v-model="form.isFamilySupervisor"
              :value="false"
            />
            <div
              class="front-end border-end-2 border border-secondary rounded-start-pill box col-12 py-1"
            ><span>خیر</span>

            </div>
          </label>

          <label class="col-6">
            <input
              type="radio"
              name="provider"
              v-model="form.isFamilySupervisor"
              :value="true  "
            />
            <div
              class="back-end box col-12 border-end-2 border border-secondary rounded-end-pill py-1"
            >
              <span>بلی</span>
            </div>
          </label>

        </div>
        <p class="py-2 text-center text-start fw-bold text-black me-2">
          سرپرست
        </p>
      </div>
      <p v-if="error && form.isFamilySupervisor===null" class="error text-center pt-4">
        وضعیت سرپرست نمیتواند خالی باشد
      </p>
    </div>

    <!-- section تحصیلات  -->
    <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
      <!-- name form -->

      <div class="col col-12 d-flex align-center pt-1">
        <hr
          class="v-divider "

        />
        <strong class="mx-2 text-black text-center col-3">تحصیلات</strong>
        <hr
          class="v-divider "
        />
      </div>

      <div class="middle col-12 d-flex mb-3 mb-3 d-flex col-12 font-size fw-bold flex-row-reverse">
        <label class="col-4 p-1" v-for="(item, index) in BaseInfo.educationTypes" :key="index">
          <input
            type="radio"
            name="education"
            :value="item.key"
            v-model="form.educationTypeId"
          />
          <div
            class="front-end boxeducation px-2 border border-secondary col-12 rounded-4 py-3"
          >
            <span> {{ item.value }}</span>
          </div>
        </label>


      </div>

      <p v-if="error && form.educationTypeId===0 " class="error  text-center pt-4">
        وضعیت تحصیلات نمیتواند خالی باشد
      </p>
    </div>

    <!-- section  اطلاعات تماس  -->
    <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
      <!-- name form -->
      <div class="col col-12 d-flex align-center pt-1">
        <hr
          class="v-divider theme--light"
        />
        <strong class="mx-2 text-black text-center col-4">
          اطلاعات تماس
        </strong>
        <hr
          class="v-divider v-theme--light"
        />
      </div>
      <!-- form input  -->
      <div class="p-2 col-12">
        <div
          class=" mb-1 px-1 col-12"

        >
          <input
            type="text"
            class="form-control  mb-3 text-end border-secondary bg-transparent rounded-3"
            placeholder="تلفن همراه  "
            style="height: 50px"
            v-model="form.mobileNo"
            inputmode="numeric"

          />
        </div>
        <div
          class=" mb-1 px-1 col-12"
        >
          <input
            type="text"
            class="form-control mb-3 text-end border-secondary bg-transparent rounded-3"
            placeholder="تلفن ثابت"
            style="height: 50px"
            v-model="form.Phone"
            inputmode="numeric"

          />
        </div>
      </div>
      <p v-if="error &&  form.Phone == '' " class="error text-center pt-4">
        فیلد تلفن ثابت باید پر باشد
      </p>
      <p v-if="error && form.mobileNo === ''  " class="error text-center pt-4">
        فیلد تلفن همراه باید پر باشد
      </p>
      <p v-if=" errorlenght " class="error text-center pt-4">
   تلفن همراه یا تلفن ثابت باید 11 رقم باشد
      </p>
      <p v-if=" errorstartWith " class="error text-center pt-4">
        تلفن ثابت باید با صفر شروع شود

      </p>

      <div
        class="d-flex justify-content-between mt-4 pt-1 px-3 col-12 text-center"
      >
        <div class="col-3">
          <button class="btn bg-secondary rounded-4  address-font py-3 text-white  " type="button"
                  @click="navigateToCardDetail(customerId)">
            <p v-if="Supervision.id === 0" class="my-1" >ثبت آدرس </p>
            <p v-if="Supervision.id!== 0" class="my-1" >تغییر آدرس </p>


          </button>

        </div>
        <p>آدرس :
          <span class="py-2 col-2">{{ form.address }}
        </span>
        </p>

      </div>

    </div>
    <p v-if="error && form.address.trim() ==='' " class="error text-center pt-4">
      لطفا ادرس را انتخاب کنید
    </p>
    <!-- section  اطلاعات وام  -->
    <div class="col col-12 d-flex align-center pt-1 flex-column mb-2">
      <!-- name form -->

      <div class="col col-12 d-flex align-center pt-1">
        <hr class="v-divider theme--light"/>
        <strong class="mx-2 text-black text-center col-3">اطلاعات وام</strong>
        <hr class="v-divider v-theme--light"/>
      </div>
      <p class="text-end px-2 mb-1"> نوع وام </p>
      <div class="middle col-12 d-flex mb-3 mb-3 d-flex col-12 font-size fw-bold">
        <label class="col-4 p-1" v-for="(item, index) in  BaseInfo.planTypes" :key="index" @click="lounType">


          <div v-if="item.parentKey === null">
            <input type="radio" name="Loan" v-model="form.planTypeId" :value="item.key"
                   :disabled="Supervision.id !== 0" @click="planTypesHandle(item.key)"/>

            <div class="front-end boxLoan px-1 border border-secondary col-12 rounded-4 py-4"
                 :class="{ 'activeinput': isSidebarActive && (item.key === 3) }"
            >
              <span>{{ item.value }}</span>
            </div>
          </div>
        </label>
        <div class="mt-4 pt-1 px-3 col-12 text-end ">

          <div class="middle col-12 d-flex mb-3 mb-3 d-flex col-12 font-size fw-bold flex-row-reverse "
               @click="lounType">

            <div v-if="plantypeparentid3">
              <p class=" col-12 d-block text-end">نوع طرح را مشخص نمایید </p>
              <label class="col-4 p-1" v-for="(item, index) in BaseInfo.planTypes" :key="index">
                <div v-if="item.parentKey === 3">
                  <input type="radio" name="Loantype" v-model="form.planTypeId" :value="item.key"
                         :disabled="Supervision.id !== 0"/>
                  <div class="front-end boxLoan px-1 border border-secondary col-12 rounded-4 py-4"
                       @click="planTypesHandle(item.key)">
                    <span>{{ item.value }}</span>
                  </div>
                </div>
              </label>
            </div>

          </div>
          <div class="px-1 col col-12  align-center pt-1 px-2  justify-content-between">
            <div class="px-2 d-flex flex-reverse flex-row-reverse ">
              <strong class="mx-1 fw-bold">:دسته وام </strong>
              <p class=""> {{GetCartables.planNoName}}</p>
            </div>
            <div class="col-12">
              <p class="mx-2 text-end py-1  text-danger font-text font-checkbox ">
                در صورت مغایرت رشته فعالیت با عنوان اعلام شده تیک را بزنید

                <input type="checkbox" class="ms-3 " v-model="form.isValidPlanNo"/>
              </p>


            </div>
          </div>
        </div>
      </div>
      <p v-if="error && form.planTypeId===0 " class="error  text-center pt-4">
        اطلاعات وام نمیتواند خالی باشد
      </p>
      <p v-if="shouldDisableLoanSelection " class="errorloun  text-center pt-4">
        بدلیل ثبت طرح برای این وام امکان ویرایش این فیلد نیست
      </p>
<!--      <p v-if="shouldDisableLoanSelection " class="errorloun  text-center pt-4">-->
<!-- اعداد نوشته شده باید به زبان انگلیسی باشد-->
<!--      </p>-->
    </div>
    <!-- button ثبت اطلاعات  -->
    <nuxt-link v-cloak class="d-grid col-11 mx-auto pt-3 mb-5" to="">
      <button
        class="btn btn-primary rounded-pill p-3 button-animation"
        type="button"
        @click="validateRadioSelection"
      >
        ثبت اطلاعات اولیه
      </button>

    </nuxt-link>

  </form>
</template>

<script lang="ts" setup>
import Carddetails from "./CardHeader.vue";
import {useRouter} from "vue-router";
import {ref, defineEmits} from "vue";
import axios from "axios";
import {circle, layerGroup} from "leaflet";


const emit = defineEmits(["showComponent",]);
const router = useRouter();
const zoom = ref(13.5);
const center = ref([35.70001302853155, 51.38855516910554]);
const Nochangh = ref()
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const markerLocation = ref([35.70001302853155, 51.38855516910554]  );
const circleLocation=ref([35.70001302853155, 51.38855516910554])
const selectedLocation = ref("");
const error = ref(false);
const shouldDisableLoanSelection = ref(false);
const SurveyBaseInfo = localStorage.getItem("SurveyBaseInfo");
const BaseInfo = JSON.parse(SurveyBaseInfo)
const educationTypes = ref()
const errorlenght =ref(false)
const langerror = ref(false)
const mapopen = ref(false)
const Error = ref(false);
const modalMap = ref(true)
const close = ref(true)
const isSidebarActive = ref(false)
const plantypeparentid3 = ref(false)
const target = router.currentRoute._value.query.cardName;
const loanSurveyEconomidTypeId =parseInt(router.currentRoute._value.query.loanEconomicTypeId)
const errordistance=ref(false)
const errorstartWith=ref(false)
const data = localStorage.getItem('GetCartables');
const latitudeuser = ref();
const longitudeuser = ref();
const dataArray = JSON.parse(data);
let Supervision = ref('');
let customerId = ref('')
const loctionLatLong =[]
let GetCartables = ref("")
const targetObject = dataArray.find(item => item.id === Number(target));
if (targetObject) {
  Supervision = targetObject.loanPlan;
  GetCartables = targetObject
  customerId = targetObject.id;
}




const customerform = localStorage.getItem('customerform');
const customerForm = customerform ? JSON.parse(customerform) : {};
const form = ref({
  "genderType": customerForm.hasOwnProperty('genderType') ? customerForm.genderType : GetCartables.customerGenderType,
  "residentTypeId": customerForm.hasOwnProperty('residentTypeId') ? customerForm.residentTypeId : Supervision.residentTypeId,
  "maritalStatusId": customerForm.hasOwnProperty('maritalStatusId') ? customerForm.maritalStatusId  : Supervision.maritalStatusId,
  "isFamilySupervisor": customerForm.hasOwnProperty('isFamilySupervisor') ? customerForm.isFamilySupervisor : Supervision.isFamilySupervisor,
  "Phone": customerForm.hasOwnProperty('Phone') ? customerForm.Phone : Supervision.phone,
  "mobileNo": customerForm.hasOwnProperty('mobileNo') ? customerForm.mobileNo : GetCartables.mobileNo.slice(-11),
  "planTypeId": customerForm.hasOwnProperty('planTypeId') ? customerForm.planTypeId : Supervision.planTypeId,
  "educationTypeId": customerForm.hasOwnProperty('educationTypeId') ? customerForm.educationTypeId  : Supervision.educationTypeId,
  "planNoId": customerForm.hasOwnProperty('planNoId') ? customerForm.planNoId : GetCartables.planNoId,
  "id": customerForm.hasOwnProperty('id') ? customerForm.id :  Supervision.id,
  "cartableId": customerForm.hasOwnProperty('cartableId') ? customerForm.cartableId : Supervision.cartableId,
  "loanId": customerForm.hasOwnProperty('loanId') ? customerForm.loanId : Supervision.loanId,
  "loanSurveyEconomidTypeId": customerForm.hasOwnProperty('loanSurveyEconomidTypeId') ? customerForm.loanSurveyEconomidTypeId : loanSurveyEconomidTypeId,
  "otherPlanNo": customerForm.hasOwnProperty('planTypeId') ? customerForm.planTypeId : Supervision.otherPlanNo,
  "latitude": customerForm.hasOwnProperty('planTypeId') ? customerForm.latitude : Supervision.latitude,
  "longitude": customerForm.hasOwnProperty('longitude') ? customerForm.longitude  : Supervision.longitude,
  "address": customerForm.hasOwnProperty('address') ? customerForm.address :  Supervision.address,
  "villageName": customerForm.hasOwnProperty('villageName') ? customerForm.villageName : Supervision.villageName,
  "planNoDto":null,
  "insuranceTypeId": customerForm.hasOwnProperty('insuranceTypeId') ? customerForm.insuranceTypeId : Supervision.insuranceTypeId,
  "workShopCode": customerForm.hasOwnProperty('workShopCode') ? customerForm.workShopCode :  Supervision.workShopCode,
  "isValidPlanNo": customerForm.hasOwnProperty('isValidPlanNo') ? customerForm.isValidPlanNo : false,
});



const backtoCustomerInformation = () => {
  if (
    form.value.address === "" ||
    form.value.latitude === "" ||
    form.value.long === "") {
    error.value = true
  }
  mapopen.value = false
  close.value = true
};

const validateRadioSelection = () => {
  const data = localStorage.getItem('loction');
  const dataArray = JSON.parse(data);
  if (
    form.value.genderType === null ||
    form.value.residentTypeId === 0 ||
    form.value.maritalStatusId === null ||
    form.value.isFamilySupervisor === null ||
    form.value.mobileNo === '' ||
    form.value.Phone ==='' ||
    form.value.educationTypeId === 0 ||
    form.value.planTypeId === 0 ||
    form.value.address.trim() === ""
  ) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 2000);
  } else {
    if(
      form.value.mobileNo.length<11 || form.value.Phone.length<11)
    {errorlenght.value=true
      setTimeout(() => {
        errorlenght.value = false;
      }, 2000);
    }else if(!form.value.Phone.startsWith('0')) {
      errorstartWith.value=true
      setTimeout(() => {
        errorstartWith.value = false;
      }, 2000);
    }
    else {
      error.value = false;
      emit("showComponent", 1, form);
      localStorage.setItem("customerform", JSON.stringify(form.value))
    }
  }
};


const navigateToCardDetail = (cardName: string) => {
  close.value = false
  mapopen.value = true

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      form.value.latitude = latitude;
      form.value.longitude = longitude;
      latitudeuser.value = latitude;
      longitudeuser.value = longitude;
      markerLocation.value = [latitude, longitude];
      circleLocation.value = [latitude, longitude];
      center.value = markerLocation.value
      updateLocation();
    }, (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        Error.value = true
        modalMap.value = false
      } else {

      }
    });
  } else {

  }
};

const updateLocation = () => {

  const [lat, lng] = markerLocation.value;

      loctionLatLong.push(lat, lng);
  selectedLocation.value = `Lat: ${lat}, Lng: ${lng}`;
  form.value.longitude = lng;
  form.value.latitude =lat ;
  latitudeuser.value = lat;
  longitudeuser.value = lng;
  center.value = [lat, lng]
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const MAX_DISTANCE_METERS = 1;
const DISTANCE_METERS_Shadow =1000;


const updateMarkerLocation = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation();
  const distance = calculateDistance(loctionLatLong[0], loctionLatLong[1], lat, lng);

  if (distance <= MAX_DISTANCE_METERS) {
    markerLocation.value = [lat, lng];
    form.value.latitude=lat
    form.value.longitude=lng
    updateLocation();
  } else {
    errordistance.value=true
    setTimeout(()=>{
      errordistance.value=false
    },5000)
  }

};







const lounType = () => {
  if (Supervision.id === 0) {
    shouldDisableLoanSelection.value = false;
    setTimeout(() => {
      shouldDisableLoanSelection.value = false;
    }, 5000)
  } else {
    setTimeout(() => {
      shouldDisableLoanSelection.value = false;
    }, 5000)
    shouldDisableLoanSelection.value = true;
  }
}

const planTypesHandle = ((item) => {
  if (Supervision.id === 0) {
    const validPlanTypeIds3 = [3, 10, 9, 8, 7, 6, 5, 4];
    if (validPlanTypeIds3.includes(item)) {
      isSidebarActive.value = true
      plantypeparentid3.value = true;
    } else {
      plantypeparentid3.value = false;
      isSidebarActive.value = false
    }
  } else {
    const validPlanTypeIds3 = [3, 10, 9, 8, 7, 6, 5, 4];
    if (validPlanTypeIds3.includes(form.value.planTypeId)) {
      plantypeparentid3.value = true;
      isSidebarActive.value = true
    } else {
      plantypeparentid3.value = false;
      isSidebarActive.value = false
    }
  }
});


planTypesHandle()


const validateInput = () => {
  var inputValue = form.value.password;
  var regex = /^[0-9]+$/;
  if (!regex.test(inputValue)) {
    alert('Please enter only English numbers.');
    return false;
  }
  return true;
};

</script>
<style lang="scss">
.active1 {
  background-color: #fca40f;
  color: #fff;
}

.error-message {
  color: red;
  font-size: 14px;
  transition: right 0.5s ease-out;
}

$font: "Inter", sans-serif;
$white: #fff;
$green: #fca40f;

.middle {
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    font-family: $font;
    color: $white;
  }

  input[type="radio"] {
    display: none;

    &:checked {
      + .box {
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

      + .boxeducation {
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

      + .boxLoan {
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

  .box {
    height: 38px;
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

  .boxeducation {
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

  .boxLoan {
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
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: red;
  color: white;
}

.errorloun {
  position: fixed;
  bottom: 0;
  padding: 13px;
  width: 100%;
  margin-bottom: 0; /* این خط اضافه شده */
  z-index: 999;
  animation: moveUp 0.5s forwards;
  background-color: red;
  color: white;
}

.activeinput {
  background-color: #fca40f;
  color: white;
}


</style>
