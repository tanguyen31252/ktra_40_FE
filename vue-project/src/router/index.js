import { createRouter, createWebHistory } from 'vue-router';
import parent from '../views/parent.vue';
// import parent from '../views/HomeViewPrimary.vue'
// import dulieu from '../components/dulieu/l_table.vue'

const routes = [
  { path: '/', component: parent }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;