<template>
  <section>
    <Carousel :items="carouselItems" height="400px"></Carousel>
  </section>
  <section class="my-5">
    <div class="contain3e">
      <SectionHeader
        title="Books"
        text="We declare long prop names using camelCase because this avoids"
      />
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'latest' }"
              @click="selectFilter('latest')"
            >
              Latest Books
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'best' }"
              @click="selectFilter('best')"
            >
              Best Ratings
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else class="accordion">
            <div
              class="accordion-item"
              v-for="(book, index) in filteredBooks"
              :key="index"
            >
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  :class="{ collapsed: openAccordionIndex !== index }"
                  @click="toggleAccordion(index)"
                >
                  <strong> {{ book.title }} - {{ book.author }}</strong>
                </button>
              </h2>
              <div
                class="accordion-collapse collapse"
                :class="{ show: openAccordionIndex === index }"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img
                        src="../assets/images/book-composition-with-open-book.jpg"
                        class="img-fluid"
                      />
                    </div>
                    <div
                      class="col-md-8 d-flex flex-column justify-content-center"
                    >
                      <p>{{ book.description }}</p>
                      <div
                        class="badge align-self-start"
                        style="background-color: var(--color-secondary)"
                      >
                        {{ book.rating }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5" style="background-color: #f5f6f9">
    <div class="container">
      <SectionHeader
        title="Latest Comments"
        text="We declare long prop names using camelCase because this avoids"
      />

      <div class="row d-flex justify-content-center">
        <div
          class="col-md-6"
          v-for="comment in preparedComments"
          :key="comment._id"
        >
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start align-items-center">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  src="../assets/images/c1.jpg"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 class="fw-bold text-primary mb-1">{{ comment.title }}</h6>
                  <p class="text-muted small mb-0">
                    {{ comment.postedBy.username }} - {{ comment.createdAt }}
                  </p>
                </div>
              </div>

              <p class="mt-3 mb-4 pb-2">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "@/components/widgets/Carousel.vue";
import hero_1 from "@/assets/images/hero_1.jpg";
import hero_2 from "@/assets/images/hero_2.jpg";
import hero_3 from "@/assets/images/hero_3.jpg";
import SectionHeader from "@/components/SectionHeader.vue";
import { useBookStore } from "@/stores/bookStore";
import { useCommentStore } from "@/stores/commentStore";
import { mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    Carousel,
    SectionHeader,
  },
  data() {
    return {
      carouselItems: [
        {
          imageUrl: hero_1,
          subtitle: "Liberte",
          title: "Lorem Ipsum Dolor Sit Amet",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          imageUrl: hero_2,
          subtitle: "Egalite",
          title: "Excepteur Sint Occaecat Cupidatat",
          description:
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          imageUrl: hero_3,
          subtitle: "Fraternite",
          title: "Neque Porro Quisquam Est",
          description:
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        },
      ],
      selectedFilter: "latest",
      openAccordionIndex: 0,
    };
  },

  methods: {
    selectFilter(filter) {
      this.selectedFilter = filter;
    },
    toggleAccordion(index) {
      if (this.openAccordionIndex === index) {
        this.openAccordionIndex = -1;
      } else {
        this.openAccordionIndex = index;
      }
    },
  },
  computed: {
    ...mapState(useBookStore, [
      "books",
      "isLoading",
      "latestBooks",
      "ratedBooks",
    ]),
    ...mapState(useCommentStore, ["comments", "isLoading"]),

    preparedComments() {
      const latestComments = this.comments
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);

      return latestComments.map((comment) => {
        const correspondingBook = this.books.find(
          (book) => book._id === comment.book
        );

        if (correspondingBook) {
          return {
            ...comment,
            title: correspondingBook.title,
          };
        }

        return comment;
      });
    },

    filteredBooks() {
      const copiedBooks = [...this.books];

      if (this.selectedFilter === "latest") {
        return this.latestBooks;
      } else if (this.selectedFilter === "best") {
        return this.ratedBooks;
      }
    },
  },
};
</script>

<style scoped>
.list-group-item.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.accordion-button {
  color: var(--color-primary);
}

.accordion-button:not(.collapsed) {
  background-color: var(--color-secondary);
  color: var(--color-text);
}
</style>
