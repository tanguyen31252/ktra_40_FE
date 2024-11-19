import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
import LTable from '../components/l_table.vue';
import tTable from '../views/';


const routes = [
  { path: '/', component: tTable },
  { path: '/TrangChu', component: TrangChu }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;