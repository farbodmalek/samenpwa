// authStore.ts
import { defineStore } from 'pinia';

export const ApplicationStatus = defineStore('auth', {
  state: () => ({
    isHaserequest: false,
  }),
});
