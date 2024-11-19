import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
import testview from '../views/TestView.vue';
import l_table from '../views/Loaisach.vue'
import k_table from '../views/kesach.vue'
const routes = [
  { path: '/', component: l_table },

  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;