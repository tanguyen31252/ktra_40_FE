import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
<<<<<<< HEAD
import testview from '../views/TestView.vue';

const routes = [
  { path: '/', component: testview },
=======
import LTable from '../components/l_table.vue';
import tTable from '../views/';


const routes = [
  { path: '/', component: LTable },
>>>>>>> 5fe7cf13e0e842561a315fa42c0f553bfdc45abf
  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;