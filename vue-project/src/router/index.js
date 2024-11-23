import { createRouter, createWebHistory } from 'vue-router';
import view from '../views/HomeView.vue';
import SignIn from '../components/SignIn.vue';


//du lieu
import data from '../components/dulieu/data.vue'

const routes = [
  { path: '/', component: SignIn },
  {
    path: '/view',
    component: view,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn !== 'true') {
        next('/'); // Điều hướng tới trang SignIn nếu chưa đăng nhập
      } else {
        next(); // Tiếp tục đến trang được yêu cầu
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;