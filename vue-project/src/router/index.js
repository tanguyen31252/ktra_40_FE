import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
// import testview from '../views/TestView.vue';
import kesach from '../views/kesach.vue';


const routes = [
  { path: '/', component: kesach },
  { path: '/TrangChu', component: TrangChu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;