import { User } from '@/types/store/user.types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    name: '',
    email: '',
    phone: '',
    lastLogin: '',
  });

  return {
    user,
  };
});
