import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
import LTable from '../components/l_table.vue';

const routes = [
  { path: '/', component: LTable },
  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;