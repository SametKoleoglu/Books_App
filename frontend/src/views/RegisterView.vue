<template>
  <section class="full-section-header">
    <div class="container">
      <div class="row justify-content-center font-weight-bolder">REGISTER</div>

      <form @submit.prevent="submitForm" class="pt-5">
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model.trim="FormData.username"
              required
            />
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              v-model.trim="FormData.email"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              required
              v-model.trim="FormData.password"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button
              type="submit"
              class="btn w-100"
              style="
                background-color: var(--color-secondary);
                color: var(--color-text);
                font-weight: bold;
                font-size: large;
              "
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import { mapActions } from "pinia";

export default {
  name: "RegisterView",
  data() {
    return {
      FormData: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    async submitForm() {
      try {
        await this.register(this.FormData);
        this.$router.push({ name: "login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
