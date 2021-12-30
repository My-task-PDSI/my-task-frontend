import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/signin/Login.vue";
import SignUp from "../components/signin/SignUp.vue";
import HomePage from "../components/application/HomePage.vue"
import About from "../components/landing/About.vue"
import Contact from "../components/landing/Contact.vue"
import TaskGroupPage from "../components/task_group/TaskGroupPage.vue"

const routes = [

  { path: "/", component: HomePage },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/task-group/", component: TaskGroupPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;