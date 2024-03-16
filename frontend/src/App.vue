<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<script>
// OPTIONS

// component imports
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
