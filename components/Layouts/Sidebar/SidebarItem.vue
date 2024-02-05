<template>
  <li class="sidebar-item" ref="sidebarItem">
    <template v-if="hasSub">
      <a class="sidebar-link" href="#" @click="menuClick">
        <i :class="`bi bi-${item.icon}`"></i>

        <span>{{ item.name }}</span>
      </a>
      <ul
        class="submenu"
        :class="{ active: isSubActive }"
        ref="submenu"
        :style="{ height: submenuHeight }"
      >
        <li
          v-for="(sub, i) in item.submenu"
          :key="i"
          class="submenu-item"
          :class="{ active: isUrlActive(sub.url) }"
        >
          <nuxt-link :to="sub.url">{{ sub.name }}</nuxt-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <nuxt-link class="sidebar-link justify-content-between" :to="item.url">
        <img :src="`${item.img}`" style="width: 20px; hight: 20px" />
        <span class="">{{ item.name }}</span>

        <a
          v-if="item.name === 'خروج'"
          class="position-absolute w-75 text-end text-transparent cursor-pointer"
        >
          خروج
        </a>
      </nuxt-link>
    </template>
  </li>
</template>
<script lang="ts" setup>
const router = useRouter();
interface Menu {
  name: string;
  key?: string;
  icon?: string;
  url?: string;
  submenu: {
    name: string;
    url: string;
  }[];
}

const props = defineProps<{
  item: Menu;
}>();

const route = useRoute();
const sidebarItem = ref<HTMLElement>();
const submenu = ref<HTMLElement>();
const submenuOriginalHeight = ref(0);
const submenuHeight = ref("auto");
const isSubActive = ref(true);
const closeExitemodale = ref(true);
const isActive = computed(() => {
  return (
    route.path == props.item.url ||
    (props.item.submenu &&
      props.item.submenu.some((sub) => sub.url == route.path))
  );
});

onMounted(() => {
  if (submenu.value) {
    submenuOriginalHeight.value = submenu.value.offsetHeight;

    isSubActive.value = isActive.value;
    submenuHeight.value =
      (isSubActive.value ? submenuOriginalHeight.value : 0) + "px";
  }
});

const hasSub = computed(() => {
  if (props.item.hasOwnProperty("submenu")) {
    if (props.item.submenu.length > 0) {
      return true;
    }
  }
  return false;
});

const menuClick = (event: MouseEvent) => {
  if (isSubActive.value) submenuHeight.value = "0";
  else submenuHeight.value = submenuOriginalHeight.value + "px";
  isSubActive.value = !isSubActive.value;
};
const logout = () => {
  let userId = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("user")) {
      userId = key.substring(5, 11);
    }
  }

  if (userId) {
    closeExitemodale.value = true;

    throw new Error(
      "Logout not allowed due to existing items in local storage."
    );
  } else {

    router.push("/login");
    localStorage.clear();
  }
};
const modalexite = () => {
  closeExitemodale.value = false;
};

const isUrlActive = (url: string) => url == route.path;
</script>

<style>
.submenu {
  transition: all 0.5s !important;
}
</style>
