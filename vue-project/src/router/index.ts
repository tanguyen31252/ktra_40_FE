import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../components/SignIn.vue'
import TrangChu from '../components/TrangChu.vue'
import FTable from '../componnents/f_table.vue'
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const items = reactive([]); // Khởi tạo danh sách kệ sách
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'data',
      component: FTable,
    },
    { path: '/SignIn', component: SignIn },
    { path: '/TrangChu', component: TrangChu },
  ],
});

export default router
