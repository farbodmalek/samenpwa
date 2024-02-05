<script setup>
import LayoutHeader from "~/components/Layouts/LayoutHeader.vue";
import LayoutFooter from "~/components/Layouts/LayoutFooter.vue";
import LayoutSidebar from "~/components/Layouts/Sidebar/LayoutSidebar.vue";
</script>
<template>
  <div id="app">
    <LayoutSidebar></LayoutSidebar>
    <LayoutHeader></LayoutHeader>
    <div id="main" class="mb-0">
      <slot />
    </div>
  </div>
</template>
