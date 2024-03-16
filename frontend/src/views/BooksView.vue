<template>
  <section class="full-section-header">
    <div class="container">
      <div>
        <div v-if="isLoading" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-if="!isLoading">
        <SectionHeader :title="secTitle" :text="secText" />
        <BookList :books="paginatedBooks" />
        <Pagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="updatePage"
        />
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import BookList from "@/components/BookList.vue";
import Pagination from "@/components/Pagination.vue";
import { useBookStore } from "@/stores/bookStore";
import { mapState } from "pinia";

export default {
  name: "BooksView",
  components: {
    SectionHeader,
    BookList,
    Pagination,
  },
  data() {
    return {
      secTitle: "Books View Page",
      secText:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel beatae reiciendis veritatis?",
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    //Store İşlemi!!!
    ...mapState(useBookStore, ["books", "isLoading"]),
    // -> türetilmiş, hesaplanmış veri anlamına gelir !!!
    totalPages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.books.slice(startIndex, endIndex);
    },
  },
  methods: {
    updatePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.auth-box {
  margin-top: -30px;
}
</style>
