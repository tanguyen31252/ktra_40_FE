import { createRouter, createWebHistory } from 'vue-router';
import parent from '../views/HomeView.vue';
// import parent from '../components/LoaiSachPage.vue';
// import parent from '../components/SignIn.vue';

const routes = [
  { path: '/', component: parent },
  // { path: '/KeSachPage', component: KeSachPage },
  // { path: '/f', component: f },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;