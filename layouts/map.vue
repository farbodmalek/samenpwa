<script lang="ts" setup>
import LayoutHeaderMap from "~/components/Layouts/LayoutHeaderMap.vue";
import LayoutFooter from "~/components/Layouts/LayoutFooter.vue";
import LayoutSidebar from "~/components/Layouts/Sidebar/LayoutSidebar.vue";
</script>
<template>
  <div id="app">
    <LayoutSidebar></LayoutSidebar>
    <LayoutHeaderMap></LayoutHeaderMap>
    <div id="main">
      <slot />
    </div>
  </div>
</template>
