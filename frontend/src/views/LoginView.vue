<template>
  <section class="full-section-header">
    <div class="container">
      <div class="row justify-content-center font-weight-bolder">LOGIN</div>

      <form @submit.prevent="submitForm" class="pt-5">
        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model.trim="FormData.email"
              required
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
              v-model.trim="FormData.password"
              required
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
              Login
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
  name: "LoginView",
  data() {
    return {
      FormData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async submitForm() {
      try {
        await this.login(this.FormData);
        this.$router.push('/dashboard');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
