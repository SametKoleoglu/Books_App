import axios from "axios";
import { defineStore } from "pinia";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [],
    isLoading: false,
    userUploadedBooks: [],
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

    async addNewBook(newBook) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/books/create",
          newBook
        );
        this.books.push(response.data.book);
      } catch (error) {
        console.error("Error at add new book: ", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchBooksByUploader() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/books/uploader`
        );
        console.log(response.data)
        this.userUploadedBooks = response.data;
      } catch (error) {
        console.error("Error at user uploaded books", error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
