<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end" style="cursor: pointer">
      <li
        class="page-item"
        :class="{ disabled: currentPage === 1 }"
        @click="currentPage > 1 && gotoPage(currentPage - 1)"
      >
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: page === currentPage }"
        v-for="page in totalPages"
        :key="page"
      >
        <a class="page-link" @click="gotoPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="gotoPage(currentPage + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  emits: ["page-changed"],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    gotoPage(page) {
      this.$emit("page-changed", page);
    },
  },
};
</script>

<style lang="scss" scoped></style>
