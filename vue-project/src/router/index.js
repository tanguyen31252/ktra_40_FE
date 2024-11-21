import { createRouter, createWebHistory } from 'vue-router';
// import parent from '../components/SachPage.vue';
// import f from '../components/dulieu/f_table.vue'
import view from '../views/HomeView.vue';
// import parent from '../components/LoaiSachPage.vue';
import SignIn from '../components/SignIn.vue';

const routes = [
  { path: '/', component: SignIn },
  { path: '/view', component: view },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;