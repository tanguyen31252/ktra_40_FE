import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';

const routes = [
  { path: '/', component: SignIn },
  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;