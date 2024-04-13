<template>
  <section style="min-height: calc(100vh - 130px)">
    <div class="container py-5">
      <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
        <li class="nav-item" role="presentation" @click="activeTab = 'general'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'general' }"
            id="general-tab"
            data-bs-toggle="tab"
            data-bs-target="#general-tab-pane"
            type="button"
            role="tab"
            aria-controls="general-tab-pane"
            aria-selected="true"
          >
            General
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = 'books'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'books' }"
            id="books-tab"
            data-bs-toggle="tab"
            data-bs-target="#books-tab-pane"
            type="button"
            role="tab"
            aria-controls="books-tab-pane"
            aria-selected="false"
          >
            Books
          </button>
        </li>
      </ul>
      <div class="tab-content py-5" id="dashboardContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'general' }"
          id="general-tab-pane"
          role="tabpanel"
          aria-labelledby="general-tab"
          tabindex="0"
        >
          <div class="row">
            <div class="col-lg-6">
              <h2 class="mb-5">User Information</h2>
              <form action="POST">
                <div class="mb-3">
                  <label for="username">Username</label>
                  <input
                    :disabled="!editMode"
                    v-model="userInfo.username"
                    type="text"
                    class="form-control"
                    id="username"
                  />
                </div>
                <div class="mb-3">
                  <label for="email">Email</label>
                  <input
                    :disabled="!editMode"
                    v-model="userInfo.email"
                    type="email"
                    class="form-control"
                    id="email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password">Password</label>
                  <input
                    :disabled="!editMode"
                    v-model="userInfo.password"
                    type="password"
                    class="form-control"
                    id="password"
                  />
                </div>
                <button
                  @click="!editMode ? toggleEditMode() : saveUserInfo()"
                  class="btn btn-primary"
                  type="button"
                >
                  {{ editMode ? "Save" : "Edit" }}
                </button>
                <button
                  v-if="editMode"
                  @click="cancelEditMode()"
                  style="
                    background-color: firebrick !important;
                    border-color: firebrick;
                  "
                  class="btn btn-primary ms-3"
                  type="button"
                >
                  Cancel
                </button>
              </form>
            </div>
            <div class="col-lg-6"></div>
          </div>
        </div>

        <!-- BOOKS -->
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'books' }"
          id="books-tab-pane"
          role="tabpanel"
          aria-labelledby="books-tab"
          tabindex="0"
        >
          <div class="row mb-3">
            <div class="col text-end">
              <button
                type="button"
                class="btn btn-primary"
                @click="openAddModal()"
              >
                Add Book
              </button>
            </div>
          </div>

          <!-- Table -->
          <div class="row">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Page</th>
                    <th class="text-center">Edit</th>
                    <th class="text-center">Delete</th>
                  </tr>
                </thead>

                <TransitionGroup name="list" tag="tbody">
                  <tr v-for="book in userBooks" :key="book._id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td style="max-width: 250px">
                      {{ book.description }}
                    </td>
                    <td>{{ book.page }}</td>
                    <td class="text-center">
                      <font-awesome-icon
                        :icon="['far', 'pen-to-square']"
                        class="text-warning"
                        style="cursor: pointer"
                        @click="openEditModal(book)"
                      />
                    </td>
                    <td class="text-center">
                      <font-awesome-icon
                        :icon="['fas', 'trash']"
                        class="text-danger"
                        style="cursor: pointer"
                        @click="deleteBook(book._id, book.title)"
                      />
                    </td>
                  </tr>
                </TransitionGroup>
              </table>
            </div>
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            ref="addEditModal"
            tabindex="-1"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="addModalLabel">
                    {{ modalTitle }}
                  </h5>
                  <button
                    @click="modal.hide()"
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body mx-5">
                  <div class="col mb-3">
                    <label for="title" class="form-label"
                      >Title
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      name="title"
                      required
                      v-model="newBook.title"
                    />
                  </div>
                  <div class="col mb-3">
                    <label for="author" class="form-label"
                      >Author
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      name="author"
                      required
                      v-model="newBook.author"
                    />
                  </div>
                  <div class="col mb-3">
                    <label for="description" class="form-label"
                      >Description
                      <span class="text-danger">*</span>
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      class="form-control"
                      cols="30"
                      rows="10"
                      v-model="newBook.description"
                    ></textarea>
                  </div>
                  <div class="col mb-3">
                    <label for="author" class="form-label"
                      >Number of Pages
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="numOfPages"
                      name="numOfPages"
                      required
                      v-model="newBook.page"
                    />
                  </div>
                  <div class="text-end mb-4 gap-2">
                    <button
                      type="button"
                      @click="modal.hide()"
                      class="btn btn-outline-secondary"
                    >
                      Close
                    </button>
                    <button
                      @click="saveBook()"
                      type="button"
                      class="btn btn-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { useUserStore } from "@/stores/userStore.js";
