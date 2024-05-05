import axios from "axios";
import { defineStore } from "pinia";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    isLoading: false,
    commentForBook: [],
    commentsByUser: [],
  }),
  actions: {
    async fetchComments() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/comments"
        );

        console.log(response.data.comments);
        this.comments = response.data.comments;
        console.log("Comments fetching process successful :)");
      } catch (error) {
        console.log("Error at fetching comments", error.message);
        return res.status(500).json({ message: "internal server error" });
      } finally {
        this.isLoading = false;
      }
    },

    async addNewComment(newComment) {
      this.isLoading = true;
      try {
        await axios.post(
          "http://localhost:4000/api/v1/comments/create",
          newComment
        );

        await this.fetchComments();
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

    async fetchCommentsByUser(userId) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/comments/user/${userId}`
        );

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.isLoading = false;
      }
    },

    async upvoteComment(commentId) {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/comments/${commentId}/upvote`
        );

        const updatedComment = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === updatedComment._id
        );

        if (commentIndex !== -1) {
          this.comments[commentIndex] = this.updatedComment;
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    async downvoteComment(commentId) {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/comments/${commentId}/downvote`
        );

        const updatedComment = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === updatedComment._id
        );

        if (commentIndex !== -1) {
          this.comments[commentIndex] = this.updatedComment;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
