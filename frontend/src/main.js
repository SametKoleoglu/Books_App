import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/styles.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import { useBookStore } from "./stores/bookStore.js";
import { useAuthStore } from "./stores/authStore.js";
import axios from "axios";

// TOAST
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "vue-toastification";

const toast = useToast();

toast.success("Book added successfully!", {
  timeout: 1000,
  position: "top-right",
  closeButton: "button",
  icon: "fas fa-rocket",
  rtl: false,
});

/*add icons to the library*/
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash);

const pinia = createPinia();
const authStore = useAuthStore(pinia);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && error.response) {
      toast.error("Your token has expired, forwarding to login page ", {
        timeout: 2000,
        position: "top-right",
        closeButton: "button",
        icon: true,
        rtl: false,
      });

      setTimeout(() => {
        authStore.logout();
        router.push({ name: "login" });
      }, 2000);
    }
    return Promise.reject(error);
  }
);

const storedUser = localStorage.getItem("user");

if (storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData;

  const token = userData.token;
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  app.mount("#app");
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.use(Toast);
});
