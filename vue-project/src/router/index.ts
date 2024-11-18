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
})


// hàm on Mounted của Bảo Anh, phần import trên line 6,7,8 của BA
onMounted(() => {
  const storedShelves = localStorage.getItem('bookShelves');
  if (storedShelves) {
    // Nếu có dữ liệu trong LocalStorage, gán vào danh sách
    props.items = JSON.parse(storedShelves);
  } else {
    // Nếu không có, khởi tạo dữ liệu mặc định
    props.items = [
      { id_ke: 1, so_luong_loai_sach: 0, tinh_trang: 'Trống' },
      { id_ke: 2, so_luong_loai_sach: 0, tinh_trang: 'Trống' }
    ];
  }
});

export default router
