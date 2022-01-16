import { createWebHistory, createRouter } from 'vue-router';
import Login from '../pages/signin/Login.vue';
import SignUp from '../pages/signin/SignUp.vue';
import Home from '../pages/landing/Home.vue'
import About from '../pages/landing/About.vue'
import Contact from '../pages/landing/Contact.vue'
import NotFound from '../pages/landing/NotFound.vue'
import taskGroupListing from '../pages/taskGroup/taskGroupListing.vue'
import TaskGroup from '../pages/taskGroup/TaskGroup.vue';
import Notifications from '../pages/notifications/Notifications.vue';
import ChangePassword from '../pages/client/changePassword.vue';
import editUser from '../pages/client/edit.vue'


const publicPages = ['/','/about', '/contact', '/login', '/signup', '/not-found'];
const routes = [

  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/not-found', component: NotFound },
  { path: '/user/changePassword', component: ChangePassword },
  { path: '/notifications', component: Notifications },
  { path: '/task-groups', name: 'task-groups', component: taskGroupListing },
  { path: '/task-groups/tasks/', component: TaskGroup, name: 'group' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  {path: '/user/edit/', component: editUser}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isPublicPage = publicPages.includes(to.path);
  const authenticate = sessionStorage.getItem('mystask-loggedin');
  if (isPublicPage || authenticate === 'true') {
    next();
  } else {
    next('/login');
  }
})
export default router;