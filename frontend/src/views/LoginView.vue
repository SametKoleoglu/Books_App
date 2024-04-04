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
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailWarningMessage) ||
                  notFoundEmail === FormData.email,
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span
              class="text-danger small"
              v-if="showEmailWarningMessage && !isEmailValid"
              >Please provide a valid email</span
            >
            <span
              class="text-danger small"
              v-if="notFoundEmail === FormData.email"
              >{{ `${notFoundEmail} is not found` }}</span
            >
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
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid':
                  (!isPasswordValid && showPasswordWarningMessage) ||
                  !isPasswordMatch,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
              @input="isPasswordMatch = true"
            />
            <span
              class="text-danger small"
              v-if="showPasswordWarningMessage && !isPasswordValid"
              >Password must be between 6 and 12 characters!</span
            >
            <span class="text-danger small" v-if="!isPasswordMatch"
              >Your password is not correct</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button
              type="submit"
              class="btn btn-primary w-100"
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
import { useToast } from "vue-toastification";

export default {
  name: "LoginView",
  data() {
    return {
      FormData: {
        email: "",
        password: "",
      },
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      notFoundEmail: null,
      isPasswordMatch: true,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
    async submitForm() {
      try {
        await this.login(this.FormData);

        const toast = useToast();
        toast.success("Login successfully!", {
          timeout: 2000,
          position: "top-right",
          closeButton: "button",
          icon: "fas fa-rocket",
        });

        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 2500);
      } catch (data) {
        const { error } = data;

        if (error == "user not found") {
          this.notFoundEmail = this.FormData.email;
        } else if (error == "your password is not correct") {
          this.isPasswordMatch = false;
        }
      }
    },
  },
  computed: {
    isFormValid() {
      if (this.isEmailValid && this.isPasswordValid) {
        return true;
      } else {
        return false;
      }
    },
    isEmailValid() {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.FormData.email
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    isPasswordValid() {
      if (
        this.FormData.password.length >= 6 &&
        this.FormData.password.length <= 12
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
