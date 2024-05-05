import axios from "axios";
import { defineStore } from "pinia";
import { useBookStore } from "./bookStore.js";

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
      const bookStore = useBookStore();
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/ratings/book/${bookId}`,
          bookId
        );
        this.ratingsForBook = response.data.ratings;

        const bookIndex = bookStore.books.findIndex(
          (book) => book._id === bookId
        );
        if (bookIndex !== -1) {
          bookStore.books[bookIndex].ratings = this.ratingsForBook;
        } else {
          console.warn(`Book with id : ${bookId} not found`);
        }
        
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
