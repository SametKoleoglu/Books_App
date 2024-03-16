import axios from "axios";
import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
    isLoading: false,
  }),

  getters: {
    selectedBook(state) {
      return (id) => state.books.find((book) => book._id === id);
    },
  },
  actions: {
    async fetchBooks() {
      this.isLoading = true;
      try {
        await axios
          .get("http://localhost:4000/api/v1/books")
          .then((response) => {
            this.books = response.data;
            console.log("Data fetching process successful :)");
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
