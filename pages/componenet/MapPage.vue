<template>
  <div class="position-relative z-1">
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 666px; width: 100%"
      @click="updateMarkerLocation"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      ></l-tile-layer>
      <l-marker
          :lat-lng="form.lat && form.lng ? [form.lat, form.lng] : markerLocation"
        :draggable="true"
        @update:lat-lng="updateLocation"
      ></l-marker>
    </l-map>
    <div class="mt-3 position-absolute top-0 zindex col-12">
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
            style="height: 50px"
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
          <button class="btn btn-primary rounded-pill p-3" type="button" @click="validateRadioSelection">
            ثبت
          </button>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>

</template>

<script setup lang="ts">

import { useRouter } from "vue-router";
import {defineEmits} from "vue";
const router = useRouter();
const zoom = ref(10);
const center = ref([35.70001302853155, 51.38855516910554]);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const markerLocation = ref([35.70001302853155, 51.38855516910554]);

const selectedLocation = ref("");
let customerName = ref('');
const target =router.currentRoute._value.query.cardName;
const data = localStorage.getItem('GetCartables');
const dataArray = JSON.parse(data);
const targetObject = dataArray.find(item => item.id === Number(target));
if (targetObject) {
  customerName = targetObject.loanPlan;

}
const emit = defineEmits(["showComponent",]);
const form = ref({
  address: customerName.address,
  Namevilleg: customerName.address,
  lat: customerName.latitude,
  lng: customerName.longitude,
});

const validateRadioSelection = () => {
    emit("showComponent",5,form, );
};


definePageMeta({
  layout: "map",
});






const updateLocation = () => {
  const [lat, lng] = markerLocation.value;
  selectedLocation.value = `Lat: ${lat}, Lng: ${lng}`;
  form.value.lat = lat;
  form.value.lng = lng;
};

const backtoCustomerInformation = () => {

 router.back()
};

const updateMarkerLocation = (event: {
  latlng: { lat: number; lng: number };
}) => {
  markerLocation.value = [event.latlng.lat, event.latlng.lng];
  updateLocation();
};
</script>
<style>
.zindex {
  z-index: 999;
}
</style>
