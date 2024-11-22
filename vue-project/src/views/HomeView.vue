<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import KeSachPage from '../components/KeSachPage.vue';
import LoaiSachPage from '../components/LoaiSachPage.vue';
import SachPage from '../components/SachPage.vue';
import MuonSach from '@/components/MuonSach.vue';
import SignIn from '../components/SignIn.vue';

const isAuthenticated = ref(false); // Mặc định là không xác thực
const router = useRouter();

// Kiểm tra trạng thái khi ứng dụng khởi chạy
onMounted(() => {
  const loggedIn = localStorage.getItem('loggedIn');
  if (loggedIn !== 'true') {
    router.push('/'); // Hãy chắc chắn rằng '/' là tuyến đường tới SignIn hiện tại
  } else {
    isAuthenticated.value = true;
  }
});

function logout() {
  isAuthenticated.value = false;
  localStorage.setItem('loggedIn', 'false');
  router.push('/'); // Đảm bảo '/' là tuyến đường của trang SignIn
}
</script>

<template>
  <header class="header">
    <div v-if="isAuthenticated" class="user-dropdown">
      <button @click="logout" class="navbar-link logout-button">
        <span class="icon is-small is-left">
          <i class="fab fa-google-play"></i>
        </span>
        &ensp; Đăng xuất
      </button>
    </div>
  </header>
  <div style="display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */">
    <img id="IMGLogoHead" class="img-fluid img-logo" src="../../Image/Logo_LHU_Vi.png" style="border-width:0px;">
  </div>

  <div v-if="isAuthenticated">
    <div class="table-row">
      <div class="table-container">
        <KeSachPage />
      </div>
      <div class="table-container">
        <LoaiSachPage />
      </div>
    </div>
    <sach-page />
    <muon-sach />
  </div>
  <SignIn v-else />
  <footer>
    <div class="footer-bottom">
      <p>© 2024 NHÓM 5</p>
    </div>
    <div class="footer-bottom">
      <div class="moving-element">
        <a href="#" class="back-to-top">TỚI ĐẦU TRANG</a>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  background-color: #4169E1;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  /* Bao gồm padding trong tính toán chiều rộng */
  flex-wrap: wrap;
  z-index: 1;
}

footer p {
  margin: 0;
}

.footer-bottom {
  margin: 5px 0;
}

.back-to-top {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .moving-element {
    transition: transform 0.5s ease;
    right: 0;
  }

  .moving-element:hover {
    transform: translate(-50vw, 0);
  }
}

/* Media Queries */
@media (max-width: 768px) {

  #IMGLogoHead {
    max-width: 100%;
    height: auto;
  }
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
}

.user-dropdown {
  position: relative;
  display: inline-block;
}

.logout-button {
  cursor: pointer;
  color: white;
  text-decoration: none;
  font-weight: bold;
  background-color: #006FCE;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #005BB5;
}

.table-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin: 20px auto;
  padding: 10px;
}

.table-container {
  flex: 1;
  min-width: 300px;
  padding: 10px;
  border: 2px solid #007BFF;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

@media (max-width: 768px) {
  .table-container {
    flex: 100%;
    min-width: auto;
  }
}
</style>