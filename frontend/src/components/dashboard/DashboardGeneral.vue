<template>
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
</template>

<script>
import { useAuthStore } from "../../stores/authStore.js";
import { useUserStore } from "../../stores/userStore.js";
import { mapState ,mapActions} from "pinia";
import { useToast } from "vue-toastification";

export default {
  name: "DashboardGeneral",

  data() {
    return {
      userInfo: {
        username: "",
        email: "",
        password: "",
      },
      editMode: false,
    };
  },

  created() {
    this.userInfo.username = this.user.username;
    this.userInfo.email = this.user.email;
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserDetails"]),
    ...mapActions(useAuthStore, ["logout"]),
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
        
      }catch (error) {
        console.log(error);
      }

      

    },
    cancelEditMode() {
      this.editMode = false;
      this.userInfo.username = this.user.username;
      this.userInfo.email = this.user.email;
      this.password = "";
    }
  },
};

</script>

<style lang="scss" scoped></style>
