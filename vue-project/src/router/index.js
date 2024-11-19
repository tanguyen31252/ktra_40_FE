import { createRouter, createWebHistory } from 'vue-router';
import parent from '../views/parent.vue';

const routes = [
  { path: '/', component: parent }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;