// authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    lastLoginTime: null as string | null,
  }),
  actions: {
    setToken(token: string | null) {
      this.token = token;
    },
    setLastLoginTime(time: string) {
      this.lastLoginTime = time;
    },
  },
});
