import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
import homeviewprimay from '../views/HomeViewPrimary.vue'
// import homeviewprimay from '../views/testkesach.vue'

const routes = [
  { path: '/', component: homeviewprimay },
 // { path: '/', component: testview },
  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;