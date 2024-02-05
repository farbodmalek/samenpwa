import sideBarItems from './data/sidebarItems';
import {defineStore} from 'pinia'
import {reactive, ref} from "vue";
import { ColorModeInstance } from '@nuxtjs/color-mode/dist/runtime/types';

export const useStore = defineStore('main', () => {
  const sidebarItems = reactive(sideBarItems)
  const isSidebarActive = ref(true)
  const closemodal =ref(false)
  const isDark = ref(true)
  const toggleSidebar = () => isSidebarActive.value = !isSidebarActive.value
  const closemodalexite = () => closemodal.value = !closemodal.value



  const closeSidebar = () => isSidebarActive.value = false
  const openSidebar = () => isSidebarActive.value = true
  const toggleDark = () => isDark.value = !isDark.value

  return {
    sidebarItems,
    isSidebarActive,
    closemodal,
    isDark,
    toggleDark,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    closemodalexite
  }
})
