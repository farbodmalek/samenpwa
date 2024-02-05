<script lang="ts" setup>
import { useStore } from "~/store";

let { toggleSidebar } = useStore();
const router = useRouter();
const route = useRoute();



</script>
<template>
  <header class="ham bg-primary" style="height: 50px">
    <div class="d-flex justify-content-between pt-1 px-2">
      <div class="px-1 py-2">
        <span class="px-1 font3 fw-bold text-white ">{{ route.meta.headerNumber }} </span>
        <span class=" fw-bold text-white fs-6">: {{ route.meta.headerDetails }}</span>
      </div>
      <div class="d-flex">
        <span class="px-2 py-2 fw-bold text-white  mx-3 ">{{ route.meta.headerTitle }}</span>

        <a
          href="#"
          class="burger-btn d-block d-xl-none text-white px-2 py-1 position-relative  "
          @click="goBack"
        >
          <i class="bi bi-caret-right text-black  "></i>
          <div class="title-header position-absolute">      <i class="bi bi-caret-right text-black  "></i>  </div>
        </a>

      </div>
    </div>
  </header>
</template>
<style lang="scss">
.font3{
  font-size: 10px;
}

.title-header{
  width:47px ;
  background-color:#e5e5e5;
  height: 38px  ;
  top: 0;
  right: -8px;
  border-bottom-left-radius: 5px;
  border-top: 5px;
padding: 5px 0px 0px 5px  ;
font-size: 20px ;
}

</style>
