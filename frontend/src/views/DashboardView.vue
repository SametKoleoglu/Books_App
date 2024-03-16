<template>
  <h1 style="color: black;">{{ user.email }}</h1>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState } from "pinia";

export default {
  name: "DashboardView",
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
