import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const selectopen = ref(false);
    return {
      selectopen,
    };
  });