import { createWebHistory, createRouter } from 'vue-router';
import Login from '../components/signin/Login.vue';
import SignUp from '../components/signin/SignUp.vue';
import HomePage from '../components/landing/HomePage.vue'
import About from '../components/landing/About.vue'
import Contact from '../components/landing/Contact.vue'
import TaskGroupPage from '../components/task_group/TaskGroupPage.vue'
import TaskGroup from '../components/task_group/TaskGroup.vue'

const publicPages = ['/about','/contact','/login','/signup'];
const routes = [

  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  {path: '/task-groups', name:'task-groups', component:TaskGroupPage },
  { path: '/task-groups/tasks/', component: TaskGroup , name:'group'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, _ , next) => {

  const isPublicPage = publicPages.includes(to.path);
  const authenticate= localStorage.getItem('mystask-loggedin');
  if(isPublicPage || authenticate==='true'){
    next();
  }else{
    next('/login');
  }
})
export default router;