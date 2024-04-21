import axios from "axios";
import { defineStore } from "pinia";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    isLoading: false,
    commentForBook: [],
  }),
  actions: {
    async fetchComments() {
      this.isLoading = true;
      try {
        await axios
          .get("http://localhost:4000/api/v1/comments")
          .then((response) => {
            this.comments = response.data;
            console.log("Data fetching process successful :)");
          });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async addNewComment(newComment) {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/comments/create",
          newComment
        );
        this.comments.push(response.data.comment);
      } catch (error) {
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCommentsForBook(bookId) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/comments/book/${bookId}`
        );

        this.commentForBook = response.data.comments;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
