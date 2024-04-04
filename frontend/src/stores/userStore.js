import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  actions: {
    async updateUserDetails(updatedUserData) {
      this.isLoading = true;
      try {
        const response = await axios.put(
          "http://localhost:4000/api/v1/users/updateUser",
          updatedUserData
        );
        return response.data
      } catch (error) {
        console.log("Error at updating user details: ", error.message);
        throw error.response.data
      }
    },
  },
});
