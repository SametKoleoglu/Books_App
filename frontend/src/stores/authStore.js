import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    isLoading: false,
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!state.user;
    },
  },

  actions: {
    async register(newUserData) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/auth/register",
          newUserData
        );
        return response.data;
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async login(userData) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/auth/login",
          userData
        );
        this.user = response.data.data;
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.user = null;
      localStorage.removeItem("user");
      location.reload();
    },
  },
});
