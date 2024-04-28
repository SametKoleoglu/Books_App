import axios from "axios";
import { defineStore } from "pinia";

export const useRatingStore = defineStore("ratingStore", {
  state: () => ({
    ratings: [],
    ratingsForBook: [],
    isLoading: false,
  }),
  actions: {
    async addNewRate(newRate) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/ratings",
          newRate
        );
        this.ratings.push(response.data.rating);
      } catch (error) {
        throw error.response.data;
      }
    },

    async fetchRatingsForBook(bookId) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/ratings/book/${bookId}`,
          bookId
        );
        this.ratingsForBook = response.data.ratings;
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
