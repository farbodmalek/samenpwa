<script lang="ts" setup>
import LayoutHeader1 from "~/components/Layouts/LayoutHeader1.vue";
import LayoutFooter from "~/components/Layouts/LayoutFooter.vue";
import LayoutSidebar from "~/components/Layouts/Sidebar/LayoutSidebar.vue";
</script>
<template>
  <div id="app">
    <LayoutSidebar></LayoutSidebar>
    <LayoutHeader1></LayoutHeader1>
    <div id="main">
      <slot />
    </div>
  </div>
</template>