import { useBookStore } from "@/stores/bookStore.js";
import { mapState, mapActions } from "pinia";
import { useToast } from "vue-toastification";

import { Modal } from "bootstrap";

export default {
  name: "DashboardView",
  data() {
    return {
      activeTab: "books",

      // General
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
      editMode: false,

      // Books
      modal: null,
      modalTitle: "Add Book",
      newBook: {
        title: "",
        author: "",
        description: "",
        page: null,
        newBookId: null,
      },
    };
  },
  mounted() {
    // Books
    this.modal = new Modal(this.$refs.addEditModal);
  },
  created() {
    // General
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;

    // Books
    this.fetchBooksByUploader(this.user._id);
  },
  computed: {
    // General
    ...mapState(useAuthStore, ["user"]),

    // Books
    ...mapState(useBookStore, ["userUploadedBooks"]),
    userBooks() {
      return this.userUploadedBooks
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    // General
    ...mapActions(useUserStore, ["updateUserDetails"]),
    ...mapActions(useAuthStore, ["logout"]),

    // Books
    ...mapActions(useBookStore, [
      "addNewBook",
      "fetchBooksByUploader",
      "deleteTheBook",
      'editTheBook'
    ]),

    // General
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveUserInfo() {
      try {
        await this.updateUserDetails(this.userInfo);

        const toast = useToast();
        toast.success("Please login with your new details!", {
          timeout: 3500,
          position: "top-right",
          closeButton: "button",
          icon: "fas fa-rocket",
        });

        setTimeout(() => {
          this.logout();
        }, 4000);
      } catch (error) {
        console.log(error);
      }
    },
    cancelEditMode() {
      this.editMode = false;
      this.userInfo.username = this.user.username;
      this.userInfo.email = this.user.email;
      this.password = "";
    },

    // Books

    saveBook() {
      if (this.modalTitle == "Edit Book") {
        this.editBook();
      } else if (this.modalTitle == "Add Book") {
        this.addBook();
      }
    },

    openAddModal() {
      this.modalTitle = "Add Book";
      this.newBook = {
        title: "",
        author: "",
        description: "",
        page: null,
      };
      this.modal.show();
    },

    openEditModal(book) {
      this.modalTitle = "Edit Book";
      this.newBookId = book._id;
      this.newBook = {
        title: book.title,
        author: book.author,
        description: book.description,
        page: book.page,
      };
      this.modal.show();
    },

    async addBook() {
      try {
        // await this.$store.dispatch("addBook", this.newBook);
        await this.addNewBook(this.newBook);
        this.modal.hide();
        this.newBook = {
          title: "",
          author: "",
          description: "",
          page: null,
        };

        await this.fetchBooksByUploader();

        this.showToast("Book added successfully!", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    },

    async editBook() {
      try {
        await this.editTheBook(this.newBookId, this.newBook);

        await this.fetchBooksByUploader();

        this.modal.hide();

        this.showToast("Book updated successfully!", {
          type: "success",
        })
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBook(bookId, bookTitle) {
      try {
        await this.deleteTheBook(bookId);
        await this.fetchBooksByUploader();
        const toast = useToast();

        // toast.warning(`${bookTitle} deleted successfully`, {
        //   timeout: 2000,
        //   position: "top-right",
        //   closeButton: "button",
        //   icon: true,
        //   rtl: false,
        // });

        this.showToast(`${bookTitle} deleted successfully`, {
          type: "warning",
        });
      } catch (error) {
        console.log(error);
      }
    },

    showToast(message, options) {
      const toast = useToast();

      toast(message, {
        timeout: 2000,
        position: "top-right",
        closeButton: "button",
        icon: true,
        rtl: false,
        ...options,
      });
    },
  },
};
</script>

<style scoped>
/* General */
.nav-link {
  color: var(--color-secondary);
  font-weight: bold;
}

.nav-tabs {
  border-color: var(--color-secondary);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: var(--color-secondary);
  border-color: var(--color-secondary);
}

/* Books */
.btn-outline-secondary {
  color: var(--color-secondary);
  border-radius: 23px;
  height: 44px;
  margin-right: 20px;
  min-width: 120px;
  border-color: var(--color-secondary);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

.list-leave-active {
  position: absolute;
}
</style>
