<template>
  <section class="full-section-header">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>

      <form @submit.prevent="submitForm" class="pt-5">
        <div class="text-center">
          <span class="text-danger small" v-if="showGenericWarningMessage"
            >Something happened, please try again later!</span
          >
        </div>
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label"
              >Username
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model.trim="FormData.username"
              required
              autocomplete="off"
              :class="{
                'is-valid': isUsernameValid,
                'is-invalid':
                  (!isUsernameValid && showUsernameWarningMessage) ||
                  existingUsername == FormData.username,
              }"
              @focus="showUsernameWarningMessage = true"
              @blur="showUsernameWarningMessage = false"
            />
            <span
              class="text-danger small"
              v-if="showUsernameWarningMessage && !isUsernameValid"
              >Username must be between 5 and 20 characters</span
            >
            <span
              class="text-danger small"
              v-if="existingUsername == FormData.username"
              >{{ `${existingUsername} already in exist!!!` }}</span
            >
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label"
              >Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              v-model.trim="FormData.email"
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailWarningMessage) ||
                  existingEmail == FormData.email,
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
              v-if="existingEmail == FormData.email"
              >{{ `${existingEmail} already in exist!!!` }}</span
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label"
              >Password
              <span class="text-danger">*</span>
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model.trim="FormData.password"
              required
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && showPasswordWarningMessage,
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
            />
            <span
              class="text-danger small"
              v-if="showPasswordWarningMessage && !isPasswordValid"
              >Password must be between 6 and 12 characters!</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="w-100 btn btn-primary"
            >
              Register
            </button>
            <span class="text-danger small" v-if="!isFormValid"
              >* Please Complete all of the required fields</span
            >
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
  name: "RegisterView",
  data() {
    return {
      FormData: {
        username: "",
        email: "",
        password: "",
      },
      showUsernameWarningMessage: false,
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      existingEmail: null,
      existingUsername: null,
      showGenericWarningMessage: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    async submitForm() {
      try {
        await this.register(this.FormData);

        const toast = useToast();
        toast.success("Registered successfully!", {
          timeout: 3500,
          position: "top-right",
          closeButton: "button",
          icon: "fas fa-rocket",
        });

        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 4000);
      } catch (data) {
        const { error } = data;

        if (error == "username already exists") {
          this.existingUsername = this.FormData.username;
        } else if (error == "email already exists") {
          this.existingEmail = this.FormData.email;
        } else {
          this.showGenericWarningMessage = true;
          this.FormData = {
            username: "",
            email: "",
            password: "",
          };
        }
      }
    },
  },
  computed: {
    isFormValid() {
      if (this.isUsernameValid && this.isEmailValid && this.isPasswordValid) {
        return true;
      } else {
        return false;
      }
    },
    isUsernameValid() {
      if (
        this.FormData.username.length >= 5 &&
        this.FormData.username.length <= 20
      ) {
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

<style scoped></style>
