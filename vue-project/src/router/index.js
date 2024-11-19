import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import TrangChu from '../components/TrangChu.vue';
import testview from '../views/TestView.vue';
// import testview from '../views/testSach.vue';
import kesach from '../components/Kesach.vue';
import parent from '../views/parent.vue';

const routes = [
 
  { path: '/', component: parent }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;